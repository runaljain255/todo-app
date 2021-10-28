import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute';
import LoginComponent from './LoginComponent';
import ListTodosComponent  from './ListTodosComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';    
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcomeComponent';
import LogoutComponent from './LogoutComponent';
import TodoComponent from './ToDoComponent';



class TodoApp extends Component{
    render(){
        return(
            <div>

                <Router>
                <>  
                <HeaderComponent/>
                <Switch>
                    <Route path="/" exact component={LoginComponent}/>
                    <Route path="/login" component={LoginComponent}/>
                    <AuthenticatedRoute  path="/welcome/:name" component={WelcomeComponent}/>
                    <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                    <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>
                    <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                    <Route  component={ErrorComponent}/>
                </Switch>
                <FooterComponent/>
                </>
                </Router>
                {/* {<LoginComponent/>
                <WelcomeComponent/>} */}
            </div>
        )
    }
}


export default TodoApp;