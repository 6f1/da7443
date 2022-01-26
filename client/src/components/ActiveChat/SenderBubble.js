import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
    borderRadius: "10px 10px 0 10px"
  },
  bubble: {
    background: "#F4F6FA",
  },
  senderUserContent: {
    borderRadius: '10px 10px 0 10px',
    overflow: 'hidden'
  },
  imgBubble: {
    maxWidth: '10rem',
    maxHeight: '10rem',
    overflow: 'hidden',
  },
  imgBubbles: {
    maxWidth: '5rem',
    maxHeight: '5rem',
    overflow: 'hidden',
    borderRadius: '10px 10px 0 10px',
    marginLeft: '.5rem'
  },
  senderImg: {
    objectFit: 'cover',
    height: '100%',
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.senderUserContent}>
        {text && (
          <Box className={classes.bubble}>
            <Typography className={classes.text}>{text}</Typography>
          </Box>
        )}
        <Grid container direction="row" justifyContent="flex-end">
          {attachments && attachments.length > 0 && attachments.map((att, index) => (
            <Box className={attachments.length > 1 ? classes.imgBubbles : classes.imgBubble}>
              <img src={att} className={classes.senderImg} alt="Your image"/>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SenderBubble;
