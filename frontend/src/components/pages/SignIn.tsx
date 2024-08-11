import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Typography, TextField, Card, CardContent, CardHeader, Button, Box } from '@mui/material';

import { AuthContext } from 'App';
import AlertMessage from 'components/utils/AlertMessage';
import { signIn } from 'lib/api/auth';
import { SignInParams } from 'interfaces';

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInParams = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate('/');

        console.log('signed in successfully!');
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
          <CardHeader sx={{ textAlign: 'center' }} title='Sign In' />
          <CardContent>
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
              placeholder='At least 6 characters'
              value={password}
              margin='dense'
              autoComplete='current-password'
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type='submit'
              variant='contained'
              size='large'
              fullWidth
              color='primary'
              disabled={!email || !password}
              sx={{ marginTop: 2, textTransform: 'none' }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Box textAlign='center' sx={{ marginTop: '2rem' }}>
              <Typography variant='body2'>
                Don't have an account? &nbsp;
                <Link to='/signup' style={{ textDecoration: 'none' }}>
                  Sign Up now!
                </Link>
              </Typography>
            </Box>
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

export default SignIn;
