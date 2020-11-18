import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";

axios.defaults.withCredentials = true;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/mmk018">
        Max FBW6
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function View() {
  const history = useHistory();
  const classes = useStyles();
  const [view, setView] = useState({
    email: "email",
    name: "name",
    edit: false,
  });
  // const loginSubmitHandler = async (e) => {
  //   e.preventDefault();
  //   const myFormData = new FormData(e.target);
  //   const formData = myFormData.entries();
  //   const data = {};

  //   for (const pair of formData) {
  //     const [key, value] = pair;
  //     data[key] = value;
  //   }
  // };

  useEffect(() => {
    fetch("http://localhost:3002/dashboard/view", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("setState");

        res.edit = false;
        setView(res);
      })
      .catch((err) => {
        history.push("/login");
        console.log(err);
      });
  }, []);

  const deleteUser = async () => {
    fetch("http://localhost:3002/dashboard/delete", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("User deleted");
        setView({ email: "deleted", name: "deleted" });
        setTimeout(() => {
          history.push("/login");
        }, 5000);
      })
      .catch((err) => {
        history.push("/login");
        console.log(err);
      });
  };
  const updateUser = async (e) => {
    e.preventDefault();
    const myFormData = new FormData(e.target);
    const formData = myFormData.entries();
    const data = {};

    for (const pair of formData) {
      const [key, value] = pair;
      data[key] = value;
    }
    console.log(data);

    // fetch(
    //   "http://localhost:3002/dashboard/edit",
    //   {
    //     method: "POST",
    //     credentials: "include",
    //   },
    //   data
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
    //     console.log("User Updated");
    //     setView({ email: "updated", name: "updated" });
    //     // setTimeout(() => {
    //     //   history.push("/login");
    //     // }, 5000);
    //   })
    //   .catch((err) => {
    //     history.push("/login");
    //     console.log(err);
    //   });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Your Details
        </Typography>
        <form className={classes.form} noValidate onSubmit={updateUser}>
          {view.edit ? (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                /* value={view.email} */
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="name"
                label="name"
                type="name"
                id="name"
                autoComplete="current-password"
                /* value={view.name} */
              />
            </>
          ) : (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={view.email}
                disabled
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="name"
                label="name"
                type="name"
                id="name"
                autoComplete="current-password"
                value={view.name}
                disabled
              />
            </>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={deleteUser}
            >
              Delete
            </Button>
            {view.edit ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() => {
                  const neu = { ...view, edit: true };
                  console.log(neu);
                  setView(neu);
                }}
              >
                Edit
              </Button>
            )}
          </div>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <LinearProgress />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
