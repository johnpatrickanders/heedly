import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import UserList from './components/UsersList';
import { Header, Footer } from './components/layouts/index';
import MyGrid from './components/articles/index';
import Login from './components/layouts/login';

function App() {

    return (
        <BrowserRouter>
            <Header></Header>
            <nav>
                <ul>
                    <li><NavLink to="/" activeClass="active">Home</NavLink></li>
                    <li><NavLink to="/users" activeClass="active">Users</NavLink></li>
                    <li><NavLink to="/login" activeClass="active">Login</NavLink></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/users">
                    <UserList />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/">
                    <h1>My Home Page</h1>
                </Route>
            </Switch>
            <MyGrid></MyGrid>
            <Footer></Footer>
        </BrowserRouter>
    );
}

export default App;
