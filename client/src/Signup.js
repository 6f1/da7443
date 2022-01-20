import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "./store/utils/thunkCreators";

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
    [theme.breakpoints.down('sm')]: {
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
     height: '5rem',
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
    fontFamily: theme.typography.fontFamily
  },
  formSubmitBtn: {
    height: '5rem',
    marginTop: '3rem',
    padding: '0 3rem'
  },
  maxHeight: {
    height: '100%'
  }
}));

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
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

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center" className={classes.parentGrid}>
      <Grid item className={classes.leftPane}>
        <Box className={classes.leftPaneBgBox}>
          <img src={"/assets/bg-img.png"} className={classes.leftPaneBgImg} alt=""/>
        </Box>
        <Box className={classes.leftPaneBgFilter}/>
        <Grid container alignItems="center" justifyContent="center" direction="column" className={classes.leftPaneOverlay}>
          <object data={"/assets/bubble.svg"} type="image/svg+xml" aria-label="messanger-bubble"/>
          <h1 className={classes.leftPaneOverlayText}>{"Converse with anyone with any language"}</h1>
        </Grid>
      </Grid>
      <Grid item className={classes.rightPane}>
        <Grid container item justifyContent="flex-end" alignItems="center" className={classes.rightPaneHeader}>
          <p className={classes.rightPaneHeaderText}>Already have an account?</p>
          <Button onClick={() => history.push("/login")} variant="contained" size="large" className={classes.rightPaneHeaderBtn}>Login</Button>
        </Grid>
        <Grid container item className={classes.rightPaneMain}>
          <form onSubmit={handleRegister} className={classes.rightPaneForm}>
            <Grid container md={true} alignItems="center" justifyContent="center" className={classes.maxHeight}>
              <Grid container alignItems="center" justifyContent="center" direction="column" item md={6}>
                <h1 className={classes.formText}>Create an account.</h1>
                <FormControl  margin="normal" fullWidth={true}>
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
                <Grid container md={4}>
                  <Button type="submit" variant="contained" size="large" fullWidth={true} color="primary" className={classes.formSubmitBtn}>
                    Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
