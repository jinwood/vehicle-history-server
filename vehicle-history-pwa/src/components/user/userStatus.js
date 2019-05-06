import React from "react";

class UserStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({ user: nextProps.user, loading: false });
    }
  }
  render() {
    if (!this.state.user && this.state.loading) return null;
    if (!this.state.user && !this.state.loading) return <h1>Please login</h1>;
    return (
      <div class="ui text container">
        <h1>{`Hi ${this.state.user.givenName}`}</h1>
        <h3>Your vehicle</h3>
        <p>{`Make: ${this.state.user.vehicles[0].manufacturer}`}</p>
        <p>{`Model: ${this.state.user.vehicles[0].model}`}</p>
      </div>
    );
  }
}

export default UserStatus;
