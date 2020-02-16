import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useParams, withRouter } from 'react-router-dom'
import moment from 'moment';

class GamePanel extends React.Component {

  performOp() {
    axios.get("https://stg-api.monotron.me/frontend/clients").then(resp => {
      if (resp.status != 200) return;
      this.setState({data: JSON.parse(resp.request.response)});
    })
  }

  constructor(props) {
    super(props);
    this.performOp.bind(this);
    this.state = { data: null }
    this.performOp();
    setInterval(() => {
      this.performOp();
    }, 10000);
  }

  sendCapability(clientId, cap) {
    axios.put("https://stg-api.monotron.me/frontend/effects/" + clientId + "?effectName=" + cap).then(console.log);
  }


  render() {
    const { sid } = this.props.match.params;
    console.log(this.state);
    if (this.state.data == null) return "";
    const { type, twilioId, lastUpdatedDate, capabilities } = this.state.data.clients.filter(val => val.clientId === sid)[0];
    return (
      <Container style={{marginTop: "50px"}}>
        <h1>{type}</h1>
        <h3>{"Twilio ID: " + twilioId}</h3>
        <h3>{"Last Seen: " + moment.utc(lastUpdatedDate).format('DD-MM-YY @ h:mm A')}</h3>
        <hr/>
        <Row>
          {!capabilities? "" : capabilities.map((cap, i) => 
            <Card className="bg-light hoverCard" key={i} style={{margin: "0.5em"}} onClick={() => this.sendCapability(sid, cap)}>
              <Card.Body>
                <Card.Title style={{textAlign:"center"}}>{cap}</Card.Title>
              </Card.Body>
            </Card>
            )}
        </Row>
      </Container>
    )
  }
}

export default withRouter(GamePanel);
