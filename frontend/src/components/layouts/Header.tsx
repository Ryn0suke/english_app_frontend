import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { signOut } from 'lib/api/auth';
import { AuthContext } from 'App';

const MenuButton = styled(IconButton)(({ theme }) => ({
    position: 'fixed',
    top: theme.spacing(1),
    left: theme.spacing(1),
    zIndex: 1300,
    width: '60px',
    height: '60px',
}));

const MenuIconStyled = styled(MenuIcon)({
    fontSize: '2.5rem',
});

const Header: React.FC = () => {
    const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleSignOut = async () => {
        try {
            const res = await signOut();

            if (res.data.success === true) {
                Cookies.remove('_access_token');
                Cookies.remove('_client');
                Cookies.remove('_uid');

                setIsSignedIn(false);
                navigate('/signin');
                console.log('サインアウト成功');
            } else {
                console.log('サインアウト失敗');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const drawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {!loading && (
                    <>
                        {isSignedIn ? (
                            <>
                                <ListItem button component={Link} to="/">
                                    <ListItemText primary="Home" />
                                </ListItem>
                                <ListItem button component={Link} to="/phrases">
                                    <ListItemText primary="Phrases" />
                                </ListItem>
                                <ListItem button component={Link} to="/search">
                                    <ListItemText primary="Search" />
                                </ListItem>
                                <ListItem button component={Link} to="/test">
                                    <ListItemText primary="Test" />
                                </ListItem>  
                                <ListItem button onClick={handleSignOut}>
                                    <ListItemText primary="Sign out" />
                                </ListItem>          
                            </>
                        ) : (
                            <>
                                <ListItem button component={Link} to="/">
                                    <ListItemText primary="Home" />
                                </ListItem>
                                <Divider />
                                <ListItem button component={Link} to="/signin">
                                    <ListItemText primary="Sign in" />
                                </ListItem>
                                <ListItem button component={Link} to="/signup">
                                    <ListItemText primary="Sign up" />
                                </ListItem>
                            </>
                        )}
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <div>
            <MenuButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
            >
                <MenuIconStyled />
            </MenuButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList}
            </Drawer>
        </div>
    );
};

export default Header;

