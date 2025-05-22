// External deps
import React from 'react';

// Local deps
import config from '../../gatsby-config';
import { loadMetadata } from '../common/utilities';
import Footer from '../components/footer';
import Header from '../components/header';
import { PageLayout } from '../components/layout-components';


export default function IndexPage() {
  const metadata = loadMetadata(config);

  return (
    <PageLayout metadata={{ ...metadata, siteUrl: `${metadata.siteUrl}/404` }} className="gap-0">
      <Header title="Oof" className="flex-1">
        We couldn't find the page you're looking for. If something is supposed to be here, please create an issue on GitHub :)
      </Header>

      <Footer author={metadata.author} githubUrl={metadata.githubUrl} homepageDomain={metadata.homepageDomain} />
    </PageLayout>
  );
}
