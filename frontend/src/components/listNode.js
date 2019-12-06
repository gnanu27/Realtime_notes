import React from 'react'
import {ListGroup, ListGroupItem} from 'reactstrap';
import Note from './note';


const ListNodes = ({notes, handleItemClick}) =>{
    let note_list = notes.map((note) => {
        return (
            <ListGroupItem key={note.id} href="#" onClick={(id) => handleItemClick(note.id)}>
            
                <Note title={note.title} />

            </ListGroupItem>
        )
    })

    return (
        <ListGroup>
            {note_list}
        </ListGroup>
        
    )
}
export default ListNodes