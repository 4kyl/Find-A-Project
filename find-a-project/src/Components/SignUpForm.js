import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { signup } from "../Redux/actions/auth";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  userType: "student",
  schoolID: "",
  password: "",
  confirmPassword: ""
};

const useStyles = makeStyles((theme) => ({
  spacing: {
    padding: theme.spacing(2),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  avatarPadding: {
    padding: theme.spacing(2),
  },
  radioGroup: {
    justifyContent: "center",
  },
}));

export const SignUpForm = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [value, setValue] = useState("student");
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(signup(formData, history));
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e) => {
    setValue(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCapture = ({ target }) => {
    const data = new FormData();
    data.append('file', target.files[0]);
    fetch(
      'http://localhost:5000/user/signup',
      // 'https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5',
      {
				method: 'POST',
				body: data,
			}
    )
    .then((response) => response.json())
    .then((result) => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <Container className={classes.spacing} component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={1}>
        <Typography variant="h4">Sign Up</Typography>
        <div className={classes.avatarPadding}>
          <Avatar className={classes.avatar}>U</Avatar>
        </div>

        <form onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                row
                className={classes.radioGroup}
                name="userType"
                value={value}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="student"
                  control={<Radio />}
                  label="Student"
                />
                <FormControlLabel
                  value="staff"
                  control={<Radio />}
                  label="Staff"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="schoolID"
                name="schoolID"
                label="School ID"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Re-enter Password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
