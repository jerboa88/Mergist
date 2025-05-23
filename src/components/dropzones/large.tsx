import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../icon';
import { DropzoneWrapper } from './wrapper';

/**
 * A large dropzone component.
 *
 * Accepts a callback function that fires when a file is dropped.
 */
export function LargeDropzone(props: {
	onFilesAdded: (files: FileList) => void;
}) {
	return (
		<DropzoneWrapper
			className="flex-col flex-1"
			onFilesAdded={props.onFilesAdded}
		>
			<div className="z-20 flex-col flex-1 gap-8 justify-center p-8 m-8 text-center rounded-lg border-2 border-dashed bg-base-100 hover:bg-base-200">
				<Icon icon={faFileCirclePlus} tw="fa-3x" />
				<p className="flex-grow-0">
					Drag and drop PDF files here, or click to select files
				</p>
			</div>
		</DropzoneWrapper>
	);
}
