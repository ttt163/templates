/**
 * Author：tantingting
 * Time：2019/5/24
 * Description：Description
 */
import { combineReducers } from 'redux'
import loginInfo from './login'

let reducers = {
  loginInfo
}
const rootReducer = combineReducers(reducers)
export default rootReducer
