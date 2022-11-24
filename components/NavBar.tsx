import { Alert, AppBar, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import useUserStore from "../store/userStore";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";
import { getAuth, signOut, } from "firebase/auth";
import { firebaseApp } from "../services/firebase";
import { useRouter } from "next/router";

export const NavBar = () => {

    const auth = getAuth(firebaseApp);
    const router = useRouter();
    const {user,unsetUser} = useUserStore();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [error, SetError] = useState("");

    const handleUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
      
      const handleClose = () => {
        setAnchorEl(null);
      };

    const SignOut = () => {
       signOut(auth).then(() =>{
            unsetUser();
            SetError("");
            router.push('/signin');
       }).catch((error) => {
            console.log("Log out failure: ",error);
            SetError(`Failed to log out - ${error.Message}`);
       })
    }

    useEffect(() =>{

    },[error]);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                {user && 
                    <Grid container>
                        <Grid item md={11}>
                            <Typography variant="h6">{`Welcome ${user.displayName}`}</Typography>
                        </Grid>
                        <Grid item md={1}>
                            <div>
                                <IconButton onClick={handleUserMenu} color="inherit" size="large"> 
                                    <AccountCircle />
                                </IconButton>
                                <Menu id="user-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} MenuListProps={{'aria-labelledby': 'basic-button'}}>
                                    <MenuItem onClick={handleClose}>Settings</MenuItem> 
                                    <MenuItem onClick={SignOut}>Sign Out</MenuItem>
                                </Menu>
                            </div>
                        </Grid>
                    </Grid>
                }
                </Toolbar>
            </AppBar>
            <Toolbar />
            {error!=="" && <Alert severity="error">{error}</Alert>}
        </>
    );
}