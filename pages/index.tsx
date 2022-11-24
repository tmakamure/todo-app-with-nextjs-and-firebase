import { Toolbar, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Box, Container } from '@mui/system'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { NavBar } from '../components/NavBar'
import { TodoList } from '../components/ToDoList'
import { firebaseApp } from '../services/firebase'
import useUserStore from '../store/userStore'

export default function Home() {
  const {user,setUser,unsetUser} =  useUserStore();
  
  const router = useRouter();
 
  useEffect(() =>{
    if(!user)
      router.push('/signin')
  },[])

  return (
    user &&
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="A simple Todo Application" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Box>
        <Container maxWidth = 'md' sx={{bgcolor: grey[200], bottom:"20"}} >
            <Typography variant='h1' align='center'>Todo List</Typography>
            <Box sx= {{padding:2}}>
              <TodoList />
            </Box>
        </Container>
      </Box>
    </>
  )
}
