/**
 * Author：tantingting
 * Time：2019/5/22
 * Description：Description
 */

import React, {Component} from 'react'
import './index.scss'
import { connect } from 'react-redux'

@connect((state) => {
    console.log(state)
    return {
      loginInfo: state.loginInfo
    }
})
export default class APP extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        console.log(this.props)
        return (
            <div>APP</div>
        )
    }
}
