import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
//Components
import Login from '../Login/Login';
import Company from '../Company/Company';
import Dashboard from '../Dashboard/Dashboard';
import Home from '../Home/Home';
import Cliente from '../Cliente/Cliente';


const RequireAuth = ({children, authenticated}) => {
    
    if(!authenticated){
        return <Redirect to={'/cat/auth/login'} />;
    }
    
    return children;
    
};
const Routes = ({authenticated}) => {
    return(
        <BrowserRouter>
            <Switch> 
                {/* <Route path='/' exact component={() => authenticated ? <Redirect to='/dashboard/:id'/> : <Redirect to='/' />} /> */}
                <Route path='/cat/:id' exact component={Cliente} />
                <Route exact path='/cat/auth/login' exact component={() => <Login authenticated={authenticated} />} />

                <Route exact path='/cat/auth/dashboard/:id' component={() => (authenticated) ? <Dashboard /> : <Redirect to='/cat/auth/login' />} />
                {/* <Route path='/company/:id' exact component={Company} /> */}
                <Route component={() => <Redirect to='/'/>} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;