/**
 * Author：tantingting
 * Time：2019/8/12
 * Description：Description
 */

import React, {useState} from 'react'
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import {pageRouters} from '../../router/config'
import './index.scss'
import { NavLink } from "react-router-dom"

export default function (props) {
  const [collapsed, setState] = useState(false)
  const toggle = () => {
    setState(!collapsed);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width="240px" trigger={null} collapsible collapsed={collapsed}>
        <div className={!collapsed ? "top-logo" : "top-logo hide"}>
          <div className="logo" />
          <h1>misim管理后台</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
          {
            pageRouters.baseLayout.map((item, index) => (
              <Menu.Item key={index}>
                <NavLink to={item.path}>
                  <Icon type={item.icon} />
                  <span>{item.label}</span>
                </NavLink>
              </Menu.Item>
            ))
          }
        </Menu>
      </Sider>
      <Layout>
        <Header className="header" style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          <div className="page-warp">
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
