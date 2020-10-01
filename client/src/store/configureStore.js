import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import auth from './auth';
import news from './news';
// import marks from './marks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  auth,
  news,
  // marks
});

const storeEnhancer = composeEnhancers(applyMiddleware(thunk));

const configureStore = (initialState) => {
  return createStore(
    reducer,
    initialState,
    storeEnhancer,
  );
};

export default configureStore;
