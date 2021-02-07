import React from "react";

import DownloadIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    "& > *": {
      margin: theme.spacing(1),
      borderRadius: 0,
    },
  },
}));

function GroupActionButton({
  isDisable,
  handleOpenLightBox,
  handleDownloadImage,
}) {
  const classes = useStyles();
  return (
    <div className={classes.buttonGroup}>
      <Button
        onClick={handleOpenLightBox}
        startIcon={<VisibilityIcon />}
        color="primary"
        variant="contained"
        disabled={isDisable}
      >
        View
      </Button>
      <Button
        onClick={handleDownloadImage}
        disabled={isDisable}
        variant="contained"
        color="primary"
        startIcon={<DownloadIcon />}
      >
        Download
      </Button>
    </div>
  );
}

export default GroupActionButton;
