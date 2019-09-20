/**
 * Author：tantingting
 * Time：2019/5/24
 * Description：Description
 */
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from '../reducers/index'
import { routerMiddleware } from 'connected-react-router';
import {createHashHistory} from "history";
const history = createHashHistory();

const initialState = {}

const store = createStore(
  // connectRouter(history)(rootReducer),
  rootReducer(history),
  initialState,
  applyMiddleware(routerMiddleware(history), thunk)
)

export default store
