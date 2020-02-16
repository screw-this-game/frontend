import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import axios from 'axios';
class Sessions extends React.Component {

  Sessions() {
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

export default Sessions;
