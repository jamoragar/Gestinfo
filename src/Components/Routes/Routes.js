import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
//Components
import Login from '../Login/Login';
import Company from '../Company/Company';
import Dashboard from '../Dashboard/Dashboard';
import Home from '../Home/Home';
import Cliente from '../Cliente/Cliente';


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch> 
                {/* <Route path='/' exact component={() => authenticated ? <Redirect to='/dashboard/:id'/> : <Redirect to='/' />} /> */}
                <Route path='/cat/:id' exact component={Cliente} />
                <Route path='/cat/auth/login' exact component={Login} />
                <Route path='/cat/auth/dashboard/:id' component={Dashboard} />
                {/* <Route path='/company/:id' exact component={Company} /> */}
                <Route component={() => <Redirect to='/'/>} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;