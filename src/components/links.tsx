import React, { ReactNode } from 'react';


function Link(props: { to: string; rel: string; children: ReactNode; }) {
	return (
		<a className="link link-secondary no-underline border-b-[1px] border-transparent transition-colors duration-200 hover:border-current"
			target="_blank" href={props.to} rel={`noopener ${props.rel}`}>
			{props.children}
		</a>
	);
}

Link.defaultProps = {
	rel: ''
}


export function ExternalLink(props: { to: string; rel: string; children: ReactNode; }) {
	return (
		<Link to={props.to} rel={`external ${props.rel}`}>
			{props.children}
		</Link>
	);
}

ExternalLink.defaultProps = {
	rel: ''
}
