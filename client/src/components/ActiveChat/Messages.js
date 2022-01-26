import React from "react";
import { Box } from "@material-ui/core";
import { Bubble } from '../ActiveChat';
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <Bubble key={message.id} text={message.text} time={time} attachments={message.attachments}/>
        ) : (
          <Bubble key={message.id} text={message.text} attachments={message.attachments} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
