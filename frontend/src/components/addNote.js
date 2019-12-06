import React, {Component} from 'react'
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

class AddNoteForm extends Component{
    state = {
        title: '',
        content: ''
    }

    handleSubmit  = (e) =>{
        e.preventDefault()
        this.props.handleSave(this.state)

        this.setState({
            title: '',
            content: ''
        })
    }

    handleChange =(e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){


        return(
            <React.Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>
                            Title
                        </Label>
                        <Input onChange={this.handleChange} name='title' type='text' value={this.state.title} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Content</Label>
                        <Input onChange={this.handleChange} name="content" type="textarea" value={this.state.content} /> 
                    </FormGroup>


                    <Button color="secondary" >Save</Button>

                </Form>
            </React.Fragment>
        )
    }
}

export default AddNoteForm