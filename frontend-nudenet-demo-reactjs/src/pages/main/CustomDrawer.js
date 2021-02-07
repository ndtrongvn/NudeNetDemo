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
const drawerWidth = 500;
const host = "http://localhost:5000";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: "absolute",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
}));

function CustomDrawer({ onHandleClose, open, historyItems }) {
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
              imageUrl={host + item.url}
              size={item.size}
              timeCreate={item.time_create}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default CustomDrawer;
