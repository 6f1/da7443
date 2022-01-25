import React, { useState, useRef } from "react";
import { FormControl, FilledInput, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15
  },
  inputContainer: {
    display: 'inline-flex'
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  },
  inputOverlay: {
    position: 'absolute',
    right: '1rem',
    top: '1.5rem',
    cursor: 'pointer',
    color: "#BECCE2"
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  const [ attachments, setAttachments ] = useState([]);
  const { postMessage, otherUser, conversationId, user } = props;

  const getCloudinaryUrl = async (file) => {
    const apiKey = '256692893972532', preset = 'gs64sqvm', formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('upload_preset', preset);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${preset}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const { secure_url } = await res.json();
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // upload to cloudinary
    let links = [];
    for (const file of attachments) {
      // get cloudinary links here
      const newLink = await getCloudinaryUrl(file);
      links.push(newLink);
    }

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: links
    };
    await postMessage(reqBody);
    setText("");
    setAttachments([])
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      {attachments.map((att, index) => (
        <Chip label={att.name} onDelete={() => setAttachments(attachments.filter((file) => file.name !== att.name))} key={index}/>
      ))}
      <FormControl fullWidth hiddenLabel className={classes.inputContainer}>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
        <FileCopyOutlinedIcon onClick={() => fileInputRef && fileInputRef.current && fileInputRef.current.click()} className={classes.inputOverlay}/>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={(e) => setAttachments([...attachments, ...e.target.files])}
          multiple={true}
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
