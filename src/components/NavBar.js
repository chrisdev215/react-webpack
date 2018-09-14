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
import LinearIndeterminate from './ProgressLinearIndeterminate';
import ImageGridList from './ImageGridList.js';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';

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
      drawerIsOpen: false,
      spacing: '16',
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
    const { spacing } = this.state;

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
        { /* <LinearIndeterminate/> */}
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
        { /* <AlertDialog/>
        <ImageGridList/> */}

      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
            <Grid key="table" item sm={9} xs={12}>
              <SimpleTable/>
            </Grid>
            <Grid key="list" item sm={3} xs={12}>
              <ImageGridList/>  
            </Grid>
            { /* [0, 1].map(value => (
              <Grid key={value} item xs={6}>
              <ListSubheader component="div">List animals</ListSubheader>
              </Grid>
            )) */   }
          </Grid>
        </Grid>
      </Grid>

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
