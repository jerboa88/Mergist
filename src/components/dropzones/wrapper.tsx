import type { ChangeEvent, ReactNode } from 'react';
import { ignoreDefault } from '../../common/utilities.ts';

type Props = {
	className?: string;
	children: ReactNode;
	onFilesAdded: (files: FileList) => void;
};

/**
 * Enables dropzone functionality for a child component.
 *
 * Accepts a callback function that fires when a file is dropped.
 */
export function DropzoneWrapper({
	className = '',
	children,
	onFilesAdded,
}: Props) {
	function handleAddFiles(event: ChangeEvent<HTMLInputElement>) {
		ignoreDefault(event);

		const files = event.target.files;

		// The list will be empty if cancel is pressed, so we need to account for this
		// It should never be null but we might as well check to make the TS compiler happy
		if (files && files.length > 0) {
			onFilesAdded(files);
		}
	}

	return (
		<label className={`cursor-pointer ${className}`}>
			<input
				className="hidden"
				type="file"
				accept="application/pdf"
				onChange={handleAddFiles}
				multiple
			/>
			{children}
		</label>
	);
}
