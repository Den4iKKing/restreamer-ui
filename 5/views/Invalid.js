import React from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Paper from '../misc/Paper';
import PaperHeader from '../misc/PaperHeader';
import PaperContent from '../misc/PaperContent';
import PaperFooter from '../misc/PaperFooter';

import { Trans } from '@lingui/macro';

const isProbablyMixedContent = (address) => {
	try {
		const location = new URL(address);
		if (window.location.protocol === 'https:' && location.protocol === 'http:') {
			return true;
		}
	} catch (e) {}

	return false;
};

export default function Invalid(props) {
	const [$mixed] = React.useState(isProbablyMixedContent(props.address));

	return (
		<Paper xs={8} sm={6} md={6} className="PaperM">
			<PaperHeader title={<Trans>Error</Trans>} onAbort={() => window.location.reload()} />
			<PaperContent>
				<Typography>
					<Trans>Произошла ошибка при подключении к Comedoz Restreamer Core на{props.address}.</Trans>
				</Typography>
				{$mixed === true && (
					<Typography sx={{ mt: '1em' }}>
						<Trans>Не удалось подключиться к Comedoz Restreamer Core, вероятно, из-за смешанного контента.</Trans>
					</Typography>
				)}
			</PaperContent>
			<PaperFooter
				buttonsRight={
					<Button variant="outlined" color="primary" onClick={() => window.location.reload()}>
						<Trans>Повторить</Trans>
					</Button>
				}
			/>
		</Paper>
	);
}

Invalid.defaultProps = {
	address: '',
};
