import React, {Component} from 'react'
import './index.scss'
import { connect } from 'react-redux'
import Title from 'react-title-component'

class Main extends Component {
    render () {
        const {publicInfo} = this.props
        const {title} = publicInfo
        return <div>
            <Title render={title}/>
            1111233
            {this.props.children}
        </div>
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        publicInfo: state.publicInfo
    }
}

export default connect(mapStateToProps)(Main)
