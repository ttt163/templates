/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：root reducer
 */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import gameListInfo from './gameListInfo'
const reducers = Object.assign({
    gameListInfo,
    routing: routerReducer
})

const rootReducer = combineReducers(reducers)
export default rootReducer
