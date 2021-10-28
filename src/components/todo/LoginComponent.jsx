import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js';

class LoginComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            username:"JohnWick",
            password:"abc123",
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    // handleUsernameChange(event) {
    //     this.setState (
    //         {
    //             username:event.target.value
    //         }
    //     )
    // }

    // handlePasswordChange = (event) =>{
    //     this.setState(
    //         (prevState)=>{
    //             return{
    //                 password:event.target.value
    //             }
    //         }
    //     )
    // }

    //geerec element for all cvhanges
    handleChange = (event) => {
        this.setState (
            {
                [event.target.name]:event.target.value
            }
        )
    }

    loginClicked = (event) => {
        // if(this.state.username === "JohnWick" && this.state.password === "abc123")
        // {   

        //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     // console.log("LoggedIn")
        //     // this.setState(
        //     //     ()=>{return {hasLoginFailed:false,showSuccessMessage:true}}
        //     // )
        // }
        // else{
        //     console.log("Invalid request")
        //     this.setState(
        //         ()=>{return {hasLoginFailed:true,showSuccessMessage:false}}
        //     )
        // }
        // AuthenticationService.executeBasicAuthenticationService(this.state.username,this.state.password)
        // .then(() => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //         this.props.history.push(`/welcome/${this.state.username}`)
        //     })
        // .catch(()=>{
        //     this.setState(
        //         ()=>{return {hasLoginFailed:true,showSuccessMessage:false}}
        //     )
        // })
        AuthenticationService.executeJwtAuthenticationService(this.state.username,this.state.password)
        .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username,response.data.token)
                this.props.history.push(`/welcome/${this.state.username}`)
            })
        .catch(()=>{
            this.setState(
                ()=>{return {hasLoginFailed:true,showSuccessMessage:false}}
            )
        })
    }

    render(){
        return(
            <div>
            <h1>Login</h1>
            <div className="container">
                {/*<ShowInvalidCredentials className="alert alert-warning" hasLoginFailed={this.state.hasLoginFailed}/>
                this.state.showSuccessMessage && <div>Login Successful</div>*/}
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid credentials!</div>}

                UserName: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
            </div>
            </div>
        )
    }
}

// function ShowInvalidCredentials(props){
//     if (props.hasLoginFailed){
//        return <div>Invalid Credentials</div>
//     }
//     return null
// }

// function ShowLoginSuccessful(props){
//     if (props.hasLoginSuccessful){
//        return <div>Login Successful</div>
//     }
//     return null
// }


export default LoginComponent;