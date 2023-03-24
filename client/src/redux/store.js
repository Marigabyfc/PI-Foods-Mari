import { applyMiddleware, createStore } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkmiddleware from 'redux-thunk';
import rootReducer from './reducer'

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkmiddleware))
)

export default store;