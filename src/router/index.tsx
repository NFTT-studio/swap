/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// import { Redirect } from 'react-router'


import Home from '../pages/Home';

export default () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/other" element={<Home />} />
      <Route element={<Home />} />
    </Routes>
  </Router>
);
