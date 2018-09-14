import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import AlertDialog from './AlertDialog';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    //backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    //width: 500,
    //height: 450,
  },
  subheader: {
    width: '100%',
  },
});

const tileData = [
  {
    img: require('@/images/animals/two.jpg'),
    title: 'Tasty burger',
    author: 'director90',
  },
  {
    img: require('@/images/animals/tree.jpg'),
    title: 'Camera',
    author: 'Danson67',
  },
  // {
  //   img: require('@/images/animals/nirzar-pangarkar-217994-unsplash.jpg'),
  //   title: 'Morning',
  //   author: 'fancycrave1',
  //   featured: true,
  // },
  // {
  //   img: require('@/images/animals/baptist-standaert-346832-unsplash.jpg'),
  //   title: 'Hats',
  //   author: 'Hans',
  // },
  // {
  //   img: require('@/images/animals/berkay-gumustekin-402114-unsplash.jpg'),
  //   title: 'Honey',
  //   author: 'fancycravel',
  //   cols: 2,
  // },
  // {
  //   img: require('@/images/animals/caleb-woods-248879-unsplash.jpg'),
  //   title: 'Vegetables',
  //   author: 'jill111',
  //   cols: 2,
  // },
];

class RowImageGridList extends React.Component {

//function RowImageGridList(props) {
//const { classes } = props;

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    this.child = React.createRef()
  };

  _onButtonClick() {
    this.child.current.handleClickOpen()
    /*this.setState({
      showModal: true,
    });*/
  }
  render() {
    const classes = this.props;
    return (
      <GridListTile key={classes.img} style={{ width: '50%', height: '184px', padding: '2px' }}>
        <img src={classes.img} alt={classes.title} />
        <GridListTileBar
          title={classes.title}
          subtitle={<span>by: {classes.author}</span>}
          actionIcon={
            <IconButton className={classes.icon}  onClick={ this._onButtonClick}>
              <InfoIcon />  
            </IconButton>
          }
        />
        <AlertDialog ref={this.child} open={this.state.showModal} />
      }
      </GridListTile>
    );
  }
}



class ImageGridList extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader"  style={{ height: 'auto', 'width': "100%" }}>
            <ListSubheader component="div">List animals</ListSubheader>
          </GridListTile>
          {tileData.map((tile, i) => (<RowImageGridList 
            key={i}
            img={tile.img}
            author={tile.author}
            title={tile.title}
          />))}
        </GridList>
      </div>
    );
  }
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(ImageGridList);