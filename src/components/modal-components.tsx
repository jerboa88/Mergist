/*
	Reusable modal components
	-------------------------
*/

import type { ReactNode } from 'react';
import {
	faCookieBite,
	faEye,
	faThumbsUp,
	type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { LinkWrapper } from './links/wrapper';
import { InlineLink } from './links/inline';
import { PrimaryButton } from './buttons/primary';
import { MotionToggle, ThemeToggle } from '../components/toggle-components';

// Base components

// A generic modal component
function Modal(props: {
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
			<div className="modal-box sm:w-5/6 sm:max-w-4xl flex-col p-8 sm:px-16 overflow-hidden transition-[opacity, transform] has-motion scale-90 group-target:scale-100 ">
				<h3 className="text-lg font-bold text-center">{props.title}</h3>
				<br />
				{props.children}

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

// Exports

// A modal that displays info about the site
export function AboutModal(props: {
	id: string;
	author: string;
	authorUrl: string;
}) {
	const authorLink = (
		<InlineLink to={props.authorUrl} rel="author">
			{props.author}
		</InlineLink>
	);
	const reactLink = <InlineLink to="https://reactjs.org/">React</InlineLink>;
	const gatsbyLink = (
		<InlineLink to="https://www.gatsbyjs.org/">Gatsby</InlineLink>
	);
	const tailwindLink = (
		<InlineLink to="https://tailwindcss.com/">Tailwind CSS</InlineLink>
	);
	const githubPagesLink = (
		<InlineLink to="https://pages.github.com/">GitHub Pages</InlineLink>
	);
	const pancakeIconLink = (
		<InlineLink to="https://thenounproject.com/icon/pancakes-1974111/">
			"Pancakes" icon
		</InlineLink>
	);
	const pancakeIconLicenseLink = (
		<InlineLink to="https://creativecommons.org/licenses/by/3.0/">
			CC BY
		</InlineLink>
	);
	const fontAwesomeLink = (
		<InlineLink to="https://fontawesome.io/">FontAwesome</InlineLink>
	);

	return (
		<Modal
			id={props.id}
			title="About"
			buttonIcon={faThumbsUp}
			buttonLabel="Cool beans"
		>
			<p>
				Handcrafted with ❤️ by {authorLink}. Powered by {reactLink} +{' '}
				{gatsbyLink} + {tailwindLink}. Hosted by {githubPagesLink}.
			</p>
			<br />
			<p>
				{pancakeIconLink} by Kokota at NounProject.com is licensed under{' '}
				{pancakeIconLicenseLink} (with additional optimization and recoloring by
				me). Other assorted icons are from {fontAwesomeLink} by Dave Gandy.
			</p>
		</Modal>
	);
}

// A modal that displays info about the site
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
			<div className="flex-col m-auto w-fit">
				<MotionToggle />
				<ThemeToggle />
			</div>
		</Modal>
	);
}

// A modal that displays the privacy policy for the site
export function PrivacyModal(props: { id: string }) {
	const fullPrivacyPolicyLink = (
		<InlineLink
			to="https://johng.io/privacy-policy"
			rel="external privacy-policy"
		>
			full privacy policy
		</InlineLink>
	);

	return (
		<Modal
			id={props.id}
			title="Privacy Policy"
			buttonIcon={faCookieBite}
			buttonLabel="Yum"
		>
			<p>
				All processing is performed locally on your own device — no PDF files
				are ever uploaded to our servers. This also happens to make the merging
				process faster!
			</p>
			<br />
			<p>
				If you change any options, local storage will be used to store your
				settings between page visits. You can wipe the saved data for this site
				in your browser's settings.
			</p>
			<br />
			<p>
				This site may collect anonymized usage analytics. This data is used to
				help me improve the site and does include any personally identifiable
				information or any details about PDF files you add. This data is not
				used for tracking or marketing.
			</p>
			<br />
			<p>
				This is a summary of the privacy policy for this site. See the{' '}
				{fullPrivacyPolicyLink} for more details. By using this site to agree to
				these terms.
			</p>
		</Modal>
	);
}
