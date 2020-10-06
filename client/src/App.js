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
import Sources from './components/articles/Sources';
import SignUp from './components/layouts/Signup';
import ExpandRead from './components/articles/ExpandRead';


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            !rest.signedIn === true
                ? <Redirect to='/login' />
                : <Component {...props} />
        )
        } />
    )
}

function App(props) {
    const signedIn = useSelector((state) => state.auth.id)

    return (
        <BrowserRouter>
            <Header></Header>
            <Switch>
                <PrivateRoute exact path="/sources"
                    signedIn={signedIn}
                    component={Sources}
                />
                <PrivateRoute exact path="/sources/:sourceId"
                    signedIn={signedIn}
                    component={ExpandSource}
                />
                {/* <Route path="/" component={Login}></Route> */}
                <Route exact path="/login"> <Login /></Route>
                <Route exact path="/signup"> <SignUp /></Route>
                <Route path="/logout"> <Logout /> </Route>
                <PrivateRoute exact path="/news"
                    signedIn={signedIn}
                    component={TopHeadlines}
                />
                <PrivateRoute exact path="/search"
                    signedIn={signedIn}
                    component={SearchResults}
                />
                <PrivateRoute exact path="/reads"
                    signedIn={signedIn}
                    component={MyReads} />
                <PrivateRoute exact path="/expand-article"
                    signedIn={signedIn}
                    component={ExpandArticle} />
                <PrivateRoute exact path="/expand-read"
                    signedIn={signedIn}
                    component={ExpandRead} />
                <Route path="*" component={Login}></Route>
            </Switch>
            {/* <MyGrid></MyGrid> */}
            {/* <ExpandArticle></ExpandArticle> */}
            {/* <SearchResults /> */}
            <Footer></Footer>
        </BrowserRouter>
    );
}

export default App;
