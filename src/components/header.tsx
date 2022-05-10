
import React, { ReactNode } from 'react';
import '@fontsource/luckiest-guy';
import { SingleColumnLayout } from '../components/layout-components';
import LogoIcon from '../images/favicon.svg';


export default function Header(props: { className: string; title: string; url: string; children: ReactNode; }) {
	return (
		<header className={`w-full footer footer-center p-8 bg-base-300 ${props.className}`}>
			<SingleColumnLayout className="justify-center">
				<a href={props.url}>
					<h1 className='text-5xl font-["Luckiest_Guy"] font-black text-secondary'>
						<LogoIcon className="svg-inline--fa mr-2 fa-sm !align-baseline" />
						{props.title}
					</h1>
				</a>
				<p className="text-center">
					{props.children}
				</p>
			</SingleColumnLayout>
		</header>
	);
}

Header.defaultProps = {
	className: ''
};
