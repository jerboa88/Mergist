// External deps
import React, { useState, useEffect, useRef, MouseEvent, useCallback } from 'react';
import { Reorder } from 'framer-motion';
import prettyBytes from 'pretty-bytes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Local deps
import config from '../../gatsby-config';
import { PDFFileMapInterface } from '../common/types';
import { loadMetadata, PDFManager, StatusMsg } from '../common/utilities';
import { Main, PageLayout, Section } from '../components/layout-components';
import { LargeDropzone } from '../components/dropzone-components';
import SortableItem from '../components/sortable-item';
import Alert from '../components/alert';
import MergeButton from '../components/merge-button';
import { AddFilesButton } from '../components/buttons';
import Footer from '../components/footer';
import Header from '../components/header';


export default function IndexPage() {
  const [fileIds, setFileIds] = useState<string[]>([]);
  const [files, setFiles] = useState<PDFFileMapInterface>({});
  const [statusMsgs, setStatusMsgs] = useState<StatusMsg[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string>('');
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  const dragCounter = useRef(0);
  const metadata = loadMetadata(config);
  const pdfManager = new PDFManager(metadata.shortTitle, metadata.siteUrl);


  // Prevent propagation of default events
  function blockDefaultEvent(event: MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Fullscreen drag and drop implementation
  // https://github.com/react-dropzone/react-dropzone/issues/753#issuecomment-774782919
  const handleDrag = useCallback((event) => {
    blockDefaultEvent(event);
  }, []);

  const handleDragIn = useCallback((event) => {
    blockDefaultEvent(event);

    dragCounter.current++;

    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((event) => {
    blockDefaultEvent(event);

    dragCounter.current--;

    if (dragCounter.current > 0) {
      return;
    }

    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event) => {
    blockDefaultEvent(event);
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      dragCounter.current = 0;

      handleAddFiles(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  }, [fileIds, files]);

  useEffect(() => {
    window.addEventListener('dragenter', handleDragIn);
    window.addEventListener('dragleave', handleDragOut);
    window.addEventListener('dragover', handleDrag);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragIn);
      window.removeEventListener('dragleave', handleDragOut);
      window.removeEventListener('dragover', handleDrag);
      window.removeEventListener('drop', handleDrop);
    };
  });

  // Update the list of files and fileIds, resetting progress and the download URL
  function updateState(newFileIds: string[], newFiles: PDFFileMapInterface | null = null) {
    pdfManager.removeMergedFile(mergedPdfUrl);

    // Skip updating if the file map hasn't changed
    if (newFiles) {
      setFiles(newFiles);
    }

    setFileIds(newFileIds);
    setCurrentProgress(0);
    setMergedPdfUrl('');
  }

  function handleAddFiles(inputFiles: FileList) {
    const [validFileList, statusMsgList] = pdfManager.filterInvalidFiles(files, Array.from(inputFiles));
    const tempFileMap = files;
    const newFileIds = [] as string[];

    for (const file of validFileList) {
      newFileIds.push(file.id);
      tempFileMap[file.id] = file;
    }

    updateState(fileIds.concat(newFileIds), tempFileMap);
    setStatusMsgs(statusMsgList);
  }

  // Handle clicks on merge button
  async function handleMerge() {
    const [downloadUrl, statusMsgList] = await pdfManager.createMergedFile(files, fileIds, setCurrentProgress);

    setMergedPdfUrl(downloadUrl);
    setStatusMsgs(statusMsgList);
  }

  function handleReorderFiles(fileIds: string[]): void {
    updateState(fileIds);
  }

  // Remove a single file from the list given its id
  function handleRemoveFile(id: string) {
    const newFiles = files;
    const newFileIds = fileIds.filter(fileId => fileId !== id);

    delete newFiles[id];

    updateState(newFileIds, newFiles);
  }

  // Remove all files from the list
  function handleRemoveAllFiles() {
    updateState([], {});
  }

  function getEstimatedFileSize() {
    return prettyBytes(Object.values(files).reduce((partialSum, pdfFile) => partialSum + pdfFile.getSize, 0));
  }


  return (
    <PageLayout metadata={metadata}>
      <Header title={metadata.shortTitle} url={metadata.siteUrl}>
        {metadata.description}
      </Header>

      <Main>
        <div className={`fixed inset-0 flex flex-col justify-center items-center p-16 bg-base-100/50 z-10 ${isDragging ? '' : 'hidden'}`} />

        <Section visible={statusMsgs.length > 0} className="gap-5">
          {statusMsgs.map(statusMsg => <Alert key={statusMsg.getId} statusMsg={statusMsg} />)}
        </Section>

        <div tabIndex={0} className="collapse collapse-open flex-1 bg-base-100 border border-base-300 rounded-box">
          <Section visible={fileIds.length === 0} className="flex-1">
            <LargeDropzone className='bg-base-100' onFilesAdded={handleAddFiles} />
          </Section>

          <Section visible={fileIds.length > 0}>
            <div className="flex flex-row justify-between items-center p-6 collapse-title text-lg font-medium">
              <h5 className="pl-4">{fileIds.length} file{fileIds.length !== 1 && 's'} added ({getEstimatedFileSize()})</h5>
              <div className="flex flex-row gap-2">
                <AddFilesButton onFilesAdded={handleAddFiles} />
                <button className="btn btn-primary gap-2" onClick={handleRemoveAllFiles}>
                  <FontAwesomeIcon icon={faTrash} />
                  Remove All
                </button>
              </div>
            </div>

            <Reorder.Group axis="y" values={fileIds} onReorder={handleReorderFiles} className="flex flex-col px-6 py-7 gap-5 bg-base-300 shadow-inner">
              {fileIds.map((fileId) => (
                <SortableItem key={fileId} id={fileId} name={files[fileId].getName} size={files[fileId].getSize} onRemove={handleRemoveFile} />
              ))}
            </Reorder.Group>
          </Section>
        </div>

        <Section visible={fileIds.length > 0}>
          <div className="flex flex-row justify-center gap-8">
            <MergeButton numOfFiles={fileIds.length} progress={currentProgress} downloadUrl={mergedPdfUrl} onClick={handleMerge} />
          </div>
        </Section>
      </Main>

      <Footer author={metadata.author} githubUrl={metadata.githubUrl} homepageUrl={metadata.homepageUrl} homepageLabel={metadata.homepageDomain} />
    </PageLayout>
  );
}
