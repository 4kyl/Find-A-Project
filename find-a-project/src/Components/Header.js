import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Card, CardMedia, ClickAwayListener, Grid, Grow, Link, Menu, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    border: 'none',
    boxShadow: 'none',
    // padding: '10px 0'
  },
  appBar: {
    flex: 1,
    flexDirection: 'row',
    'justify-content': 'space-around',
    alignItems: 'center',
  },
  button: {
    flexGrow: 1,
    transition: 'all 0.3s',
    '&:hover': {
      color: '#8cdb2b',
      textDecoration: 'underline #8cdb2b 3px',
      backgroundColor: 'transparent'
    }
  },
  logoContainer: {
    flexGrow: 1,
  },
  media: {
    paddingBottom: '20px'
  },
  menu: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function Header() {
  const classes = useStyles();

  // Reference: https://material-ui.com/components/menus/
  const [anchorEl, setAnchorEl] = React.useState(null); 

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
    <div id="home"></div>
    <AppBar position="static" color='transparent' className={classes.root}>
      <Toolbar>
        <Grid container justify="space-end" alignItems="center">
          <Grid item xs={4}>
            <Typography variant="h7">
                  FIND A PROJECT
            </Typography>
          </Grid>

          <Grid item xs={2}>
          </Grid>

          {/* Navigation Menus */}
          <Grid item xs={6}>
          <Grid container justify="space-around" alignItems="center">
            <Grid item xs={2}>
              <Button href="/">
              <Typography variant="h7">
                  HOME
              </Typography>
              </Button>
            </Grid>

<Grid item xs={2} onMouseLeave={handlePopoverClose}>
          <div className={classes.menu}>
            <div>
              <Button
                aria-controls='menu-list-grow'
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
              >
                PERSONAL
              </Button>
              <Popper placement="bottom-start" open={open} anchorEl={anchorEl} role={undefined} onMouseLeave={handlePopoverClose} onClose={handlePopoverClose} transition>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handlePopoverClose}>
                        <MenuList id="menu-list-grow">
                          <MenuItem onClick={handlePopoverClose} component={Link} href="/item1">Item 1</MenuItem>
                          <MenuItem onClick={handlePopoverClose} component={Link} href="/item2">Item 2</MenuItem>
                          <MenuItem onClick={handlePopoverClose} component={Link} href="/item3">Item 3</MenuItem>
                          <MenuItem onClick={handlePopoverClose} component={Link} href="/item4">Item 4</MenuItem>
                          <MenuItem onClick={handlePopoverClose} component={Link} href="/item5">Item 5</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </div>
</Grid>

<Grid item xs={2}>
          <Button href="/About">
            <Typography variant="h7" >
              MAILBOX
            </Typography>
          </Button>        
</Grid>

<Grid item xs={2}>
          <Button href="/SIGN IN">
          <Typography variant="h7" >
              SIGN IN
          </Typography>
          </Button>        
</Grid>

<Grid item xs={2}>
          <Button href="/SIGN UP">
          <Typography variant="h7" >
              SIGN UP
          </Typography>
          </Button>
</Grid>
          </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    </>
  );
}
