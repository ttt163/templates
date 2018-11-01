/**
 * Author：tantingting
 * Time：2018/11/1
 * Description：Description
 */

import {PUBLIC} from '../constants'

export const setPageTitle = (title) => {
    return {
        type: PUBLIC.SET_PAGE_TITLE,
        title
    }
}
