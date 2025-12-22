import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalog from './components/catalog/Catalog';
import Product from './components/catalog/Product';
import RegistrationForm from './components/users/Register';
import LoginForm from './components/users/Login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegistrationForm/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/catalog' element={<Catalog/>}/>
        <Route path='/catalog/product/:id' element={<Product/>}/>
      </Routes>
    </Router>
  );
}

export default App;
