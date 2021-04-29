import { Grid, IconButton, InputAdornment, Link, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState, useContext } from 'react';
import { UserContext } from "../../Providers/UserProvider";
import { auth } from '../../firebase';

const UserProfile = () => {
    const user = useContext(UserContext)['user'];
    console.log("user", user);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="form">
            <Grid container xs={12} spacing={2}>
                {
                    (user.photoURL) ?
                        <Grid item>
                            <div>
                                <img className="profilePic" src={user.photoURL}></img>
                            </div>
                        </Grid>
                        :
                        ""
                }
                <Grid item>
                    <div>
                        <h3>{user.displayName}</h3>
                        <p>{user.email}</p>
                    </div>
                </Grid>
            </Grid>

            <Button variant="contained" color="primary" onClick={() => { auth.signOut(); }}>Sign Out</Button>
        </div>
    );
}

export default UserProfile;