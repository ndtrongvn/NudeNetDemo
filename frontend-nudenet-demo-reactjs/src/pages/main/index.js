import React, { useState, useEffect } from "react";

import { makeStyles, CssBaseline } from "@material-ui/core";
import CustomDrawer from "./CustomDrawer";
import CustomAppBar from "./CustomAppBar";
import MainArea from "./MainArea";
import { Lightbox } from "react-modal-image";
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
  const [open, setOpen] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);
  const [openLightBox, setOpenLightBox] = useState(false);
  const [lbImageUrl, setLbImageUrl] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLightBoxOpen = (url) => {
    setLbImageUrl(url);
    setOpenLightBox(true);
  };

  useEffect(() => {
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
        <MainArea handleLightBoxOpen={handleLightBoxOpen} />
      </main>
      <CustomDrawer
        onHandleClose={handleDrawerClose}
        open={open}
        historyItems={historyItems}
        onViewImage={handleLightBoxOpen}
      />
      {openLightBox && (
        <Lightbox
          medium={lbImageUrl}
          large={lbImageUrl}
          hideDownload={true}
          showRotate={true}
          hideZoom={true}
          alt="View full screen"
          onClose={() => setOpenLightBox(false)}
        />
      )}
    </div>
  );
};

export default Main;
