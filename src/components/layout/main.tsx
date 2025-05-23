import type { ReactNode } from 'react';
import { SingleColumnLayout } from './single-column-layout.tsx';

/**
 * Wrapper that applies a single column layout to the main page content
 */
export function Main(props: { children: ReactNode }) {
	return (
		<main className="flex-col flex-1 w-full h-full">
			<SingleColumnLayout className="flex-1 sm:w-5/6" collapse>
				{props.children}
			</SingleColumnLayout>
		</main>
	);
}
