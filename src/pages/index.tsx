// External deps
import React, { useState, useCallback } from 'react';

// Local deps
import config from '../../gatsby-config';
import { PDFFileMapInterface } from '../common/types';
import { loadMetadata, PDFManager, StatusMsg } from '../common/utilities';
import { Main, PageLayout, Section } from '../components/layout-components';
import { FullPageDropzone, LargeDropzone } from '../components/dropzone-components';
import Alert from '../components/alert';
import { ActionButton } from '../components/button-components';
import Footer from '../components/footer';
import Header from '../components/header';
import FileManager from '../components/file-manager';


export default function IndexPage() {
  const [fileIds, setFileIds] = useState<string[]>([]);
  const [files, setFiles] = useState<PDFFileMapInterface>({});
  const [statusMsgs, setStatusMsgs] = useState<StatusMsg[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string>('');
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  const metadata = loadMetadata(config);
  const pdfManager = new PDFManager(metadata.shortTitle, metadata.siteUrl);


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

  const handleAddFiles = useCallback((inputFiles: FileList) => {
    const [validFileList, statusMsgList] = pdfManager.filterInvalidFiles(files, Array.from(inputFiles));

    if (validFileList.length > 0) {
      const tempFileMap = files;
      const newFileIds = [] as string[];

      for (const file of validFileList) {
        newFileIds.push(file.id);
        tempFileMap[file.id] = file;
      }

      updateState(fileIds.concat(newFileIds), tempFileMap);
    }

    if (statusMsgList.length > 0) {
      setStatusMsgs(statusMsgList);
    }
  }, [fileIds, files]);

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

  function handleReorderFiles(fileIds: string[]): void {
    updateState(fileIds);
  }

  // Handle clicks on merge button
  async function handleMerge() {
    const [downloadUrl, statusMsgList] = await pdfManager.createMergedFile(files, fileIds, setCurrentProgress);

    // Reset progress if there were any critical errors
    if (downloadUrl === '') {
      setMergedPdfUrl('');
    }

    setMergedPdfUrl(downloadUrl);
    setStatusMsgs(statusMsgList);
    setCurrentProgress(0);
  }


  return (
    <PageLayout metadata={metadata}>
      <Header title={metadata.shortTitle}>
        {metadata.description}
      </Header>

      <Main>
        <FullPageDropzone onFilesAdded={handleAddFiles} />

        <Section visible={statusMsgs.length > 0} className="gap-5">
          {statusMsgs.map(statusMsg => (
            <Alert key={statusMsg.getId} statusMsg={statusMsg} />
          ))}
        </Section>

        <div tabIndex={0} className="collapse collapse-open flex-1 bg-base-100 border border-base-300 rounded-box">
          <Section visible={fileIds.length === 0} className="flex-1">
            <LargeDropzone onFilesAdded={handleAddFiles} />
          </Section>

          <Section visible={fileIds.length > 0}>
            <FileManager fileIds={fileIds} files={files} onReorder={handleReorderFiles} onFileAdded={handleAddFiles} onFileRemoved={handleRemoveFile} onAllFilesRemoved={handleRemoveAllFiles} disabled={currentProgress > 0} />
          </Section>
        </div>

        <Section visible={fileIds.length > 0}>
          <div className="flex flex-row justify-center gap-8">
            <ActionButton numOfFiles={fileIds.length} progress={currentProgress} downloadUrl={mergedPdfUrl} onClick={handleMerge} />
          </div>
        </Section>
      </Main>

      <Footer author={metadata.author} githubUrl={metadata.githubUrl} homepageDomain={metadata.homepageDomain} />
    </PageLayout>
  );
}
