import React from 'react';

import { Trans } from '@lingui/macro';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

import Logo from './logos/owncast.svg';

const id = 'owncast';
const name = 'Owncast';
const version = '1.0';
const stream_key_link = '';
const description = (
	<Trans>
		Transmit your Livestream to an Owncast server.{' '}
		<Link color="secondary" target="_blank" href="https://owncast.online/quickstart/startstreaming/">
			Here{' '}
		</Link>
		you can find more details about the settings.
	</Trans>
);
const image_copyright = <Trans>Please get in touch with the operator of the service and check what happens.</Trans>;
const author = {
	creator: {
		name: 'Den4iK',
		link: 'http://restreamer.ru',
	},
	maintainer: {
		name: 'Den4iK',
		link: 'http://restreamer.ru',
	},
};
const category = 'software';
const requires = {
	protocols: ['rtmps'],
	formats: ['flv'],
	codecs: {
		audio: ['aac', 'mp3'],
		video: ['h264'],
	},
};

function ServiceIcon(props) {
	return <img src={Logo} alt="Telegram Logo" {...props} />;
}

function init(settings) {
	const initSettings = {
		protocol: 'rtmp://',
		server_url: '',
		stream_key: '',
		...settings,
	};

	return initSettings;
}

function Service(props) {
	const settings = init(props.settings);

	const handleChange = (what) => (event) => {
		const value = event.target.value;

		settings[what] = value;

		const output = createOutput(settings);

		props.onChange([output], settings);
	};

	const createOutput = (settings) => {
		const output = {
			address: settings.protocol + settings.server_url + '/' + settings.stream_key,
			options: ['-f', 'flv'],
		};

		return output;
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={3}>
				<TextField
					variant="outlined"
					fullWidth
					type="url"
					label={<Trans>Protocol</Trans>}
					value={settings.protocol}
					onChange={handleChange('protocol')}
					readOnly
					disabled
				/>
			</Grid>
			<Grid item xs={12} md={9}>
				<TextField
					variant="outlined"
					fullWidth
					placeholder="yourserver/live"
					label={<Trans>Server URL</Trans>}
					value={settings.server_url}
					onChange={handleChange('server_url')}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					variant="outlined"
					fullWidth
					placeholder="abc123"
					label={<Trans>Stream key</Trans>}
					value={settings.stream_key}
					onChange={handleChange('stream_key')}
				/>
			</Grid>
		</Grid>
	);
}

Service.defaultProps = {
	settings: {},
	skills: {},
	metadata: {},
	streams: [],
	onChange: function (output, settings) {},
};

export { id, name, version, stream_key_link, description, image_copyright, author, category, requires, ServiceIcon as icon, Service as component };
