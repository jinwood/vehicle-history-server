import React from 'react';
import TopMenu from './components/layout/topMenu';
import UserStatus from './components/user/userStatus';
import * as userService from './services/userService';

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
          <TopMenu />
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
