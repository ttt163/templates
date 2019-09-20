/**
 * Author：tantingting
 * Time：2019/8/12
 * Description：Description
 */
import {LOGIN} from '../constants'
export const setLoginInfo = (obj) => {
  return {
    type: LOGIN,
    data: obj
  }
}
