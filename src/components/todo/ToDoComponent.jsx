import React, { Component } from 'react';
import moment from 'moment';
import {Field, Formik, Form, ErrorMessage} from 'formik';
import AuthenticationService from './AuthenticationService';
import TodoDataService from '../../api/todo/TodoDataService';

class TodoComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            description:'',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit=this.onSubmit.bind(this)
    }
    componentDidMount(){

            if(this.state.id === -1){
                return
            }
            let username = AuthenticationService.getUserName();
            TodoDataService.retrieveTodo(username,this.state.id)
            .then(
                response=> this.setState({
                    description:response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                })
            )
            .catch()
    }
    onSubmit(values){
        let username = AuthenticationService.getUserName();
        if(this.state.id===-1){
            TodoDataService.createTodo(username,{
                id:this.state.id,
                description:values.description,
                targetDate:values.targetDate
            }).then(()=>this.props.history.push('/todos'))
        }
        else{
        TodoDataService.updateTodo(username,this.state.id,{
            id:this.state.id,
            description:values.description,
            targetDate:values.targetDate
        }).then(()=>this.props.history.push('/todos'))
        }
    }
    validate(values){
        let errors={}
        if(!values.description){
            errors.description="Enter A Description"
        }
        else if (values.description.length<5)
            errors.description="Enter A valid length Description"
        if(!moment(values.targetDate).isValid())
            errors.targetDate ="Enter a valid date"
        return errors
    }
    render(){
        let {description,targetDate} = this.state
        // let description = this.state.description
        // let targetDate = this.state.targetDate
        return (<div>
        <h1>ToDo</h1>
        <div className="container">
            <Formik
            // initialValues={{description:description,
            // targetDate:targetDate}}
            initialValues={{description,targetDate}}
            onSubmit={this.onSubmit}
            validate={this.validate}
            enableReinitialize={true}
            >
                {
                    (props) => (
                        <Form className="form-group">
                        <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                        <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                            <fieldset>
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description"/>
                            </fieldset>
                            <fieldset>
                                <label>Target Date</label>
                                <Field className="form-control" type="date" name="targetDate"/>
                            </fieldset>
                            <button className="btn btn-success" type="submit">Save</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
        </div>)
    }
}

export default TodoComponent;