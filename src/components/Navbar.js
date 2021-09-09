import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Chip, Modal } from '@material-ui/core';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ButtonAppBar({Login,isLoggedIn,Logout,user,balance}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [username,setUsername] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
console.log(user);
  return (
      
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Logo
          </Typography>
          <Chip label={'$ '+balance} />
          {isLoggedIn?(<Button onClick={Logout} color="inherit">Logout</Button>):(<Button onClick={handleOpen} color="inherit">Login</Button>)}
          {isLoggedIn?(<>Welcome {user}</>):(<>Welcome Guest</>)}
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"

      >
            <div className="paper">
            <h2 id="simple-modal-title">Login</h2>
            <p id="simple-modal-description">
                <input onInput={(e)=>{setUsername(e.target.value)}} name="" value={username}/>
                <Button onClick={()=>{Login(username); handleClose() }} >Submit</Button>
            </p>
            </div>
      </Modal>
    </div>
  );
}
