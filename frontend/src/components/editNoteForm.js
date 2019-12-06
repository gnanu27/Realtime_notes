import React from 'react';
import {Form, FormGroup, Input, Card, CardTitle, CardText} from 'reactstrap';

const EditNoteForm = ({note, handleChange}) =>{
    return(
<React.Fragment>
    <Form>
        <Card>
            <FormGroup>
                <CardTitle>{ note.title}</CardTitle>
                <Input onChange={handleChange} value={note.content} type="textarea" name="content" />

            </FormGroup>
        </Card>
    </Form>
        </React.Fragment>

    )
}

export default EditNoteForm 