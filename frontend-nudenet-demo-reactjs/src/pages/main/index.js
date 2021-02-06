import React from "react";

import { makeStyles, CssBaseline, Typography } from "@material-ui/core";

import clsx from "clsx";
import CustomDrawer from "./CustomDrawer";
import CustomAppBar from "./CustomAppBar";
import MainArea from "./MainArea";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
}));

const Main = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <CustomAppBar onHandleOpenDrawer={handleDrawerOpen} open={open} />
      <main className={classes.content}>
        <div className={classes.drawerHeader} />
        <MainArea />
      </main>
      <CustomDrawer onHandleClose={handleDrawerClose} open={open} />
    </div>
  );
};

export default Main;
