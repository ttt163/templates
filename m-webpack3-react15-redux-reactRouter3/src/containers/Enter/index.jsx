/**
 * Author：zhoushuanglong
 * Time：2017/7/26
 * Description：enter
 */

import React, { Component } from 'react'
import './index.scss'
import {setPageTitle} from '../../actions/public'
import {connect} from 'react-redux'

class Enter extends Component {
    componentWillMount () {
        const {dispatch} = this.props
        dispatch(setPageTitle('首页'))
    }
    render () {
        return <div className="game-wrap clearfix">enter</div>
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        publicInfo: state.publicInfo
    }
}

export default connect(mapStateToProps)(Enter)
