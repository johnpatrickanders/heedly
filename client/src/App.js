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
import TopHeadlines from './components/articles/TopHeadlines';
import { SearchResults } from './components/articles/SearchResults';
import ExpandArticle from './components/articles/ExpandArticle';
import MyReads from './components/articles/Reads';
import Home from './components/articles/Sources';
import ExpandSource from './components/articles/ExpandSource';
import MouseOverPopover from './components/layouts/PopOver';
import SignUp from './components/layouts/Signup';

const PrivateRoute = ({ component: Component }) => {
    // console.log(rest.needLogin);
    const signedIn = useSelector(state => state.auth.id)
    return (
        <Route signedIn render={(props) => {
            return signedIn !== true
                ? <Redirect to='/login' />
                : <Component {...props} />
        }
        } />
    )
}

function App(props) {
    const needLogin = useSelector((state) => !state.auth.id)
    // const needLogin = true;

    // console.log(needLogin)

    return (
        <BrowserRouter>
            <Header></Header>
            <nav>
                <ul>
                    <li><NavLink to="/" >Home</NavLink></li>
                    <li><NavLink to="/login" >Login</NavLink></li>
                    <li><NavLink to="/logout" >Logout</NavLink></li>
                    {/* <li><NavLink to="/news" >News</NavLink></li>
                    <li><NavLink to="/reads" >My Reads</NavLink></li> */}
                </ul>
            </nav>
            <Switch>
                <PrivateRoute path="/sources"
                    exact={true}
                    needLogin={needLogin}
                    component={Home}>
                </PrivateRoute>
                <Route exact path="/sources/:sourceId" component={ExpandSource}></Route>
                <Route path="/login"> <Login /></Route>
                <Route path="/signup"> <SignUp /></Route>
                <Route path="/logout"> <Logout /> </Route>
                <Route exact path="/news"> <TopHeadlines /> </Route>
                <Route path="/search"><SearchResults /></Route>
                <PrivateRoute path="/reads" needLogin={needLogin} component={MyReads}></PrivateRoute>

            </Switch>
            {/* <MyGrid></MyGrid> */}
            <ExpandArticle></ExpandArticle>
            {/* <SearchResults /> */}
            <Footer></Footer>
        </BrowserRouter>
    );
}

export default App;
