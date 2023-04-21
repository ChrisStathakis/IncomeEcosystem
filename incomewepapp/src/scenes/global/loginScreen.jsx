import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withRouter from "../../components/withRouter";
import { Navigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { loginAction } from "../../data/actions/authActions";

const LoginScreen = (props) => {
    const [username, setUsername] = useState(' ');
    const [password, setPassword] = useState(' ');

    const handleSubmit = (event) => {
        console.log(props);
        event.preventDefault();
        const data = {username: username, password: password};
        props.loginAction(data);
      };

    const handleUsername = (event) => {setUsername(event.target.value)};
    const handlePassword = (event) => {setPassword(event.target.value)};


    return props.isAuthenticated === 'true' ? <Navigate to='/' /> :(
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="Username"
              name="Username"
              autoComplete="Username"
              autoFocus
              onChange={handleUsername}
              value={username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePassword}
              value={password}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
      );
}


const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
})



export default compose(withRouter, connect(mapStateToProps, {loginAction}))(LoginScreen);