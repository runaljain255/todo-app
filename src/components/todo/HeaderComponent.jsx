import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js';
import {Link } from 'react-router-dom'
import { withRouter } from 'react-router';


class HeaderComponent extends Component{
    render(){
        const isUserLoggedin = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedin)
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https:/www.google.com" className="navbar-brand">TodoApp</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedin && <li ><Link className="nav-link" to="/welcome/JohnWick">Home</Link></li>}
                        {isUserLoggedin && <li ><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedin && <li ><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedin && <li ><Link className="nav-link" to="/logout"  onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);