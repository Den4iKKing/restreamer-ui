import React from 'react';

import { useLingui } from '@lingui/react';
import { Trans, t } from '@lingui/macro';
import Typography from '@mui/material/Typography';

import SelectCustom from '../../../misc/SelectCustom';

function Bitrate(props) {
	const { i18n } = useLingui();
	const bitrates = [
		{ value: '256', label: '256 kbit/s' },
		{ value: '128', label: '128 kbit/s' },
		{ value: '64', label: '64 kbit/s' },
		{ value: '32', label: '32 kbit/s' },
		{ value: '16', label: '16 kbit/s' },
		{ value: '8', label: '8 kbit/s' },
	];

	if (props.allowAuto === true) {
		bitrates.unshift({ value: 'auto', label: 'auto' });
	}

	if (props.allowCustom === true) {
		bitrates.push({ value: 'custom', label: i18n._(t`Custom ...`) });
	}

	return (
		<React.Fragment>
			<SelectCustom
				options={bitrates}
				label={props.label}
				customLabel={props.customLabel}
				value={props.value}
				onChange={props.onChange}
				variant={props.variant}
				allowCustom={props.allowCustom}
			/>
			<Typography variant="caption">
				<Trans>The bitrate of the audio stream.</Trans>
			</Typography>
		</React.Fragment>
	);
}

Bitrate.defaultProps = {
	allowAuto: false,
	allowCustom: false,
	variant: 'outlined',
	label: <Trans>Bitrate</Trans>,
	customLabel: <Trans>Custom bitrate (kbit/s)</Trans>,
	onChange: function (event) {},
};

function Layout(props) {
	const { i18n } = useLingui();
	const options = [
		{ value: 'mono', label: 'mono' },
		{ value: 'stereo', label: 'stereo' },
	];

	if (props.allowAuto === true) {
		options.unshift({ value: 'auto', label: 'auto' });
	}

	if (props.allowInherit === true) {
		options.unshift({ value: 'inherit', label: i18n._(t`Inherit`) });
	}

	if (props.allowCustom === true) {
		options.push({ value: 'custom', label: i18n._(t`Custom ...`) });
	}

	return (
		<React.Fragment>
			<SelectCustom
				options={options}
				label={props.label}
				customLabel={props.customLabel}
				value={props.value}
				onChange={props.onChange}
				variant={props.variant}
				allowCustom={props.allowCustom}
			/>
			<Typography variant="caption">
				<Trans>The layout of the audio stream.</Trans>
			</Typography>
		</React.Fragment>
	);
}

Layout.defaultProps = {
	variant: 'outlined',
	allowAuto: false,
	allowInherit: false,
	allowCustom: false,
	label: <Trans>Layout</Trans>,
	customLabel: <Trans>Custom layout</Trans>,
	onChange: function () {},
};

function Sampling(props) {
	const { i18n } = useLingui();
	const options = [
		{ value: '96000', label: '96000 Hz' },
		{ value: '88200', label: '88200 Hz' },
		{ value: '48000', label: '48000 Hz' },
		{ value: '44100', label: '44100 Hz' },
		{ value: '22050', label: '22050 Hz' },
		{ value: '8000', label: '8000 Hz' },
	];

	if (props.allowAuto === true) {
		options.unshift({ value: 'auto', label: 'auto' });
	}

	if (props.allowInherit === true) {
		options.unshift({ value: 'inherit', label: i18n._(t`Inherit`) });
	}

	if (props.allowCustom === true) {
		options.push({ value: 'custom', label: i18n._(t`Custom ...`) });
	}

	return (
		<React.Fragment>
			<SelectCustom
				options={options}
				label={props.label}
				customLabel={props.customLabel}
				value={props.value}
				onChange={props.onChange}
				variant={props.variant}
				allowCustom={props.allowCustom}
			/>
			<Typography variant="caption">
				<Trans>The sample rate of the audio stream.</Trans>
			</Typography>
		</React.Fragment>
	);
}

Sampling.defaultProps = {
	variant: 'outlined',
	allowAuto: false,
	allowInherit: false,
	allowCustom: false,
	label: <Trans>Sampling</Trans>,
	customLabel: <Trans>Custom sampling (Hz)</Trans>,
	onChange: function () {},
};

export default {
	Bitrate,
	Layout,
	Sampling,
};
