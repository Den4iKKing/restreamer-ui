import React from 'react';

import { Trans } from '@lingui/macro';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';

import Logo from './logos/owncast.svg';

import FormInlineButton from '../../../misc/FormInlineButton';

const id = 'owncast';
const name = 'KICK';
const version = '1.0';
const stream_key_link = 'https://kick.com/dashboard/settings/stream';
const description = <Trans>Live-Streaming to KICK Live RTMPS Service.</Trans>;
const image_copyright = '';
const author = {
	creator: {
		name: 'Den4iK',
		link: './',
	},
	maintainer: {
		name: 'Den4iK',
		link: './',
	},
};
const category = 'platform';
const requires = {
	protocols: ['rtmps'],
	formats: ['flv'],
	codecs: {
		audio: ['aac', 'mp3'],
		video: ['h264'],
	},
};

function ServiceIcon(props) {
	return <img src={Logo} alt="Owncast Logo" {...props} />;
}

function init(settings) {
	const initSettings = {
		key: '',
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
			address: 'rtmps://fa723fc1b171.global-contribute.live-video.net' + settings.key,
			options: ['-f', 'flv'],
		};

		return output;
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={9}>
				<TextField variant="outlined" fullWidth label={<Trans>Stream key</Trans>} value={settings.key} onChange={handleChange('key')} />
			</Grid>
			<Grid item xs={12} md={3}>
				<FormInlineButton target="blank" href={stream_key_link} component="a">
					<Trans>GET</Trans>
				</FormInlineButton>
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
