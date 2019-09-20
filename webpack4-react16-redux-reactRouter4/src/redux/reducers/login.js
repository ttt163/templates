/**
 * Author：tantingting
 * Time：2019/8/12
 * Description：Description
 */
import { LOGIN } from '../constants/index'

const loginInfo = (state = {email: '', password: ''}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.actionData
    default:
      return state
  }
}

export default loginInfo
