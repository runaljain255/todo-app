import React, { Component } from 'react';
import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';
import moment from 'moment';


class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos:[],
            message:null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.refreshTodo = this.refreshTodo.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }

    componentDidMount(){
        this.refreshTodo();
    }
    refreshTodo(){
        let username = AuthenticationService.getUserName();
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                this.setState({
                    todos:response.data
                })
            }
        )
        .catch(
            response => console.log(response)
        )
    }
    deleteTodoClicked(id){
        let username = AuthenticationService.getUserName();

        TodoDataService.deleteTodo(username,id)
        .then(
            response => {
            this.setState({
                message:`Todo with ID ${id} is deleted`
            })
            this.refreshTodo();
        }
        )
        .catch(
            this.setState({
                message:`There is some problem `
            })
        )
    }
    updateTodoClicked(id){
        console.log("Updated Id")
        this.props.history.push(`/todos/${id}`)
        // let username = AuthenticationService.getUserName();

        // TodoDataService.deleteTodo(username,id)
        // .then(
        //     response => {
        //     this.setState({
        //         message:`Todo with ID ${id} is deleted`
        //     })
        //     this.refreshTodo();
        // }
        // )
        // .catch(
        //     this.setState({
        //         message:`There is some problem `
        //     })
        // )
    }
    addTodoClicked(){
        console.log("Create")
        this.props.history.push(`/todos/-1`)
    }
    render(){
        return (
            <div >
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <td>description</td>
                            <td>Done</td>
                            <td>TargetDate</td>
                            <td>Delete</td>
                            <td>Update</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.todos.map (todo => 
                            <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>{todo.done.toString()}</td>
                            <td>{moment(todo.targetDate.toString()).format("YYYY-MM-DD")}</td>
                            <td><button className="btn btn-warning" onClick={()=> this.deleteTodoClicked(todo.id)}>Delete</button></td>
                            <td><button className="btn btn-success" onClick={()=> this.updateTodoClicked(todo.id)}>Update</button></td>
                            </tr>)
                            }
                    </tbody>
                </table>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                </div>

                </div>
                
            </div>
        )
    }
}

export default ListTodosComponent;