import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import publicInfo from './public'
const reducers = Object.assign({
    publicInfo,
    routing: routerReducer
})

const rootReducer = combineReducers(reducers)
export default rootReducer
