import React from "react";

class UserStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user) {
      this.setState({ user: nextProps.user })
    }
  }
  render() {
    if (!this.state.user) return null;
    return (
      <div class="ui text container">
          <h1>{`Hi ${this.state.user.givenName}`}</h1>
          <p>{`You currently have ${this.state.user.vehicles.length} vehicle`}</p>
          <p>{`Make: ${this.state.user.vehicles[0].manufacturer}`}</p>
      </div>
    )
  }
}

export default UserStatus;