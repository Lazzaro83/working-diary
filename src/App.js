import React, { Component } from 'react';
import { Segment, Form , Button, TextArea, Icon, Menu, Label } from 'semantic-ui-react';
import PastNotes from './PastNotes.jsx';
import { base } from './base.js';
import './App.css';

const RenderNotes = props => (
    <Segment className='notesContent'>
        {props.notes.map(note =>
            <PastNotes key={note[0]} data={note} />
        )}
    </Segment>
);

class App extends Component {
    constructor(){
        super();
        this.state = {
            auth: "",
            userInput: "notLogged",
            notes: {},
            dayNote: '',
            dates: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderMonthsMenu = this.renderMonthsMenu.bind(this);
        this.onClickMenuItem = this.onClickMenuItem.bind(this);
        this.checkCode = this.checkCode.bind(this);
    };

    componentWillMount(){
        this.ref = base.syncState("diary", {
            context: this,
            state: "notes"
        });
        this.ref = base.syncState("auth", {
            context: this,
            state: "auth"
        });
    };

    componentDidMount(){
        setTimeout(
            function(){this.setState({
                dates: Object.entries(this.state.notes)
            })}.bind(this), 1500
        )
    }

    handleChange(e){
        this.setState({dayNote: e.target.value});
    };

    onClickMenuItem(menuDate){
        const month = menuDate.split(' ')[0];
        const year = menuDate.split(' ')[1];
        const filterNotes = Object.entries(this.state.notes);
        const result = filterNotes.filter(note => note[0].includes(month) && note[0].includes(year));
        this.setState({
            dates: result
        })
    };

    handleSubmit(){
        const time = Date();
        const timeOfNote = time.slice(0, time.indexOf('GMT')-1);
        const allNotes = this.state.notes;
        const updatedNotes = {
            ...allNotes,
            [timeOfNote]: this.state.dayNote
        };
        this.setState({
            notes: updatedNotes,
            dayNote: ''
        })

    };

    checkCode(event){
        this.setState({
            userInput: event.target.value
        })
    }

    renderMonthsMenu(){
        const notes = Object.entries(this.state.notes);
        const datesOfNotes = notes.map(date => date[0].slice(4, 7).concat(' ').concat(date[0].slice(11, 15)));
        // const uniqueDates = [...new Set(datesOfNotes)];
        const numberOfPostsPerMonth = datesOfNotes.reduce(function(prev, curr) {
            prev[curr] = (prev[curr] || 0) + 1;
            return prev;
        }, {});
        const numberOfPostsPerMonthArray = Object.entries(numberOfPostsPerMonth);
        return(
            <div className='sideMenu'>
                <Menu inverted vertical className='notesMenu'>
                    {numberOfPostsPerMonthArray.map(menuItem => (
                        <Menu.Item name='inbox' key={menuItem[0]} onClick={() => this.onClickMenuItem(menuItem[0])}>
                            <Label color='red'>{menuItem[1]}</Label>
                            {menuItem[0]}
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        )
    }

  render() {
      if(this.state.auth !== this.state.userInput) {
          return <input
              placeholder='Insert app code'
              onChange={(event) => this.checkCode(event)}
              className='authInput'
          />
              }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Prethodne beleške</h1>
            <div className='AppNotes'>
                {this.state.notes && this.renderMonthsMenu()}
                <RenderNotes notes={this.state.dates} />
            </div>
        </header>
          <Segment inverted className='addNotesSegment'>
              <Form inverted  onSubmit={this.handleSubmit}>
                  <TextArea
                      value={this.state.dayNote}
                      onChange={(e) => this.handleChange(e)}
                      placeholder='Unesite šta ste radili danas'
                      rows={5}
                  />
                  <Button
                      color='yellow'
                      fluid
                      inverted
                      icon
                      className='sendButton'
                  >
                      <Icon name='send'/> Pošalji
                  </Button>
              </Form>
          </Segment>
      </div>
    );
  }
}

export default App;
