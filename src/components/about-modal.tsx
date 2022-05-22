import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { InlineLink, LinkWrapper } from '../components/link-components';
import { PrimaryButton } from '../components/button-components';


export default function AboutModal(props: { id: string; author: string; authorUrl: string; }) {
	const authorLink = <InlineLink to={props.authorUrl} rel="author">{props.author}</InlineLink>;
	const reactLink = <InlineLink to="https://reactjs.org/">React</InlineLink>;
	const gatsbyLink = <InlineLink to="https://www.gatsbyjs.org/">Gatsby</InlineLink>;
	const githubPagesLink = <InlineLink to="https://pages.github.com/">GitHub Pages</InlineLink>;
	const pancakeIconLink = <InlineLink to="https://thenounproject.com/icon/pancakes-1974111/">"Pancakes" icon</InlineLink>;
	const pancakeIconLicenseLink = <InlineLink to="https://creativecommons.org/licenses/by/3.0/">CC BY</InlineLink>;
	const fontAwesomeLink = <InlineLink to="https://fontawesome.io/">FontAwesome</InlineLink>;

	return (
		<div className="modal modal-bottom sm:modal-middle" id={props.id}>
			<div className="modal-box sm:w-5/6 sm:max-w-4xl flex flex-col p-8 gap-4 text-center">
				<h3 className="font-bold text-lg">About</h3>
				<p>
					Made by {authorLink} with love. Powered by {reactLink}, {gatsbyLink}, & {githubPagesLink}.
				</p>

				<p>
					{pancakeIconLink} by Kokota at NounProject.com is licensed under {pancakeIconLicenseLink} (with additional optimization and recoloring by me).
					Other assorted icons are from {fontAwesomeLink} by Dave Gandy.
				</p>

				<div className="divider" />

				<h3 className="font-bold text-lg">Privacy Policy</h3>
				<p>
					This site uses Google Analytics to collect general information about page visits such as browser details, time of visit, and which links were clicked on. By using this site to agree to these terms.
				</p>

				<p>
					This info is used to help me improve the site and does not include any personally identifiable information or any details about PDF files you add. It also does not make use of any advertising features provided by Google.
				</p>

				<p>
					All processing is performed locally on your own device, so no PDF files are ever uploaded to our servers. This also happens to make the merging process faster!
				</p>

				<div className="modal-action justify-center">
					<LinkWrapper to="#" isInternal>
						<PrimaryButton icon={faThumbsUp}>Cool beans</PrimaryButton>
					</LinkWrapper>
				</div>
			</div>
		</div>
	);
}
