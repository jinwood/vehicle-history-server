import React from 'react';
import logo from '../../logo.svg';

class TopMenu extends React.Component {
    render() {
        return(
            <div class="ui container">
                <div class="ui stackable menu">
                    <div class="item">
                        <img src={logo} alt="the logo" /> Vehicle History
                    </div>
                    <div class="item"><a href="#">My Vehicle</a></div>
                    <div class="item"><a href="#">Profile</a></div>
                    <div class="item"><a href="#">Sign In</a></div>
                </div>
            </div>
        )
    }
}

export default TopMenu;