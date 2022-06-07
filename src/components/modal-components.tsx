/*
	Reusable modal components
	-------------------------
*/


import React, { ReactNode } from 'react';
import { faAngleDown, faCookieBite, faThumbsUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { InlineLink, LinkWrapper } from '../components/link-components';
import { PrimaryButton } from '../components/button-components';
import { ToggleIcon } from '../components/icon-components';
import { Accordion } from '../components/accordion-components';


// Base components

// A generic modal component
function Modal(props: { id: string; title: string; buttonIcon: IconDefinition; buttonLabel: string; children: ReactNode; }) {
	return (
		<div className="modal modal-bottom sm:modal-middle overflow-hidden" id={props.id}>
			<div className="modal-box sm:w-5/6 sm:max-w-4xl flex-col p-8 text-center overflow-hidden">
				<h3 className="font-bold text-lg">{props.title}</h3>
				<br />
				{props.children}

				<div className="modal-action justify-center">
					<LinkWrapper to="#" isInternal>
						<PrimaryButton icon={props.buttonIcon}>{props.buttonLabel}</PrimaryButton>
					</LinkWrapper>
				</div>
			</div>
		</div>
	);
}


// Exports

// A modal that displays info about the site
export function AboutModal(props: { id: string; author: string; authorUrl: string; }) {
	const authorLink = <InlineLink to={props.authorUrl} rel="author">{props.author}</InlineLink>;
	const reactLink = <InlineLink to="https://reactjs.org/">React</InlineLink>;
	const gatsbyLink = <InlineLink to="https://www.gatsbyjs.org/">Gatsby</InlineLink>;
	const tailwindLink = <InlineLink to="https://tailwindcss.com/">Tailwind CSS</InlineLink>;
	const githubPagesLink = <InlineLink to="https://pages.github.com/">GitHub Pages</InlineLink>;
	const pancakeIconLink = <InlineLink to="https://thenounproject.com/icon/pancakes-1974111/">"Pancakes" icon</InlineLink>;
	const pancakeIconLicenseLink = <InlineLink to="https://creativecommons.org/licenses/by/3.0/">CC BY</InlineLink>;
	const fontAwesomeLink = <InlineLink to="https://fontawesome.io/">FontAwesome</InlineLink>;

	return (
		<Modal id={props.id} title="About" buttonIcon={faThumbsUp} buttonLabel="Cool beans">
			<p>
				Handcrafted with love by {authorLink}. Powered by {reactLink} + {gatsbyLink} + {tailwindLink}. Hosted by {githubPagesLink}.
			</p>
			<br />
			<p>
				{pancakeIconLink} by Kokota at NounProject.com is licensed under {pancakeIconLicenseLink} (with additional optimization and recoloring by me).
				Other assorted icons are from {fontAwesomeLink} by Dave Gandy.
			</p>
		</Modal>
	);
}


// A modal that displays the privacy policy for the site
export function PrivacyModal(props: { id: string; }) {
	const [isOpen, setIsOpen] = React.useState(false);
	const gaLink = <InlineLink to="https://www.google.com/analytics/">Google Analytics</InlineLink>;

	function toggleIsOpen() {
		setIsOpen(!isOpen);
	}

	return (
		<Modal id={props.id} title="Hey there!" buttonIcon={faCookieBite} buttonLabel="Yum">
			<p>
				This site uses cookies to store your settings and info about how you use the site. By using this site to agree to these terms.
			</p>
			<br />
			<p>
				The collected data is used to help me improve the site and does include any personally identifiable information or any details about PDF files you add.
			</p>
			<br />
			<p>
				<label>
					<input type="checkbox" checked={isOpen} onChange={toggleIsOpen} className="hidden" />{' '}
					<InlineLink isInternal>
						{'More details '}
						<ToggleIcon icon={faAngleDown} isToggled={isOpen} tw="fa-sm !align-middle" />
					</InlineLink>
				</label>
			</p>
			<br />
			<Accordion isOpen={isOpen}>
				<p>
					{gaLink} is used to collect general information about page visits such as browser details, time of visit, and which links were clicked on.
				</p>
				<br />
				<p>
					We do not make use of any advertising features provided by Google, and because all processing is performed locally on your own device, no PDF files are ever uploaded to our servers. This also happens to make the merging process faster!
				</p>
			</Accordion>
		</Modal>
	);
}
