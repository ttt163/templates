/**
 * Author：tantingting
 * Time：2019/8/12
 * Description：Description
 */
import {SET_LOGIN_DATA} from '../constants/index'
// import Cookies from 'js-cookie'

// const account = Cookies.getJSON('account')
const loginInfo = (state = {
    userId: '',
    avatarUrl: '',
    pwd: '',
    isCheck: true
}, action) => {
    switch (action.type) {
        case SET_LOGIN_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

export default loginInfo
