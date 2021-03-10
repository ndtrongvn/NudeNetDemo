import React from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden,
} from "@material-ui/core";
import clsx from "clsx";

import HistoryIcon from "@material-ui/icons/History";
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },

  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
}));

function CustomAppBar({ onHandleOpenDrawer, open }) {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
          Censored Demo
        </Typography>
        <Button
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={onHandleOpenDrawer}
          className={clsx(open && classes.hide)}
          endIcon={<HistoryIcon></HistoryIcon>}
        >
          <Hidden smDown>Show history</Hidden>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;
