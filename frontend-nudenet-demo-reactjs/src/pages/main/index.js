import React from "react";

import { makeStyles, CssBaseline } from "@material-ui/core";
import CustomDrawer from "./CustomDrawer";
import CustomAppBar from "./CustomAppBar";
import MainArea from "./MainArea";

import HTTPRequest from "services/http-request";

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
  const RequestServer = new HTTPRequest();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [historyItems, setHistoryItems] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (open) {
      RequestServer.getHistories().then((res) => {
        setHistoryItems(res.data.histories);
      });
    }
  }, [open]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CustomAppBar onHandleOpenDrawer={handleDrawerOpen} open={open} />
      <main className={classes.content}>
        <div className={classes.drawerHeader} />
        <MainArea />
      </main>
      <CustomDrawer
        onHandleClose={handleDrawerClose}
        open={open}
        historyItems={historyItems}
      />
    </div>
  );
};

export default Main;
