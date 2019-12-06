import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col} from 'reactstrap';
import ListNodes from './components/listNode';
import {fetchNotes, fetchNote, updateNote, addNote} from './api';
import AddNoteForm from './components/addNote';
import Websocket from 'react-websocket';
import EditNoteForm from './components/editNoteForm';


var notes_temp = [
{ 
  'id': 1,
  'title': 'HP - DH',
  'content': 'This is Shit' 

},

{ 
  'id': 2,
  'title': 'Avenger',
  'content': 'This is another Shit' 

},

{ 
  'id': 3,
  'title': 'BM',
  'content': 'This is always Shit' 

},

]


class App extends Component {
    state = {
      notes: [],
      note: {},
      current_note_id : 0,
      is_creating: true,
      is_fetching: true
    }
    componentDidMount(){
      this.getData();
    }
    getData = async() =>{
      let data = await fetchNotes()
      this.setState({notes: data})
    }

    handleClickItem =async (id) =>{
      let selected_note = await fetchNote(id)

      this.setState((prevState) => {
        return{is_creating: false, current_note_id: id, note: selected_note}
      })
    }

    handleAddNote = () =>{
      this.setState((prevState) =>{
        return{is_creating: true}
      })
    }
    handleSaveNote = async (data) =>{
      await addNote(data)
      await this.getData();

    }
    handleData = (data) =>{
        let result = JSON.parse(data)
        let current_note = this.state.note
        if(current_note.id === result.id){
          this.setState({note: result})
        }
    }

    handleOnChange = (e) =>{
      let content = e.target.value
      let current_note = this.state.note

      current_note.content = content
      
      this.setState({note: current_note})
      const socket = this.refs.socket;
      socket.state.ws.send(JSON.stringify(current_note))
    }
  
  

  render(){
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col xs='10'>
            <h2> RealTime Notes</h2>
          </Col>

          <Col xs='2'>
            <Button color="primary" onClick={this.handleAddNote}>
              Create a New Note
            </Button>
          </Col>
        </Row>

        <Row>
          <Col xs="4">
            <ListNodes notes={this.state.notes} handleItemClick = {(id) => this.handleClickItem(id)} />
          </Col>

          <Col xs="8">
            <p>Content/ Editing here..</p>
            {
              this.state.is_creating ?
               <AddNoteForm handleSave={this.handleSaveNote} /> : 
               <EditNoteForm note={this.state.note} handleChange={this.handleOnChange}  />
            }
             <Websocket ref="socket" url='ws://localhost:8000/ws/notes'
              onMessage={this.handleData}/>
          </Col>        </Row>
      </Container>
    </React.Fragment>

  );}
}

export default App;
