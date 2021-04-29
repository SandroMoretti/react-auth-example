import { IconButton, InputAdornment, Link, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';

const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="form">
            <h3>Sign In</h3>
            <p>Enter your credentials to sign in</p>
            <TextField
                label="E-mail"
                variant="outlined"
                type="email"
            />
            <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                InputProps={{
                    endAdornment:
                        < InputAdornment position="end" >
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                }}
            />

            <Button variant="contained" color="primary">Sign In</Button>
            <Button variant="contained" color="secondary">Sign In with Google</Button>
            <p className="signUp">Don't have an account? <Link to="/test">Sign Up</Link></p>
        </div>
    );
}

export default SignIn;