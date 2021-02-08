import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import HTTPRequest from "services/http-request";
import {
  Paper,
  makeStyles,
  Typography,
  Box,
  Container,
  Grid,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import Image from "material-ui-image";
import GroupActionButton from "components/GroupActionButton";
import path from "path";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  dropArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    padding: theme.spacing(1),
  },
  imageArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 400,
    height: 300,
    [theme.breakpoints.down("sm")]: {
      width: 280,
      height: 210,
    },
  },
  centerDropItem: {
    textAlign: "center",
  },
}));

function MainArea({ handleLightBoxOpen }) {
  const RequestServer = new HTTPRequest();
  const classes = useStyles();
  const theme = createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 650,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });

  const [resultImageURL, setResultImageURL] = useState(null);
  const [originalImageURL, setOriginalImageURL] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setResultImageURL("");
    acceptedFiles.map(async (file) => {
      const imageURL = URL.createObjectURL(file);
      setOriginalImageURL(imageURL);
      await RequestServer.uploadImage(file)
        .then((res) => {
          setResultImageURL(
            process.env.REACT_APP_DOMAIN + res.data.result_image_url
          );
        })
        .catch((err) => setResultImageURL("error_url"));
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".jpeg, .png, .jpg",
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Container className={classes.root} maxWidth="md">
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
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="overline">Original Image</Typography>
              <Paper className={classes.imageArea} elevation={0}>
                {originalImageURL != null ? (
                  <Image
                    src={originalImageURL}
                    aspectRatio={4 / 3}
                    style={{ width: "100%" }}
                  />
                ) : (
                  <Typography variant="overline">
                    Upload an image first!
                  </Typography>
                )}
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="overline">NudeNet Filtered Image</Typography>
              <Paper className={classes.imageArea} elevation={0}>
                {resultImageURL != null && (
                  <Image
                    src={resultImageURL}
                    aspectRatio={4 / 3}
                    style={{ width: "100%" }}
                    onClick={() => handleLightBoxOpen(resultImageURL)}
                  />
                )}
              </Paper>
              <GroupActionButton
                isDisable={["", "error_url", null].indexOf(resultImageURL) >= 0}
                onViewImage={() => handleLightBoxOpen(resultImageURL)}
                downloadUrl={
                  process.env.REACT_APP_DOMAIN +
                  "/download/" +
                  path.basename(resultImageURL)
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </MuiThemeProvider>
  );
}

export default MainArea;
