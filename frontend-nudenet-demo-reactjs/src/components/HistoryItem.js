import React from "react";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@material-ui/core";
import byteSize from "byte-size";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  media: {
    height: 140,
    width: "50%",
    minWidth: "50%",
  },
  actionArea: {
    display: "flex",
    alignItems: "center",
  },
}));

const HistoryItem = ({ imageUrl, imageName, size, timeCreate }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.actionArea}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image={imageUrl}
          title="Contemplative Reptile"
          className={classes.media}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {imageName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Size: {byteSize(size).toString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Time create: {moment.unix(timeCreate).toString()}
          </Typography>
        </CardContent>
      </div>
      <CardActions>
        <Button size="small" color="primary">
          Show
        </Button>
        <Button size="small" color="primary">
          Download
        </Button>
      </CardActions>
    </Card>
  );
};

export default HistoryItem;
