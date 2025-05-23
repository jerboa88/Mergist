import { faCookieBite } from '@fortawesome/free-solid-svg-icons';
import { InlineLink } from '../links/inline.tsx';
import { Modal } from './base.tsx';

const PRIVACY_POLICY_LINK = (
	<InlineLink
		to="https://johng.io/privacy-policy"
		rel="external privacy-policy"
	>
		full privacy policy
	</InlineLink>
);

/**
 * A modal that displays the privacy policy for the site
 */
export function PrivacyModal(props: { id: string }) {
	return (
		<Modal
			id={props.id}
			title="Privacy Policy"
			buttonIcon={faCookieBite}
			buttonLabel="Yum"
		>
			<p>
				All processing is performed locally on your own device — no PDF files
				are ever uploaded to our servers. This also happens to make the merging
				process faster!
			</p>
			<br />
			<p>
				If you change any options, local storage will be used to store your
				settings between page visits. You can wipe the saved data for this site
				in your browser's settings.
			</p>
			<br />
			<p>
				This site may collect anonymized usage analytics. This data is used to
				help me improve the site and does include any personally identifiable
				information or any details about PDF files you add. This data is not
				used for tracking or marketing.
			</p>
			<br />
			<p>
				This is a summary of the privacy policy for this site. See the{' '}
				{PRIVACY_POLICY_LINK} for more details. By using this site to agree to
				these terms.
			</p>
		</Modal>
	);
}
