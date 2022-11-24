import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from '@mui/material';
import { Copyright } from './Copyright';
import { firebaseApp } from '../services/firebase';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import useUserStore from '../store/userStore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { red } from '@mui/material/colors';


export const SignIn = ()  =>{
  
  const auth = getAuth(firebaseApp);
  const {setUser,unsetUser} =  useUserStore();
  const router = useRouter();

  //internal state
  const [loading,setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //helpers
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    setEmail(e.currentTarget.value);
  }
  const handlePasswordChange= (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    setPassword(e.currentTarget.value);
  }

  const handleSubmit = () => 
  {
      setError("");
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        const user  = userCredential.user;
        setUser({email:user.email, displayName: user.displayName,id:user.uid});
        router.push('/')
      })
      .catch((error) =>
      {
        setError(error.message)
        console.log("Sign In Error: ",error);
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
      setLoading(false);
    });
    
    return unsubscribe();
  },[]);
  
  return (
    loading ? 
      <></>
    : 
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            autoFocus
            variant='standard'
            value = {email}
            onChange = {handleEmailChange}
          />
          <TextField
            margin="normal"
            type="password"
            required
            fullWidth
            autoFocus
            label="Password"
            variant='standard'
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Container sx={{padding:2}}>
        {error !== "" && <Typography color={red[300]} variant="body1">{error}</Typography>}
      </Container>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}