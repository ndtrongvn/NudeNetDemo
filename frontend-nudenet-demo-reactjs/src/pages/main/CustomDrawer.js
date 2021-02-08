import React from "react";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  Button,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HistoryItem from "components/HistoryItem";
import path from "path";
const drawerWidth = 500;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
}));

function CustomDrawer({ onHandleClose, open, historyItems, onViewImage }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
      open={open}
    >
      <div className={classes.drawerHeader}>
        <Button
          onClick={onHandleClose}
          startIcon={
            theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )
          }
        >
          Histories
        </Button>
      </div>
      <Divider />
      <List>
        {historyItems.map((item, index) => (
          <ListItem key={index}>
            <HistoryItem
              imageName={item.name}
              imageUrl={process.env.REACT_APP_DOMAIN + item.url}
              downloadUrl={
                process.env.REACT_APP_DOMAIN +
                "/download/" +
                path.basename(item.url)
              }
              size={item.size}
              timeCreate={item.time_create}
              onViewImage={onViewImage}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default CustomDrawer;
