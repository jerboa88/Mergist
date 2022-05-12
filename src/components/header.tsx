
import React, { ReactNode } from 'react';
import { SingleColumnLayout } from '../components/layout-components';
import LogoIcon from '../images/favicon.svg';


export default function Header(props: { title: string; url: string; children: ReactNode; }) {
	return (
		<header className="w-full footer footer-center p-8 bg-base-300">
			<SingleColumnLayout className="justify-center">
				<a href={props.url}>
					<h1 className='text-5xl font-heading font-black uppercase text-secondary'>
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
