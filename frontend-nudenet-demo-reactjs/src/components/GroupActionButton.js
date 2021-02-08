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

function GroupActionButton({ isDisable, onViewImage, downloadUrl }) {
  const classes = useStyles();
  return (
    <div className={classes.buttonGroup}>
      <Button
        onClick={onViewImage}
        startIcon={<VisibilityIcon />}
        color="primary"
        variant="contained"
        disabled={isDisable}
      >
        View
      </Button>
      <Button
        // onClick={handleDownloadImage}
        href={downloadUrl}
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
