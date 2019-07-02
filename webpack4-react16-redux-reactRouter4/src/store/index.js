/**
 * Author：tantingting
 * Time：2019/5/24
 * Description：Description
 */
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import reducers from '../reducers'

const initialState = {}

const store = createStore(reducers, initialState, applyMiddleware(thunk))

export default store
