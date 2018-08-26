import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import StarIcon from '@material-ui/icons/Star';
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FaBeer  } from 'react-icons/fa';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import './SearchInfo.css';
import { fetchRepos, searchItems } from '../actions/gituserActions';

class SearchInfo extends Component {
  constructor(props){
    super(props);
    this.state={
      username: '',
      page: 0,
      rowsPerPage: 5,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSearch = (event) => {
    this.props.searchItems(event.target.value);
  }

  onSubmit(e) {
    e.preventDefault();

    const post = {
      username: this.state.username,
    }

    this.props.fetchRepos(post.username);
  }
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  }
  
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const {user} = this.props;
    const {repos} = this.props;
    const {rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, repos.length - page * rowsPerPage);
    return (
      <div className="container">
        <div className="input_username">
          <form onSubmit={this.onSubmit}>
            <TextField
              id="with-placeholder"
              label="Search User"
              name="username"
              onChange={this.onChange}
              placeholder="Search User"
              margin="normal"
            />
            <Button type ='submit' variant="contained" color="primary">Search</Button>
          </form>
        </div>
        <div className="userinfo_repositories">
          <div className="user_info">
            <Card className="{classes.media}" style={{width:350, height:500, marginTop:30}}>
              <CardMedia style={{height:200, paddingTop: '56.25%'}}
                className="userimage"
                image={user.avatar_url}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {user.login}
                </Typography>
                <Typography component="p">
                  <span style={{marginRight:100}}>{user.public_repos}</span><span style={{marginRight:100}}>{user.following}</span>  <span>{user.followers}</span><br />
                  <span style={{marginLeft:5,marginRight:30}}>Public repos</span><span style={{marginRight:30}}>Following</span>  <span >Followers</span>
                 
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="user_repos">
            <TextField
                id="with-placeholder"
                label="Search repository"
                onChange={this.handleSearch }
                placeholder="Search repository"
                margin="normal"
              />
            <Table >
              <TableBody>
                {repos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (
                    <TableRow key={row.id}>
                      <Button>
                        <TableCell component="th" scope="row">
                          <h1>{row.name}</h1>
                          <StarIcon /><span style={{fontSize:20, margin:10}}>{row.stargazers_count}</span>
                          <ImageIcon /><span style={{fontSize:20, margin:10,marginTop:10}}>{row.forks_count}</span>
                          <span style={{margin:30,fontSize:20}}>Updated_at</span><span style={{fontSize:20}}>{row.updated_at}</span>
                        </TableCell>
                      </Button>
                      <TableCell numeric>{row.calories}</TableCell>
                      <TableCell numeric>{row.fat}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={3}
                    count={repos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.repos.user,
  repos: state.repos.repos
})

export default connect(mapStateToProps, { fetchRepos, searchItems})(SearchInfo);
