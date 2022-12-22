import React from 'react';

import { Trans } from '@lingui/macro';
import makeStyles from '@mui/styles/makeStyles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import ModalContent from '../ModalContent';
import Progress from '../Progress';
import Textarea from '../Textarea';

const useStyles = makeStyles((theme) => ({
	title: {
		marginBottom: '-.3em',
		marginTop: '0em',
		fontWeight: 'bold',
	},
	textarea: {
		marginBottom: '-1em',
	},
	box: {
		backgroundColor: theme.palette.background.modalbox,
		borderRadius: 4,
		padding: '1em',
	},
	banner: {
		marginBottom: '-1em',
	},
	logging: {
		marginTop: '.15em',
	},
}));

const initLogdata = (logdata) => {
	if (!logdata) {
		logdata = {};
	}

	return {
		prelude: [],
		log: [],
		...logdata,
	};
};

const formatLogline = (entry) => {
	let line = '@' + entry[0] + ' ';

	const matches = entry[1].match(/^\[([0-9A-Za-z]+) @ 0x[0-9a-f]+\]/i);
	if (matches !== null) {
		let t = '[' + matches[1];
		for (let i = 0; i < 10 - matches[1].length; i++) {
			t += ' ';
		}
		t += ']';
		line += entry[1].replace(matches[0], t);
	} else {
		line += entry[1];
	}

	return line;
};

const Component = function (props) {
	const classes = useStyles();
	const logdata = initLogdata(props.logdata);

	return (
		<Modal open={props.open} onClose={props.onClose} className="modal">
			<ModalContent title={props.title} onClose={props.onClose} onHelp={props.onHelp}>
				<Grid container spacing={1}>
					<Grid item xs={12} md={8} lg={10}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<div className={classes.box}>
									<Grid container spacing={1}>
										<Grid item xs={12} className={classes.banner}>
											<Typography variant="body1" className={classes.title}>
												<Trans>Banner</Trans>
											</Typography>
											<Textarea rows={9} value={logdata.prelude.join('\n')} scrollTo="bottom" readOnly allowCopy />
										</Grid>
										<Grid item xs={12} marginTop={2}>
											<Divider />
										</Grid>
										<Grid item xs={12} className={classes.logging}>
											<Typography variant="body1" className={classes.title}>
												<Trans>Logging</Trans>
											</Typography>
											<Textarea rows={16} value={logdata.log.map(formatLogline).join('\n')} scrollTo="bottom" readOnly allowCopy />
										</Grid>
									</Grid>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} md={4} lg={2}>
						{props.progress !== null && <Progress {...props.progress} />}
					</Grid>
				</Grid>
			</ModalContent>
		</Modal>
	);
};

export default Component;

Component.defaultProps = {
	open: false,
	title: '',
	progress: {},
	logdata: {
		prelude: [],
		log: [],
	},
	onClose: null,
	onHelp: null,
};
