import React from 'react';
import { ExternalLink } from '../components/links';


export default function AboutModal(props: { id: string; author: string; authorUrl: string; }) {
	const authorLink = <ExternalLink to={props.authorUrl} rel="author">{props.author}</ExternalLink>;
	const reactLink = <ExternalLink to="https://reactjs.org/">React</ExternalLink>;
	const gatsbyLink = <ExternalLink to="https://www.gatsbyjs.org/">Gatsby</ExternalLink>;
	const githubPagesLink = <ExternalLink to="https://pages.github.com/">GitHub Pages</ExternalLink>;
	const pancakeIconLink = <ExternalLink to="https://thenounproject.com/icon/pancakes-1974111/">"Pancakes" icon</ExternalLink>;
	const pancakeIconLicenseLink = <ExternalLink to="https://creativecommons.org/licenses/by/3.0/">CC BY</ExternalLink>;
	const fontAwesomeLink = <ExternalLink to="http://fontawesome.io/">FontAwesome</ExternalLink>;

	return (
		<div className="modal" id={props.id}>
			<div className="modal-box w-4/5 max-w-4xl flex flex-col p-8 gap-4 text-center">
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
					This site performs does not collect any information about you.
					All processing is performed locally on your own device, so no PDF files are ever uploaded to our servers. This also happens to make the merging process faster!
				</p>

				<div className="modal-action justify-center">
					<a href="#" className="btn btn-primary">Cool beans</a>
				</div>
			</div>
		</div>
	);
}
