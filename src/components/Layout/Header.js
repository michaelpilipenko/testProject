import React from 'react';
import PropTypes from 'prop-types'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
	toolbar: {
		paddingRight: 24,
	},
	title: {
		flexGrow: 1,
	},
}));

const Header = ({handleThemeChange, darkTheme}) => {
	const classes = useStyles();
	return (
		<>
			<AppBar position="absolute">
				<Toolbar className={classes.toolbar}>
					<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
						Test Project
					</Typography>
					<Switch checked={darkTheme} onChange={handleThemeChange} />
				</Toolbar>
			</AppBar>
		</>
)};

Header.propTypes = {
	darkTheme: PropTypes.bool.isRequired,
	handleThemeChange: PropTypes.func.isRequired
};

export default Header;