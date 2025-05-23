import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
	faCircleQuestion,
	faCookie,
	faGear,
} from '@fortawesome/free-solid-svg-icons';
import { SingleColumnLayout } from './single-column-layout.tsx';
import { AboutModal } from '../modals/about.tsx';
import { PrivacyModal } from '../modals/privacy-policy.tsx';
import { IconButtonLink } from '../links/icon-button.tsx';
import { OptionsModal } from '../modals/options.tsx';

/**
 * Page footer
 */
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
