/**
 * Author：tantingting
 * Time：2019/5/24
 * Description：Description
 */
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from '../reducers/index'

const initialState = {}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

export default store
