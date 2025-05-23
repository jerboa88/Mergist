import { faEye } from '@fortawesome/free-solid-svg-icons';
import { MotionToggle, ThemeToggle } from '../toggle-components.tsx';
import { Modal } from './base.tsx';

/**
 * A modal that allows setting options for the site
 */
export function OptionsModal(props: {
	id: string;
}) {
	return (
		<Modal
			id={props.id}
			title="Options"
			buttonIcon={faEye}
			buttonLabel="Looks good"
		>
			<div className="flex-col m-auto w-fit">
				<MotionToggle />
				<ThemeToggle />
			</div>
		</Modal>
	);
}
