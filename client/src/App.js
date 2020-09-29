import React from 'react';
import { BrowserRouter, Switch, Redirect, Route, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserList from './components/UsersList';
import { Header, Footer } from './components/layouts/index';
import MyGrid from './components/articles/index';
import Login from './components/layouts/login';
import Logout from './components/layouts/Logout';
import Test from './components/layouts/test';
import { thunks } from './store/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
    // console.log(rest.needLogin);
    return (
        <Route {...rest} render={(props) => {
            return rest.needLogin === true
                ? <Redirect to='/login' />
                : <Component {...props} />
        }
        } />
    )
}

function App(props) {
    const needLogin = useSelector((state) => !state.auth.id)
    // const needLogin = true;

    console.log(needLogin)

    return (
        <BrowserRouter>
            <Header></Header>
            <nav>
                <ul>
                    <li><NavLink to="/" >Home</NavLink></li>
                    <li><NavLink to="/users" >Users</NavLink></li>
                    <li><NavLink to="/login" >Login</NavLink></li>
                    <li><NavLink to="/logout" >Logout</NavLink></li>
                </ul>
            </nav>
            <Switch>
                <PrivateRoute path="/"
                    exact={true}
                    needLogin={needLogin}
                    component={Test}>
                </PrivateRoute>
                <Route path="/users">
                    <UserList />
                </Route>
                <Route path="/login"> <Login /></Route>
                <Route path="/logout"> <Logout /> </Route>

            </Switch>
            <MyGrid></MyGrid>
            <Footer></Footer>
        </BrowserRouter>
    );
}

export default App;
