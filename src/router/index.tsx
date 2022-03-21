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
import Other from '../pages/Other';
import Swap from '../pages/Swap';

export default () => (
  <Router>
    <Routes>
      <Route path="/" element={<Swap />} />
      <Route path="/other" element={<Other />} />
      <Route element={<Home />} />
    </Routes>
  </Router>
);
