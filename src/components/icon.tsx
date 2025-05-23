import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type Props = {
	className?: string;
	icon: IconDefinition;
};

/**
 * A basic icon component
 */
export function Icon({ className = '', icon }: Props) {
	return <FontAwesomeIcon icon={icon} className={className} />;
}
