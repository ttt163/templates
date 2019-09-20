/**
 * Author：tantingting
 * Time：2019/8/20
 * Description：Description
 */

import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import {connect} from 'react-redux'

import './index.scss'
import loginImg from './img/login.png'
import Tooltip from "antd/es/tooltip";
import {loginApi} from "../../redux/action/login";

const FormItem = Form.Item
// s===
@connect((state) => {
  console.log(state)
  return {
    loginInfo: state.loginInfo
  }
})
class Login extends Component {
  handleSubmit(e) {
    const {dispatch} =this.props
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        dispatch(loginApi(values))
      }
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const {userId, pwd, isCheck} = this.props.loginInfo
    return (
      <div className="login-main">
        <div className="login-contain">
          <div className="login-icon">
            <img src={loginImg} />
          </div>
          <h3>用户登录</h3>
          <Form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
            <FormItem>
              {getFieldDecorator('userId', {
                rules: [{required: true, message: '请输入账号'}],
                initialValue: userId
              })(
                <Input prefix={
                  <Icon type="user"/>
                } type="text" placeholder="请输入账号"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('pwd', {
                rules: [{required: true, message: '请输入密码'}],
                initialValue: pwd
              })(
                <Input prefix={
                  <Icon type="lock"/>
                } type="password" placeholder="请输入密码"/>
              )}
            </FormItem>
            <Form.Item>
              <div className="flex-between">
                {getFieldDecorator('isCheck', {
                  valuePropName: 'checked',
                  initialValue: isCheck,
                })(<Checkbox>记住密码</Checkbox>)}
                <Tooltip title="请联系运营人员修改哦">
                  <div className="login-form-forgot">
                    忘记密码
                  </div>
                </Tooltip>
              </div>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default (Form.create()(Login))
