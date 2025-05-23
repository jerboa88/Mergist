/*
	Page footer component
	---------------------
*/

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
	faCircleQuestion,
	faCookie,
	faGear,
} from '@fortawesome/free-solid-svg-icons';
import { SingleColumnLayout } from '../components/layout-components.tsx';
import {
	AboutModal,
	OptionsModal,
	PrivacyModal,
} from '../components/modal-components.tsx';
import { IconButtonLink } from '../components/link-components.tsx';

export function Footer(props: {
	author: string;
	githubUrl: string;
	homepageDomain: string;
}) {
	const privacyModalId = 'privacy-modal';
	const aboutModalId = 'about-modal';
	const optionsModalId = 'options-modal';
	const homepageUrl = `https://${props.homepageDomain}`;

	return (
		<>
			<PrivacyModal id={privacyModalId} />
			<AboutModal
				id={aboutModalId}
				author={props.author}
				authorUrl={homepageUrl}
			/>
			<OptionsModal id={optionsModalId} />

			<footer className="py-8 footer footer-center bg-base-300">
				<SingleColumnLayout className="gap-0">
					<div className="grid grid-cols-2 w-full sm:grid-cols-4">
						<IconButtonLink to={props.githubUrl} icon={faGithub}>
							GitHub
						</IconButtonLink>
						<IconButtonLink to={`#${optionsModalId}`} icon={faGear} isInternal>
							Options
						</IconButtonLink>
						<IconButtonLink
							to={`#${privacyModalId}`}
							icon={faCookie}
							isInternal
						>
							Privacy
						</IconButtonLink>
						<IconButtonLink
							to={`#${aboutModalId}`}
							icon={faCircleQuestion}
							isInternal
						>
							About
						</IconButtonLink>
					</div>
				</SingleColumnLayout>
			</footer>
		</>
	);
}
