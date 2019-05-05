import React from "react";
import UserContainer from "./components/user/userContainer";
import UserStatus from "./components/user/userStatus";
import * as userService from "./services/userService";
import logo from "./logo.svg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "28186a09-33cd-4e61-ad4e-f8c2fb36261a",
      user: null
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div class="ui borderless menu">
            <div class="ui text container">
              <div class="header item">
                Vehicle History
              </div>
            </div>
          </div>
        </header>
        <div class="ui hidden divider"></div>
        <UserStatus user={this.state.user} />
      </div>
    );
  }

  componentDidMount() {
    userService.getUserVehicles(this.state.userId).then(user =>
      this.setState({
        user: user
      })
    );
  }
}

export default App;
