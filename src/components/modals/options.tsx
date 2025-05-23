import {
	faEye,
	faMoon,
	faSun,
	faWandMagic,
	faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';
import { Modal } from './base.tsx';
import { Toggle } from '../toggle.tsx';
import {
	AllowMotionContext,
	DarkThemeContext,
} from '../../common/utilities.ts';

/**
 * A toggle component used to change the page theme
 */
function ThemeToggle() {
	return (
		<Toggle
			className="pl-0"
			label="dark theme"
			context={DarkThemeContext}
			htmlAttribute="data-theme"
			disabled={['light', faSun]}
			enabled={['dark', faMoon]}
		/>
	);
}

/**
 * A toggle component used to change the `motion-allowed` property
 */
function MotionToggle() {
	return (
		<Toggle
			className="pl-0"
			label="animations"
			context={AllowMotionContext}
			htmlAttribute="data-motion"
			disabled={['reduce', faWandMagic]}
			enabled={['allow', faWandMagicSparkles]}
		/>
	);
}

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
			<p>You can change various options for the site here.</p>
			<br />
			<div className="flex-col w-fit">
				<MotionToggle />
				<ThemeToggle />
			</div>
		</Modal>
	);
}
