import React from 'react';

import Logo from './logos/vkplay.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Trans } from '@lingui/macro';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormInlineButton from '../../../misc/FormInlineButton';

const id = 'vimeo';
const name = 'VKPlayLive';
const version = '1.0';
const description = <Trans>Live-Streaming to vkplay.live Live RTMP Service</Trans>;
const stream_key_link = 'https://vkplay.live/studio';
const image_copyright = <Trans>More about licenses here</Trans>;
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
const category = 'platform';
const requires = {
	protocols: ['rtmp'],
	formats: ['flv'],
	codecs: {
		audio: ['aac', 'mp3'],
		video: ['h264'],
	},
};

function ServiceIcon(props) {
	return <img src={Logo} alt="VKplay Logo" {...props} />;
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
			address: 'rtmp://vsu.mycdn.me/input/' + settings.key,
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
