/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// import { Redirect } from 'react-router'


import Home from '../pages/Home';
import Other from '../pages/Other';


export default () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/other" element={<Other />} />
      <Route element={<Home />} />
    </Routes>
  </Router>
);
