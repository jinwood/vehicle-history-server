import React from "react";

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
      if(this.props.user) {
          console.log('mounted');
          this.setState({user: this.props.user});
      }
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
          user: nextProps.user
      });
  }

  render() {
    return <h1>{this.state.user === null ? '' : `yo ${this.state.user.givenName}`}</h1>;
  }
}

export default UserContainer;
