import React from 'react';

import { useLingui } from '@lingui/react';
import { Trans, t } from '@lingui/macro';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import cc_zero from './images/cc-zero.svg';
import cc_by from './images/by.svg';
import cc_by_sa from './images/by-sa.svg';
import cc_by_nc from './images/by-nc.svg';
import cc_by_nc_sa from './images/by-nc-sa.svg';
import cc_by_nd from './images/by-nd.svg';
import cc_by_nc_nd from './images/by-nc-nd.svg';
import Select from '../../Select';

const useStyles = makeStyles((theme) => ({
	boxGray: {
		marginBottom: '.5em',
		marginTop: '.5em',
	},
	link: {
		marginTop: '.5em',
		wordBreak: 'break-word',
	},
}));

export default function License(props) {
	const classes = useStyles();

	const { i18n } = useLingui();

	const handleLicenseChange = (event) => {
		props.onChange(event.target.value);
	};

	let image = null;
	let link = '';
	let description = '';

	// eslint-disable-next-line no-useless-escape
	const reVersion = new RegExp('[0-9]+.[0-9]+$');

	let version = '4.0';
	const matches = props.license.match(reVersion);
	if (matches !== null) {
		version = matches[0];
	}

	const which = props.license.replace(reVersion, '').trim();

	switch (which) {
		case 'CC0':
			image = cc_zero;
			link = 'https://creativecommons.org/licenses/zero/1.0/';
			description = i18n._(
				t`Лицо, связавшее произведение с этим документом, сделало произведение общественным достоянием, отказавшись от всех своих прав на произведение во всем мире в соответствии с законом об авторском праве, включая все смежные и смежные права, в той мере, в какой это разрешено законом. Вы можете копировать, изменять, распространять и выполнять работу даже в коммерческих целях, не спрашивая разрешения.`
			);
			break;
		case 'CC BY':
			image = cc_by;
			link = `https://creativecommons.org/licenses/by/${version}/`;
			description = i18n._(
				t`Эта лицензия позволяет повторным пользователям распространять, микшировать, адаптировать и использовать материал на любом носителе или в любом формате при условии указания авторства. Лицензия разрешает коммерческое использование.`
			);
			break;
		case 'CC BY-SA':
			image = cc_by_sa;
			link = `https://creativecommons.org/licenses/by-sa/${version}/`;
			description = i18n._(
				t`Эта лицензия позволяет повторным пользователям распространять, микшировать, адаптировать и использовать материал на любом носителе или в любом формате при условии указания авторства. Лицензия разрешает коммерческое использование. If you remix, adapt, or build upon the material, you must license the modified material under identical terms.`
			);
			break;
		case 'CC BY-NC':
			image = cc_by_nc;
			link = `https://creativecommons.org/licenses/by-nc/${version}/`;
			description = i18n._(
				t`Эта лицензия позволяет повторным пользователям распространять, микшировать, адаптировать и использовать материал на любом носителе или в любом формате только в некоммерческих целях и только при условии указания авторства.`
			);
			break;
		case 'CC BY-NC-SA':
			image = cc_by_nc_sa;
			link = `https://creativecommons.org/licenses/by-nc-sa/${version}/`;
			description = i18n._(
				t`Эта лицензия позволяет повторным пользователям распространять, микшировать, адаптировать и использовать материал на любом носителе или в любом формате только в некоммерческих целях и только при условии указания авторства. If you remix, adapt, or build upon the material, you must license the modified material under identical terms.`
			);
			break;
		case 'CC BY-ND':
			image = cc_by_nd;
			link = `https://creativecommons.org/licenses/by-nd/${version}/`;
			description = i18n._(
				t`Эта лицензия позволяет повторным пользователям копировать и распространять материал на любом носителе или в любом формате только в неадаптированной форме и только при условии указания авторства. Лицензия разрешает коммерческое использование.`
			);
			break;
		case 'CC BY-NC-ND':
			image = cc_by_nc_nd;
			link = `https://creativecommons.org/licenses/by-nc-nd/${version}/`;
			description = i18n._(
				t`Эта лицензия позволяет повторным пользователям копировать и распространять материал на любом носителе или в любом формате только в неадаптированной форме, только в некоммерческих целях и только при условии указания авторства.`
			);
			break;
		default:
			break;
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Select label={<Trans>Creative Commons</Trans>} value={props.license} onChange={handleLicenseChange}>
					<MenuItem value="none">none</MenuItem>
					<MenuItem value="CC0 1.0">CC0 1.0</MenuItem>
					<MenuItem value="CC BY 4.0">CC BY 4.0</MenuItem>
					<MenuItem value="CC BY-SA 4.0">CC BY-SA 4.0</MenuItem>
					<MenuItem value="CC BY-NC 4.0">CC BY-NC 4.0</MenuItem>
					<MenuItem value="CC BY-NC-SA 4.0">CC BY-NC-SA 4.0</MenuItem>
					<MenuItem value="CC BY-ND 4.0">CC BY-ND 4.0</MenuItem>
					<MenuItem value="CC BY-NC-ND 4.0">CC BY-NC-ND 4.0</MenuItem>
				</Select>
			</Grid>
			{description.length !== 0 && (
				<Grid item xs={12}>
					<div className="boxGray {classes.root}">
						<Typography>{description}</Typography>
						<Typography className={classes.link}>
							<Link color="secondary" href={link} target="_blank" rel="noopener noreferrer">
								{link}
							</Link>
						</Typography>
					</div>
				</Grid>
			)}
			{image !== null && (
				<Grid item xs={12}>
					<Link href={link} target="_blank" rel="noopener noreferrer">
						<img src={image} alt={props.license} />
					</Link>
				</Grid>
			)}
		</Grid>
	);
}

License.defaultProps = {
	license: 'none',
	onChange: function (license) {},
};
