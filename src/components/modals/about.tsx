import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { InlineLink } from '../links/inline.tsx';
import { Modal } from './base.tsx';

const REACT_LINK = <InlineLink to="https://reactjs.org/">React</InlineLink>;
const GATSBY_LINK = (
	<InlineLink to="https://www.gatsbyjs.org/">Gatsby</InlineLink>
);
const TAILWIND_CSS_LINK = (
	<InlineLink to="https://tailwindcss.com/">Tailwind CSS</InlineLink>
);
const GITHUB_PAGES_LINK = (
	<InlineLink to="https://pages.github.com/">GitHub Pages</InlineLink>
);
const PANCAKE_ICON_LINK = (
	<InlineLink to="https://thenounproject.com/icon/pancakes-1974111/">
		"Pancakes" icon
	</InlineLink>
);
const PANCAKE_ICON_LICENSE_LINK = (
	<InlineLink to="https://creativecommons.org/licenses/by/3.0/">
		CC BY
	</InlineLink>
);
const FONT_AWESOME_LINK = (
	<InlineLink to="https://fontawesome.io/">FontAwesome</InlineLink>
);

/**
 * A modal that displays info about the site
 */
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

	return (
		<Modal
			id={props.id}
			title="About"
			buttonIcon={faThumbsUp}
			buttonLabel="Cool beans"
		>
			<p>
				Handcrafted with ❤️ by {authorLink}. Powered by {REACT_LINK} +{' '}
				{GATSBY_LINK} + {TAILWIND_CSS_LINK}. Hosted by {GITHUB_PAGES_LINK}.
			</p>
			<br />
			<p>
				{PANCAKE_ICON_LINK} by Kokota at NounProject.com is licensed under{' '}
				{PANCAKE_ICON_LICENSE_LINK} (with additional optimization and recoloring
				by me). Other assorted icons are from {FONT_AWESOME_LINK} by Dave Gandy.
			</p>
		</Modal>
	);
}
