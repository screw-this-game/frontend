import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Sessions from './Sessions';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={Sessions} />
        <Route path="/session/:sid" component={GamePanel} />
      </div>
    </Router>
  )
ReactDOM.render(routing, document.getElementById('root'))