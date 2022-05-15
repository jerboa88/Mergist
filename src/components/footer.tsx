import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEarthAmericas, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { SingleColumnLayout } from '../components/layout-components';
import AboutModal from '../components/about-modal';
import { IconButtonLink } from '../components/button-components';
import ThemeToggle from '../components/theme-toggle';


export default function Footer(props: { className: string; author: string; githubUrl: string; homepageUrl: string; homepageLabel: string; }) {
	const modalId = 'about-modal';


	return (
		<>
			<AboutModal id={modalId} author={props.author} authorUrl={props.homepageUrl} />

			<footer className="footer footer-center py-8 bg-base-300">
				<SingleColumnLayout>
					<ThemeToggle />

					<div className="flex flex-row w-full justify-between">
						<IconButtonLink href={props.githubUrl} icon={faGithub}>
							GitHub
						</IconButtonLink>
						<IconButtonLink href={props.homepageUrl} icon={faEarthAmericas}>
							{props.homepageLabel}
						</IconButtonLink>
						<IconButtonLink href={`#${modalId}`} icon={faCircleQuestion}>
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
