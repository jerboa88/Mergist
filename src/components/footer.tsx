/*
	Footer component
	----------------
*/


import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCircleQuestion, faCookie } from '@fortawesome/free-solid-svg-icons';
import { SingleColumnLayout } from '../components/layout-components';
import { AboutModal, PrivacyModal } from '../components/modal-components';
import { IconButtonLink } from '../components/link-components';


// Exports

// A basic footer component
export default function Footer(props: { author: string; githubUrl: string; homepageDomain: string; }) {
	const privacyModalId = 'privacy-modal';
	const aboutModalId = 'about-modal';
	const homepageUrl = `https://${props.homepageDomain}`;

	return (
		<>
			<PrivacyModal id={privacyModalId} />
			<AboutModal id={aboutModalId} author={props.author} authorUrl={homepageUrl} />

			<footer className="footer footer-center py-8 bg-base-300">
				<SingleColumnLayout className="gap-0">
					<div className="flex-row w-full justify-between">
						<IconButtonLink to={props.githubUrl} icon={faGithub}>
							GitHub
						</IconButtonLink>
						<IconButtonLink to={`#${privacyModalId}`} icon={faCookie} isInternal>
							Privacy
						</IconButtonLink>
						<IconButtonLink to={`#${aboutModalId}`} icon={faCircleQuestion} isInternal>
							About
						</IconButtonLink>
					</div>
				</SingleColumnLayout>
			</footer>
		</>
	);
}
