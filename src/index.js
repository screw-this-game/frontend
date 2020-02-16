import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Sessions from './Sessions';
import GamePanel from './GamePanel';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

const routing = (
    <Router>
                <style>{".hoverCard {width: 18rem; -webkit-transition: 0.2s; transition: 0.2s} .hoverCard:hover{background-color: #e2e5ea !important;}"}</style>
      <div>
        <Route exact path="/" component={Sessions} />
        <Route path="/session/:sid" component={GamePanel} />
      </div>
    </Router>
  )
ReactDOM.render(routing, document.getElementById('root'))