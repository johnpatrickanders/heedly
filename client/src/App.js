import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/layouts/Header';
import Login from './components/layouts/login';
import Logout from './components/layouts/Logout';
import TopHeadlines from './components/articles/TopHeadlines';
import { SearchResults } from './components/articles/SearchResults';
import ExpandArticle from './components/articles/ExpandArticle';
import MyReads from './components/articles/Reads';
import ExpandSource from './components/articles/ExpandSource';
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
        </BrowserRouter>
    );
}

export default App;
