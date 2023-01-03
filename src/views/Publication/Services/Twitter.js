import React from 'react';

import Logo from './logos/wasd.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Trans } from '@lingui/macro';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormInlineButton from '../../../misc/FormInlineButton';

const id = 'twitter';
const name = 'wasd.tv';
const version = '1.0';
const description = <Trans>Прямая трансляция на сервис wasd.tv Live RTMP</Trans>;
const stream_key_link = 'https://wasd.tv/stream-settings';
const image_copyright = <Trans>Подробнее о лицензиях здесь</Trans>;
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
	protocols: ['rtmp'],
	formats: ['flv'],
	codecs: {
		audio: ['aac', 'mp3'],
		video: ['h264'],
	},
};

function ServiceIcon(props) {
	return <img src={Logo} alt="wasd Logo" {...props} />;
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

		const outputs = createOutput(settings);

		props.onChange(outputs, settings);
	};

	const createOutput = (settings) => {
		const output = {
			address: 'rtmp://push.rtmp.wasd.tv/live/' + settings.key,
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