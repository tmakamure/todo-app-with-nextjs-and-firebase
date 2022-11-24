import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Copyright } from './Copyright';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { firebaseApp } from '../services/firebase';
import { red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useUserStore from '../store/userStore';

export default function SignUp() 
{
  const router = useRouter();
  const auth = getAuth(firebaseApp);

  const {setUser,unsetUser} =  useUserStore();
  const [errorMessages,setErrorMessages] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    setEmail(e.currentTarget.value);
  }
  const handlePasswordChange= (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    setPassword(e.currentTarget.value);
  }
  const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    setFirstname(e.currentTarget.value);
  }
  const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    setLastname(e.currentTarget.value);
  }

  const handleSubmit = () => {
    setErrorMessages("");
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) =>{
      const user = userCredential.user;
      updateProfile(user,{
        displayName: `${firstname} ${lastname}`
      }).catch(error => {
          throw(error);
      });
      setUser({email:user.email, displayName:user.displayName,id:user.uid});
      router.push('/')
    })
    .catch((error) =>{
      setErrorMessages(`${error.code} - ${error.Message}`);
    })
  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
    {
      if(currentUser)
      {
        setUser(
          {
            email:currentUser.email, 
            displayName: currentUser.displayName,
            id:currentUser.uid
          });
          router.push('/')
      }
      else 
      {
        unsetUser();
      }
    });
    return unsubscribe();
  },[errorMessages]);

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  variant='standard'
                  value={firstname}
                  onChange={handleFirstnameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  variant='standard'
                  value={lastname}
                  onChange={handleLastnameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant='standard'
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant='standard'
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant='body1' color={red[300]}>{errorMessages}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}
