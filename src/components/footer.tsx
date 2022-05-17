import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEarthAmericas, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { SingleColumnLayout } from '../components/layout-components';
import AboutModal from '../components/about-modal';
import { IconButtonLink } from '../components/link-components';
import ThemeToggle from '../components/theme-toggle';


export default function Footer(props: { className: string; author: string; githubUrl: string; homepageDomain: string; }) {
	const modalId = 'about-modal';
	const homepageUrl = `https://${props.homepageDomain}`;

	return (
		<>
			<AboutModal id={modalId} author={props.author} authorUrl={homepageUrl} />

			<footer className="footer footer-center py-8 bg-base-300">
				<SingleColumnLayout>
					<ThemeToggle />

					<div className="flex flex-row w-full justify-between">
						<IconButtonLink to={props.githubUrl} icon={faGithub}>
							GitHub
						</IconButtonLink>
						<IconButtonLink to={homepageUrl} icon={faEarthAmericas}>
							{props.homepageDomain}
						</IconButtonLink>
						<IconButtonLink to={`#${modalId}`} icon={faCircleQuestion} isInternal>
							About
						</IconButtonLink>
					</div>
				</SingleColumnLayout >
			</footer >
		</>
	);
}

Footer.defaultProps = {
	className: ''
};
