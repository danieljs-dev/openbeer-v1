import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from 'react-router-dom';

import {
  NotFound, Login,
  Register, Profile,
  AdminProfile, Products,
  Checkout, OrderDetails,
  Error, Orders,
  ForgotPassword, ResetPassword } from './pages';

import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/products" component={ Products } />
        <Route path="/checkout" component={ Checkout } />
        <Route path="/profile" component={ Profile } />
        <Route path="/orders/:id" component={ OrderDetails } />
        <Route path="/orders" component={ Orders } />
        <Route path="/admin/orders/:id" component={ OrderDetails } />
        <Route path="/admin/orders" component={ Orders } />
        <Route path="/admin/profile" component={ AdminProfile } />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/reset" component={ ForgotPassword } />
        <Route path="/reset/:token" component={ ResetPassword } />
        <Route path="/error" component={ Error } />
        <Route component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
