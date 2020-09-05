import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
//Components
import Login from '../Login/Login';
import Company from '../Company/Company';
import Dashboard from '../Dashboard/Dashboard';
import Home from '../Home/Home';
import Cliente from '../Cliente/Cliente';


const Routes = ({authenticated}) => {
    authenticated = true;
    return(
        <BrowserRouter>
            <Switch> 
                <Route path='/' exact component={() => authenticated ? <Redirect to='/dashboard/:id'/> : <Redirect to='/cliente/:id' />} />
                <Route path='/cliente/:id' exact component={Cliente} />
                <Route path='/login' exact component={Login} />
                <Route path='/dashboard/:id' exact component={() => authenticated ? <Dashboard /> : <Login />} />
                <Route path='/company/:id' exact component={Company} />
                <Route component={() => <Redirect to='/'/>} /> 
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;