import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Box, Container } from '@mui/system'
import Head from 'next/head'
import { TodoList } from '../components/ToDoList'

export default function Home() { 
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="A simple Todo Application" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth = 'md' sx={{bgcolor: grey[200]}} >
          <Typography variant='h1' align='center'>Todo List</Typography>
          <Box sx= {{padding:2}}>
            <TodoList />
          </Box>
      </Container>
    </>
  )
}
