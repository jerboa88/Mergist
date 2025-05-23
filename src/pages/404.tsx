// Local deps
import config from '../../gatsby-config.ts';
import { loadMetadata } from '../common/utilities.ts';
import { Footer } from '../components/layout/footer.tsx';
import { Header } from '../components/layout/header.tsx';
import { PageLayout } from '../components/layout/page-layout.tsx';

export default function IndexPage() {
	const metadata = loadMetadata(config);

	return (
		<PageLayout
			metadata={{ ...metadata, siteUrl: `${metadata.siteUrl}/404` }}
			className="gap-0"
		>
			<Header title="Oof" className="flex-1">
				We couldn't find the page you're looking for. If something is supposed
				to be here, please create an issue on GitHub :)
			</Header>

			<Footer
				author={metadata.author}
				githubUrl={metadata.githubUrl}
				homepageDomain={metadata.homepageDomain}
			/>
		</PageLayout>
	);
}
