import React, { Component } from 'react'

class SearchUser extends Component {
  constructor(props){
    super(props);
    this.state={
      username: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();

    const post = {
      username: this.state.username,
    }

    this.props.searchPost(post);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type='text' name="username" onChange={this.onChange} />
          <input type ='submit' value='submit' />
        </form>
      </div>
    )
  }
}

SearchUser.propTypes = {
  searchPost: PropTypes.func.isRequired
}

export default connect(null,{searchPost})(SearchUser);