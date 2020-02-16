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

  fixName(name) {
    return name.split('_').join(' ');
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
          {this.state.data ? this.state.data.clients.map((val, i) => <Col style={{paddingBottom: "10px"}} lg={4} sm={6} key={i}>
            <Card className="bg-light hoverCard" onClick={() => this.setState({"redirect": val.clientId})}>
              <Card.Body>
              <Card.Img variant="top" src={val.type == "MINECRAFT" ? 
              "https://dl1.cbsistatic.com/i/2019/11/22/0c19a1bb-e1f0-482b-b533-24b9ec455c70/002a60cd29d3515a221ce74df3db7e4e/imgingest-3095197656598467933.png"
             : val.type == "TERRARIA" ? "https://dl1.cbsistatic.com/i/2017/05/25/198de8ee-b0fc-45ad-81f7-5dc58f01f9ad/4dd39a373cf71e6a06375752d7f7cd8c/imgingest-1359977285710609081.png"
             : val.type == "TEAM_FORTRESS_2" ?  "https://i.ya-webdesign.com/images/tf2-transparent-icon-9.png" : "https://i2.wp.com/icons.iconarchive.com/icons/ph03nyx/super-mario/256/Retro-Block-Question-icon.png"} />
                <Card.Title style={{textAlign:"center"}}>{this.fixName(val.type)}</Card.Title>
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
