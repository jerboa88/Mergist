import {
	useState,
	useRef,
	useCallback,
	type DragEvent,
	useEffect,
} from 'react';
import { ignoreDefault } from '../../common/utilities';

/**
 * A full screen dropzone component. Accepts a callback function that fires when a file is dropped
 *
 * Adapted from a GitHub comment by jlarmstrongiv (https://github.com/jlarmstrongiv)
 * Source: https://github.com/react-dropzone/react-dropzone/issues/753#issuecomment-774782919
 */
export function FullPageDropzone(props: {
	onFilesAdded: (files: FileList) => void;
}) {
	const [isDragging, setIsDragging] = useState(false);
	const dragCounter = useRef(0);

	const handleDrag = useCallback((event: DragEvent<HTMLElement>) => {
		ignoreDefault(event);
	}, []);

	const handleDragIn = useCallback((event: DragEvent<HTMLElement>) => {
		ignoreDefault(event);

		dragCounter.current++;

		if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
			setIsDragging(true);
		}
	}, []);

	const handleDragOut = useCallback((event: DragEvent<HTMLElement>) => {
		ignoreDefault(event);

		dragCounter.current--;

		if (dragCounter.current > 0) {
			return;
		}

		setIsDragging(false);
	}, []);

	const handleDrop = useCallback(
		(event: DragEvent<HTMLElement>) => {
			ignoreDefault(event);
			setIsDragging(false);

			if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
				dragCounter.current = 0;

				props.onFilesAdded(event.dataTransfer.files);
				event.dataTransfer.clearData();
			}
		},
		[props.onFilesAdded],
	);

	useEffect(() => {
		// Force cast event parameter from the placeholder globalThis type to a proper React event type
		type DragEventHandler = (event: unknown | globalThis.DragEvent) => void;

		window.addEventListener('dragenter', handleDragIn as DragEventHandler);
		window.addEventListener('dragleave', handleDragOut as DragEventHandler);
		window.addEventListener('dragover', handleDrag as DragEventHandler);
		window.addEventListener('drop', handleDrop as DragEventHandler);

		return () => {
			window.removeEventListener('dragenter', handleDragIn as DragEventHandler);
			window.removeEventListener(
				'dragleave',
				handleDragOut as DragEventHandler,
			);
			window.removeEventListener('dragover', handleDrag as DragEventHandler);
			window.removeEventListener('drop', handleDrop as DragEventHandler);
		};
	});

	return (
		<div
			className={`fixed inset-0 flex-col justify-center items-center p-16 bg-base-100/50 z-10 ${isDragging ? '':'hidden'}`}
		/>
	);
}
