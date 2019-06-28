import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }
  render() {
    //7.86
    //console.log(this.props);
    return (
      <nav>
        <div className="nav-weapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
//indiqua cómo transformar el estado actual del store Redux en los props que desea pasar a un componente de presentación.
//function mapStateToProps( auth ) {
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
