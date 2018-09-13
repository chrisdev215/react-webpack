import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './ListMenu';
import SimpleTable from './Table';
import Table from '@material-ui/core/Table';
import LetterAvatars from './Avatar';
import CustomizedBadge from './Badge';
import AlertDialog from './AlertDialog';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};


class ButtonAppBar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      drawerIsOpen: false
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen(){
    this.setState({ drawerIsOpen: true });
  };

  handleDrawerClose(){
    this.setState({ drawerIsOpen: false });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.handleDrawerOpen} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              What is this
          </Typography>
          	<LetterAvatars/>
          	<CustomizedBadge/>
            {/* <Button onClick={this.handleDrawerOpen} color="inherit">Drawer</Button> */}
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.drawerIsOpen} onClose={this.handleDrawerClose}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleDrawerClose}
            onKeyDown={this.handleDrawerClose}
          >
            {sideList}
          </div>
        </Drawer>
        <SimpleTable/>
      </div>
    );
  }
}


function ButtonAppBar(props) {
  const { classes } = props;
  
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
