import React from 'react';
import Test from './Core/Test';
import Home from './Core/Home';
import Dashboard from './Core/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} exact/>
            <Route path="/t" element={<Test />} exact/>
            <Route path="/dashboard" element={<Dashboard />} exact/>
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;

