import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import axios from 'axios';
class GamePanel extends React.Component {

  GamePanel() {
    this.state = { }
    setTimeout(() => {
      axios.get("https://stg-api.monotron.me/frontend/clients").then(resp => {
        this.setState({data: resp});
      })
    }, 100);
  }


  render() {
    console.log(this.state);
    return (
      <Container>
        <h1>Home</h1>
      </Container>
    )
  }
}

export default GamePanel;
