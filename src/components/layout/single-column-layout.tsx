import type { ReactNode } from 'react';

// Create an interface for SingleColumnLayout props since there are a lot of types to define
interface SingleColumnLayoutPropsInterface {
	className?: string;
	collapse?: boolean;
	children: ReactNode;
	// Allow prop injection
	[propName: string]: any;
}

/**
 * Inner layout container that limits the width of its content and accepts arbitrary props
 */
export function SingleColumnLayout(props: SingleColumnLayoutPropsInterface) {
	const { className, collapse, children, ...injectedProps } = props;

	return (
		<div
			className={`max-w-4xl h-full flex-col mx-auto gap-8 ${(collapse && 'w-full') || 'w-5/6'} ${className}`}
			{...injectedProps}
		>
			{children}
		</div>
	);
}
SingleColumnLayout.defaultProps = {
	className: '',
};
