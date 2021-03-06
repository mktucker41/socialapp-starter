import React from "react";
import { Link } from "react-router-dom";
import { withAsyncAction } from "../../redux/HOCs";
import "./Menu.css";

class Menu extends React.Component {
  
  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <div className="Menu">
        <h1 className = "kwitter" >Kwitter</h1>
        <div id="menu-links">
          <Link to="/profile/:username">Profile</Link>
          <Link to="/messagefeed">Message Feed</Link>
          <Link to="/" onClick={this.handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    );
  }
}

export default withAsyncAction("auth", "logout")(Menu);
