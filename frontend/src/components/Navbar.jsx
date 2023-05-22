import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './index.module.css';

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          style={{
            background:
              'linear-gradient(90deg, rgba(48,78,45,1) 0%, rgba(22,110,65,1) 53%, rgba(19,116,25,1) 100%)',
          }}
          position="static"
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={styles.text}>
              Book-Author App
            </Typography>
            <div className={styles.container}>
            <Link to="/">
              <Button
                style={{ color: 'white', marginRight: '10px' }}
                color="info"
                variant="outlined"
              >
                Home
              </Button>
            </Link>
            <Link to="/authors">
              <Button
                style={{ color: 'white', marginRight: '10px' }}
                color="info"
                variant="outlined"
              >
                Author
              </Button>
            </Link>
            <Link to="/authors/add">
              <Button
                style={{ color: 'white' }}
                color="info"
                variant="outlined"
              >
                Add Author
              </Button>
            </Link>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <div className={styles.drawer}>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/authors">
            <ListItemText primary="Author" />
          </ListItem>
          <ListItem button component={Link} to="/authors/add">
            <ListItemText primary="Add Author" />
          </ListItem>
        </List>
      </Drawer>
      </div>
    </>
  );
};

export default Navbar;
