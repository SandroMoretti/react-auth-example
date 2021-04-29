import { IconButton, InputAdornment, Link, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import { auth, googleAuthProvider } from '../../firebase';

const SignIn = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({ email: '', password: '' });

    const handleChange = (prop) => (event) => {
        setForm({ ...form, [prop]: event.target.value });
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const mountErrorDocument = (message) => {
        return (
            <div>
                <b>Failed to Login</b>
                <br />
                <p>{message}</p>
                <p>Check the fields and try again.</p>
            </div >
        );
    }

    const signInWithEmailAndPassword = () => {
        var errorEmail = '';
        var errorPassword = '';

        if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form.email))) {
            errorEmail = 'Insert an valid e-mail.';
        } else {
            errorEmail = '';
        }

        if (form.password.length < 6) {
            errorPassword = 'The password must contain at least 6 characters.';
        } else {
            errorPassword = '';
        }

        setError({ email: errorEmail, password: errorPassword });
        if (errorEmail != '' || errorPassword != '') {
            return;
        }

        auth.signInWithEmailAndPassword(form.email, form.password).then(() => {
            setError({ email: '', password: '' });
        }).catch((error) => {
            switch (error.code) {
                case "auth/user-not-found":
                    setError({ email: 'This e-mail is not registered in this site.', password: '' });
                    break;
                case "auth/wrong-password":
                    setError({ email: '', password: 'Inválid password' });
                    break;
            }
            console.log("error", error);
        });
    }

    const signInWithGoogle = () => {
        auth.signInWithPopup(googleAuthProvider);
    };

    return (
        <div className="form">
            <h3>Sign In</h3>
            <p>Enter your credentials to sign in</p>
            <TextField
                name="email"
                id="email"
                label="E-mail"
                variant="outlined"
                type="email"
                onChange={handleChange('email')}
                error={error.email.length > 0}
                helperText={error.email}
            />
            <TextField
                name="password"
                id="password"
                label="Password"
                variant="outlined"
                onChange={handleChange('password')}
                error={error.password.length > 0}
                helperText={error.password}
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

            <Button variant="contained" color="primary" onClick={signInWithEmailAndPassword}>Sign In</Button>
            <Button variant="contained" color="secondary" onClick={signInWithGoogle}>Sign In with Google</Button>
            <p className="signUp">Don't have an account? <Link to="/test">Sign Up</Link></p>
        </div>
    );
}

export default SignIn;