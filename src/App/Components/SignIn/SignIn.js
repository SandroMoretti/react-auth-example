import { IconButton, InputAdornment, Link, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import { auth, googleAuthProvider } from '../../firebase';

const SignIn = () => {
    const [form, setForm] = useState({ email: '', password: '' });      // state para salvar os valores dos campos do formulário
    const [showPassword, setShowPassword] = useState(false);            // state para salvar se exibe ou não a senha no campo de password
    const [error, setError] = useState({ email: '', password: '' });    // state para exibir erros caso tenha

    const handleChange = (prop) => (event) => {
        setForm({ ...form, [prop]: event.target.value });       // atualiza os valores do formulário sempre que tiver alteração nos campos
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const signInWithEmailAndPassword = () => {          // faz login com e-mail e senha
        var errorEmail = '';
        var errorPassword = '';

        /* testa se o e-mail está no padrão de e-mail */
        if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form.email))) {
            errorEmail = 'Insert an valid e-mail.';
        } else {
            errorEmail = '';
        }

        /* testa se a senha tem pelo menos 6 caracteres (mínimo para autenticação do firebae) */
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
            /* limpa os erros por garantia. Isso não deve ser necessário pois sempre que entrar aqui a tela atual irá sumir para carregar a tela de perfil */
            setError({ email: '', password: '' });
        }).catch((error) => {
            /* trata errors vindo da sdk do firebase após uma falha ocorrer na tentativa de login */
            switch (error.code) {
                case "auth/user-not-found": // erro retornado para usuários não cadastrados
                    setError({ email: 'This e-mail is not registered in this site.', password: '' });
                    break;
                case "auth/wrong-password": // erro retornado para senha inválida
                    setError({ email: '', password: 'Inválid password' });
                    break;
            }
        });
    }

    const signInWithGoogle = () => {        // faz email usando a conta google
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
                    endAdornment:   // icone para exibir/ocutar senha no final do campo de password
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
            {/* @todo (tela para sign up não foi feita, apenas deixei a escrita para melhorar o visual da tela) */}
            <p className="signUp">Don't have an account? <Link to="/test">Sign Up</Link></p>
        </div>
    );
}

export default SignIn;