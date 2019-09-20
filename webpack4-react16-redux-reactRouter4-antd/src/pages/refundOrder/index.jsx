/**
 * Author：tantingting
 * Time：2019/8/12
 * Description：Description
 */

import React, {useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setLoginInfo} from "../../redux/action/login";

export default function (props) {
  console.log(props, 'props')
  const loginInfo = useSelector(state => state.loginInfo)
  console.log(loginInfo, 'loginInfo')
  const dispatch = useDispatch()
  const click = useCallback(
    () => dispatch(setLoginInfo({email: '111@163.com'})),
    [dispatch]
  )
  return (
    <div className="inst-page1-warp">
      123,
      {loginInfo.email}
      <button onClick={() => click()}>设置邮箱</button>
    </div>
  )
}
