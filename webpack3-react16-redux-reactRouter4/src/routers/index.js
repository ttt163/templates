/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：root route
 */

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from '../containers/Main/index'
import Index from '../containers/Index'

const PrimaryLayout = () => (
    <Switch>
    <Route exact path="/" component={Main} />
<Route exact path="/enter" component={Index} />
</Switch>
)

export default PrimaryLayout
