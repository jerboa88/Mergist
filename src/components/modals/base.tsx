import type { ReactNode } from 'react';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { LinkWrapper } from '../links/wrapper.tsx';
import { PrimaryButton } from '../buttons/primary.tsx';

/**
 * A generic modal component
 */
export function Modal(props: {
	id: string;
	title: string;
	buttonIcon: IconDefinition;
	buttonLabel: string;
	children: ReactNode;
}) {
	return (
		<div
			id={props.id}
			className="overflow-hidden visible modal modal-bottom sm:modal-middle sm:backdrop-blur-sm group has-motion"
		>
			<div className="modal-box sm:w-5/6 sm:max-w-xl flex-col items-center p-8 sm:px-16 overflow-hidden transition-[opacity,transform] has-motion scale-90 group-target:scale-100">
				<h3 className="text-lg font-bold text-center">{props.title}</h3>
				<br />
				<div className="w-fit">{props.children}</div>
				<div className="justify-center modal-action">
					<LinkWrapper to="#" isInternal>
						<PrimaryButton icon={props.buttonIcon}>
							{props.buttonLabel}
						</PrimaryButton>
					</LinkWrapper>
				</div>
			</div>
		</div>
	);
}
