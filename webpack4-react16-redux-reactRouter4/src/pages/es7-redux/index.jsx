/**
 * Author：tantingting
 * Time：2019/8/12
 * Description：Description
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'

@connect((state) => {
  console.log(state)
  return {
    loginInfo: state.loginInfo
  }
})
export default class UserAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>234</div>
    )
  }
}
