import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  FormHelperText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login, register } from "./store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    height: '100vh'
  },
  leftPane: {
    position: 'relative',
    overflow: 'hidden',
    width: '42%',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  leftPaneBgBox: {
    position : 'absolute',
    width : "100%",
    height: "100%",
    zIndex: 10
  },
  leftPaneBgImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top'
  },
  leftPaneBgFilter: {
    position : 'absolute',
    width : "100%",
    zIndex: 20,
    backgroundColor: `rgba(${theme.palette.primary.mainRGB}, .75)`,
    height: '100%'
  },
  leftPaneOverlay: {
    position: 'relative',
    zIndex: 30,
    height: '100%',
  },
  leftPaneOverlayText: {
    color : 'white',
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily,
    fontWeight: 100,
    maxWidth: '75%',
    marginBottom: '3rem'
  },
  rightPane: {
    width: '58%',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  rightPaneHeader: {
    height: '10%',
    padding: '1rem',
    [theme.breakpoints.down('sm')]: {
      height: 'auto'
    }
  },
  rightPaneHeaderText: {
    color : 'rgba(0, 0, 0, 0.54)'
  },
  rightPaneHeaderBtn: {
     marginLeft: '2rem',
     height: '4rem',
     color: theme.palette.neutral.contrastText,
     backgroundColor: theme.palette.neutral.main,
     padding: '0 3rem'
  },
  rightPaneMain: {
    height: '90%',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      padding: '1rem'
    }
  },
  rightPaneForm: {
    width: '100%'
  },
  formText: {
    width: '100%',
    textAlign: 'left',
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600
  },
  formSubmitBtn: {
    height: '4rem',
    marginTop: '3rem',
    padding: '0 3rem'
  },
  maxHeight: {
    height: '100%'
  }
}));

const Form = (props) => {
  const history = useHistory();
  const { user, login, register, type } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justifyContent="center" className={classes.parentGrid}>
      <Grid item className={classes.leftPane}>
        <Box className={classes.leftPaneBgBox}>
          <img src={"/assets/bg-img.png"} className={classes.leftPaneBgImg} alt="Messenger people"/>
        </Box>
        <Box className={classes.leftPaneBgFilter}/>
        <Grid container alignItems="center" justifyContent="center" direction="column" className={classes.leftPaneOverlay}>
          <object data={"/assets/bubble.svg"} type="image/svg+xml" aria-label="messanger-bubble"/>
          <Typography className={classes.leftPaneOverlayText} variant="h5">{"Converse with anyone with any language"}</Typography>
        </Grid>
      </Grid>
      <Grid item className={classes.rightPane}>
        <Grid container item justifyContent="flex-end" alignItems="center" className={classes.rightPaneHeader}>
          <Typography className={classes.rightPaneHeaderText}>
            {type === "login" ? "Don't have an account?" : "Already have an account?"}
          </Typography>
          <Button onClick={() => history.push(type === "login" ? "/register" : "/login")} variant="contained" size="large" className={classes.rightPaneHeaderBtn}>{type === "login" ? "Create account" : "Login"}</Button>
        </Grid>
        <Grid container item className={classes.rightPaneMain}>
          <form onSubmit={type === 'login' ? handleLogin : handleRegister} className={classes.rightPaneForm}>
            <Grid container md={true} alignItems="center" justifyContent="center" className={classes.maxHeight}>
              <Grid container alignItems="center" justifyContent="center" direction="column" item md={6}>
                <Typography className={classes.formText} variant="h5">{type === "login" ? "Welcome back!" : "Create an account"}</Typography>
                {type === "login" && (
                  <>
                    <FormControl margin="normal" required fullWidth={true}>
                      <TextField
                        label="Username"
                        aria-label="username"
                        name="username"
                        type="text"
                      />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth={true}>
                      <TextField
                        label="Password"
                        aria-label="password"
                        type="password"
                        name="password"
                      />
                    </FormControl>
                  </>
                )}
                {type === "register" && (
                  <>
                    <FormControl margin="normal" fullWidth={true}>
                      <TextField
                        aria-label="username"
                        label="Username"
                        name="username"
                        type="text"
                        required
                      />
                    </FormControl>
                    <FormControl margin="normal" fullWidth={true}>
                      <TextField
                        label="E-mail address"
                        aria-label="e-mail address"
                        type="email"
                        name="email"
                        required
                      />
                    </FormControl>
                    <FormControl error={!!formErrorMessage.confirmPassword}  margin="normal" fullWidth={true}>
                      <TextField
                        aria-label="password"
                        label="Password"
                        type="password"
                        inputProps={{ minLength: 6 }}
                        name="password"
                        required
                      />
                      <FormHelperText>
                        {formErrorMessage.confirmPassword}
                      </FormHelperText>
                    </FormControl>
                    <FormControl error={!!formErrorMessage.confirmPassword} fullWidth={true}>
                      <TextField
                        label="Confirm Password"
                        aria-label="confirm password"
                        type="password"
                        inputProps={{ minLength: 6 }}
                        name="confirmPassword"
                        required
                      />
                      <FormHelperText>
                        {formErrorMessage.confirmPassword}
                      </FormHelperText>
                    </FormControl>
                  </>
                )}
                <Grid container md={4}>
                  <Button type="submit" variant="contained" size="large" fullWidth={true} color="primary" className={classes.formSubmitBtn}>
                    {type === "login" ? "Login" : "Create"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
