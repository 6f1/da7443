import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar, Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  recieverRoot: {
    display: "flex"
  },
  senderRoot: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "flex-end"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  senderDate: {
    textAlign: 'end'
  },
  recieverDate: {
    textAlign: 'start'
  },
  recieverText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8,
    borderRadius: '0 10px 10px 10px'
  },
  senderText: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
    borderRadius: "10px 10px 0 10px"
  },
  recieverBubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: '0 10px 10px 10px',
    width: 'max-content'
  },
  senderBubble: {
    background: "#F4F6FA",
    borderRadius: '10px 10px 0 10px',
    width: 'max-content',
  },
  senderUserContent: {
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
  },
  senderImgBox: {
    borderRadius: '10px 10px 0 10px',
    marginTop: '.5rem',
    marginLeft: '.5rem',
    overflow: 'hidden'
  },
  recieverImgBox: {
    borderRadius: '0 10px 10px 10px',
    marginTop: '.5rem',
    marginLeft: '.5rem',
    overflow: 'hidden',
  },
  bubbleImg: {
    objectFit: 'cover',
    height: '100%'
  }
}));

const Bubble = (props) => {
  const classes = useStyles();
  const { time, text, otherUser, attachments } = props;
  return (
    <Box className={otherUser ? classes.recieverRoot : classes.senderRoot}>
      {otherUser && (
        <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}/>
      )}
      <Box>
        <Typography className={`${classes.date} ${otherUser ? classes.recieverDate : classes.senderDate}`}>
          {otherUser?.username && otherUser.username} {time}
        </Typography>
        <Grid container direction="column" alignItems={otherUser ? "flex-start" : "flex-end"}>
          {text && (
            <Box className={otherUser ? classes.recieverBubble : classes.senderBubble}>
              <Typography className={otherUser ? classes.recieverText : classes.senderText}>{text}</Typography>
            </Box>
          )}
          <Grid container direction="row" justifyContent="flex-end">
            {attachments?.length > 0 && attachments.map((att, index) => (
              <Box className={`${otherUser ? classes.recieverImgBox : classes.senderImgBox} ${attachments.length > 1 ? classes.imgBubbles : classes.imgBubble}`} key={att}>
                <img src={att} className={classes.bubbleImg} alt={otherUser ? `${otherUser.username}'s image` : "Your image"}/>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Bubble;
