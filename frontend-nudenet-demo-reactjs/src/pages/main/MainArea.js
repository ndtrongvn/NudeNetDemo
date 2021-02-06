import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as Constant from "utils/constants";
import HTTPRequest from "services/http-request";
import {
  Paper,
  makeStyles,
  Typography,
  Box,
  Container,
  Grid,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import Image from "material-ui-image";

const host = "http://localhost:5000";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  dropArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    padding: theme.spacing(2),
  },
  imageArea: {
    maxWidth: "250",
    maxHeight: "250",
  },
  centerDropItem: {
    textAlign: "center",
  },
}));

function MainArea() {
  const RequestServer = new HTTPRequest();
  const classes = useStyles();

  const [resultImageURL, setResultImageURL] = useState(null);
  const [originalImageURL, setOriginalImageURL] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setResultImageURL("");
    acceptedFiles.map(async (file) => {
      const imageURL = URL.createObjectURL(file);
      setOriginalImageURL(imageURL);
      await RequestServer.uploadImage(file)
        .then((res) => setResultImageURL(host + res.data.result_image_url))
        .catch((err) => setResultImageURL("error_url"));
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            {...getRootProps()}
            variant="outlined"
            className={classes.dropArea}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography variant="overline">
                Drop the image here ...
              </Typography>
            ) : (
              <Box
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                className={classes.centerDropItem}
              >
                <Box>
                  <PublishIcon color="primary" />
                </Box>
                <Box>
                  <Typography variant="overline">
                    Drag & drop image here, or click to select
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="overline">Original Image</Typography>
          <Paper>
            {originalImageURL != null ? (
              <Image src={originalImageURL} aspectRatio={4 / 3} />
            ) : (
              <Typography variant="body2">Input image first!!</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="overline">NudeNet Filtered Image</Typography>
          <Paper>
            {resultImageURL != null && (
              <Image src={resultImageURL} aspectRatio={4 / 3} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainArea;
