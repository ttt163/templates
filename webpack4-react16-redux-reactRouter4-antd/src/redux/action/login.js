/**
 * Author：tantingting
 * Time：2019/8/12
 * Description：Description
 */
import {SET_LOGIN_DATA} from '../constants'
// import {login} from '../../public/api'
// import Cookies from 'js-cookie'
import { createHashHistory } from 'history'
// import {message} from "antd";
const history = createHashHistory();
export const loginApi = (sendData) => {
  return (dispatch) => {
    /*login(sendData).then((res) => {
        const {rtnCode, data, rtnMsg} = res
        if (rtnCode === 0) {
            Cookies.set('sessionId', data.sessionId)
            dispatch(setLoginInfo({...sendData, avatarUrl: data.avatarUrl}))
            if (sendData.isCheck) {
              // 记住密码，存储账号密码
                Cookies.set('account', {...sendData, avatarUrl: data.avatarUrl})
            } else {
                Cookies.remove('account')
            }
            message.success(`登陆成功！`)
            history.push('/')
        } else {
            message.success(rtnMsg)
        }
    })*/
  }
}
export const setLoginInfo = (obj) => {
  return {
    type: SET_LOGIN_DATA,
    data: obj
  }
}
