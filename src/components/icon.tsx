import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

/**
 * A basic icon component
 */
export function Icon(props: { tw?: string; icon: IconDefinition }) {
	return <FontAwesomeIcon icon={props.icon} className={props.tw} />;
}
