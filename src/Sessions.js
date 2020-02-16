import React from 'react';
import './App.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { Redirect } from 'react-router-dom'

class Sessions extends React.Component {

  performOp() {
    axios.get("https://stg-api.monotron.me/frontend/clients").then(resp => {
      if (resp.status != 200) return;
      this.setState({data: JSON.parse(resp.request.response)});
    })
  }

  constructor(props) {
    super(props);
    this.performOp.bind(this);
    this.state = { data: null, redirect: null }
    this.performOp();
    setInterval(() => {
      this.performOp();
    }, 10000);
  }

  render() {
    console.log(this.state);
    return (
      <Container style={{marginTop: "50px"}}>
        {this.state.redirect != null ? <Redirect push to={"/session/"+this.state.redirect}/> : ""}
        <h1>Current Game Sessions</h1>
        <hr/>
        <Row>
          {this.state.data ? this.state.data.clients.map((val, i) => <Col style={{paddingBottom: "10px"}} sm={6} key={i}>
            <Card className="bg-light hoverCard" onClick={() => this.setState({"redirect": val.clientId})}>
              <Card.Body>
                <Card.Title style={{textAlign:"center"}}>{val.type}</Card.Title>
                <Card.Text>
                  {"Twilio ID: " + val.twilioId}
                  <br/>
                  {"Last Seen: " + moment.utc(val.lastUpdatedDate).format('DD-MM-YY @ h:mm A')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>) : ""}
        </Row>
      </Container>
    )
  }
}

export default Sessions;
