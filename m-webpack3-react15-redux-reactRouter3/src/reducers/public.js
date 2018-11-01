/**
 * Author：tantingting
 * Time：2018/11/1
 * Description：Description
 */

import { PUBLIC } from '../constants/index'

const publicInfo = (state = {title: '活动汇总'}, action) => {
    switch (action.type) {
        case PUBLIC.SET_PAGE_TITLE:
            return {
                ...state,
                title: action.title
            }
        default:
            return state
    }
}

export default publicInfo
