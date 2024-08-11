import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { TextField, Card, CardContent, CardHeader, Button, Box } from '@mui/material';

import { AuthContext } from 'App';
import AlertMessage from 'components/utils/AlertMessage';
import { signUp } from 'lib/api/auth';
import { SignUpParams } from 'interfaces/index';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate('/');
        console.log('signed in successfully');
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };

  return (
    <>
      <form noValidate autoComplete='off'>
        <Card sx={{ padding: 2, maxWidth: 400, margin: 'auto', marginTop: 6 }}>
          <CardHeader sx={{ textAlign: 'center' }} title='Sign Up' />
          <CardContent>
            <TextField
              variant='outlined'
              required
              fullWidth
              label='Name'
              value={name}
              margin='dense'
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              variant='outlined'
              required
              fullWidth
              label='Email'
              value={email}
              margin='dense'
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant='outlined'
              required
              fullWidth
              label='Password'
              type='password'
              value={password}
              margin='dense'
              autoComplete='current-password'
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              variant='outlined'
              required
              fullWidth
              label='Password Confirmation'
              type='password'
              value={passwordConfirmation}
              margin='dense'
              autoComplete='current-password'
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
            <Button
              type='submit'
              variant='contained'
              size='large'
              fullWidth
              color='primary'
              disabled={!name || !email || !password || !passwordConfirmation}
              sx={{ marginTop: 2, textTransform: 'none' }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity='error'
        message='Invalid email or password'
      />
    </>
  );
};

export default SignUp;
