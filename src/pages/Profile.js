import React from "react";
import { userIsAuthenticated } from "../redux/HOCs";
import DataService from "../services/DataService";
import Menu from "../components/menu/Menu"


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.client = new DataService();

  }
  handleDelete = (e) => {
    e.preventDefault();
    this.client
      .deleteUser()
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="Profile">
        <Menu />
        <h2>Profile</h2>
        <button onClick={this.handleDelete}> Delete User</button>
        <div className="container" style={{ width: "20rem" }} >
          <div className="card" style={{ style: "18rem" }} >
            <img className="card-img-top" src="https://media.geeksforgeeks.org/wp-content/uploads/20190506125816/avt.png" alt="" />
            <div className="card-body" >
              <h4 className="card-title" > Name </h4>
              <p className="card-text" >About Me</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
export default userIsAuthenticated(Profile);

