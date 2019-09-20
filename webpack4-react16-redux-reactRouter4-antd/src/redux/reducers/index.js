/**
 * Author：tantingting
 * Time：2019/5/24
 * Description：Description
 */
import { combineReducers } from 'redux'
import loginInfo from './login'
import {connectRouter} from "connected-react-router";

let reducers = {
  loginInfo
}
// const rootReducer = combineReducers(reducers)
const rootReducer = (history) => combineReducers({
  ...reducers,
  router: connectRouter(history)
})
export default rootReducer
