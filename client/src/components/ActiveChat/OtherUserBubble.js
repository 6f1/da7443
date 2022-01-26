import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar, Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)"
  },
  otherUserContent: {
    borderRadius: '0 10px 10px 10px',
    overflow: 'hidden'
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8,
    borderRadius: '0 10px 10px 10px'
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
    marginRight: '.5rem',
    borderRadius: '0 10px 10px 10px'
  },
  recieverImg: {
    objectFit: 'cover',
    height: '100%',
  }
}));

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, otherUser, attachments } = props;
  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        <Box className={classes.otherUserContent}>
          {text && (
            <Box className={classes.bubble}>
              <Typography className={classes.text}>{text}</Typography>
            </Box>
          )}
          <Grid container direction="row" justifyContent="flex-start">
            {attachments?.length > 0 && attachments.map((att, index) => (
              <Box className={attachments.length > 1 ? classes.imgBubbles : classes.imgBubble}>
                <img src={att} className={classes.recieverImg} alt={`${otherUser.username}'s image`}/>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
