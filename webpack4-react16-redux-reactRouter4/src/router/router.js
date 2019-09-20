/**
 * Author：tantingting
 * Time：2019/5/22
 * Description：Description
 */
import React from 'react'
import { HashRouter as Router, Route, Link, Redirect, Switch, NavLink } from 'react-router-dom';
import Loadable from 'react-loadable';
import asyncComponent from '../components/asyncComponent'
import Bundle from '../components/bundle'
// import aContainer from 'bundle-loader?lazy!./containers/A'

import './index.scss'

import NotMatch from '../components/notMatch'

/*const Home = asyncComponent(() => import(/!* webpackChunkName: "home" *!/ '../pages/home'))
const App = asyncComponent(() => import(/!* webpackChunkName: "app" *!/ '../pages/app'))
const Enter = asyncComponent(() => import(/!* webpackChunkName: "enter" *!/ '../pages/enter'))*/

const LoadingComp = () => <span>loading</span>;
const Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ '../pages/home'),
    loading: LoadingComp,
});
const App = Loadable({
    loader: () => import(/* webpackChunkName: "app" */ '../pages/app'),
    loading: LoadingComp,
});
const Enter = Loadable({
    loader: () => import(/* webpackChunkName: "enter" */ '../pages/enter'),
    loading: LoadingComp,
});
const Es7Redux = Loadable({
  loader: () => import(/* webpackChunkName: "es7-redux" */ '../pages/es7-redux'),
  loading: LoadingComp,
});
const HookRedux = Loadable({
  loader: () => import(/* webpackChunkName: "hook-redux" */ '../pages/hook-redux'),
  loading: LoadingComp,
});
/*const Home = (props) => (
    <Bundle load={require('bundle-loader?lazy!../pages/home')}>
        {(Home) => <Home {...props}/>}
    </Bundle>
)

const App = (props) => (
    <Bundle load={require('bundle-loader?lazy!../pages/app')}>
        {(App) => <App {...props}/>}
    </Bundle>
)

const Enter = (props) => (
    <Bundle load={require('bundle-loader?lazy!../pages/enter')}>
        {(Enter) => <Enter {...props}/>}
    </Bundle>
)*/
export default class RootRouter extends React.Component{
    render(){
        return (
            <Router>
                <div>
                    <ul>
                        <li><NavLink exact to='/' activeClassName="active">首页</NavLink></li>
                        <li><NavLink to='/app' activeClassName="active">app</NavLink></li>
                        <li><NavLink to='/home' activeClassName="active">home</NavLink></li>
                      <li><NavLink to='/es7-redux' activeClassName="active">es7-redux</NavLink></li>
                      <li><NavLink to='/hook-redux' activeClassName="active">hook-redux</NavLink></li>
                        <li><NavLink to='/topic' activeClassName="active">主题列表</NavLink></li>
                    </ul>
                    <hr/>
                    <div className="page-warp">
                        <Switch>
                            {/*<Route exact path="/" render={() => <Redirect to='/home'/>}/>*/}
                            <Route exact path="/" component={Enter}/>
                            <Route  path="/app" component={ App} />
                            <Route path="/home" component={Home} />
                            <Route path="/es7-redux" component={Es7Redux} />
                            <Route path="/hook-redux" component={HookRedux} />
                            <Route component={NotMatch} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}
