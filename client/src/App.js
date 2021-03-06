import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/layouts/Header';
import Login from './components/layouts/login';
import Logout from './components/layouts/Logout';
import TopHeadlines from './components/articles/TopHeadlines';
import ExpandArticle from './components/articles/ExpandArticle';
import MyReads from './components/articles/Reads';
import ExpandSource from './components/articles/ExpandSource';
import Sources from './components/articles/Sources';
import SignUp from './components/layouts/Signup';
import ExpandRead from './components/articles/ExpandRead';
import SearchResults from './components/articles/SearchResults';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#E33E7F'
        },
        primary: {
            main: '#1F9EA9'
        }
    }
});

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

function App() {
    const signedIn = useSelector((state) => state.auth.id)

    return (
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                {signedIn ? <Header></Header> : null}
                <Switch>
                    <Route exact={true} path="/"> {signedIn ? <TopHeadlines /> : <Login />}</Route>
                    <PrivateRoute exact={true} path="/sources"
                        signedIn={signedIn}
                        component={Sources}
                    />
                    <PrivateRoute exact={true} path="/sources/:sourceId"
                        signedIn={signedIn}
                        component={ExpandSource}
                    />
                    <Route exact={true} path="/login"> <Login /></Route>
                    <Route exact={true} path="/signup"> <SignUp /></Route>
                    <Route path="/logout"> <Logout /> </Route>
                    <PrivateRoute exact={true} path="/news"
                        signedIn={signedIn}
                        component={TopHeadlines}
                    />
                    <PrivateRoute exact={true} path="/search"
                        signedIn={signedIn}
                        component={SearchResults}
                    />
                    <PrivateRoute exact={true} path="/reads"
                        signedIn={signedIn}
                        component={MyReads} />
                    <PrivateRoute exact={true} path="/expand-article"
                        signedIn={signedIn}
                        component={ExpandArticle} />
                    <PrivateRoute exact={true} path="/expand-read"
                        signedIn={signedIn}
                        component={ExpandRead} />
                    <Route path="*" component={Login}></Route>
                </Switch>
            </MuiThemeProvider>
        </BrowserRouter>
    );
}

export default App;
