import React from 'react'
import { Button, Form, Input, message } from 'antd';
import './less/Login.less'
import logoImg from '../assets/logo.png'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import { LoginApi } from '../request/api';

export default function Login() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    LoginApi({
      uesrname: values.uesrname,
      password: values.password
    }).then(res => {
      if (res.errCode === 0) {
        message.success(res.message)
        // save data
        localStorage.setItem('avatar', res.data.avatar)
        localStorage.setItem('cms-token', res.data['cms-token'])
        localStorage.setItem('editable', res.data.editable)
        localStorage.setItem('player', res.data.player)
        localStorage.setItem('username', res.data.uesrname)
        // jump to root path
        setTimeout(() => {
          navigate('/')
        }, 1500)
      } else {
        message.error(res.message)
      }
    })
  };


  return (
    <div className="login">
      <div className='login_box'>
        <img src={logoImg} alt='' />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input size='large' prefix={<UserOutlined />} placeholder='Please input your username' />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password size='large' prefix={<LockOutlined />} placeholder='Please input your passwor'/>
          </Form.Item>

          <Form.Item>
            <Link to='/register'>
              Don't have an account?<br />
              Sign up and start creating your logo right now!
            </Link> 
          </Form.Item>
          <Form.Item>
            <Button size='large' type="primary" htmlType="submit" block>
              SIGN IN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
