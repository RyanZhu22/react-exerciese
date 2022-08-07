import React from 'react'
import { Button, Form, Input, message } from 'antd';
import './less/Login.less'
import logoImg from '../assets/logo.png'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import { RegisterApi } from '../request/api';

export default function Register() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log('Success:', values);
    RegisterApi({
      username: values.username,
      password: values.password
    }).then(res => {
      console.log(res);
      if (res.errCode === 0) {
        message.success(res.message);
        setTimeout(() =>navigate('/login'), 1500)
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
            <Input.Password size='large' prefix={<LockOutlined />} placeholder='Please input your passwor!' />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your passwor again!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password size='large' prefix={<LockOutlined />}placeholder='Please confirm your passwor again!'/>
          </Form.Item>
          <Form.Item>
            <Link to='/register'>
              Don't have an account?<br />
              Go to sign in now!
            </Link>
          </Form.Item>
          <Form.Item>
            <Button size='large' type="primary" htmlType="submit" block>
              REGISTER
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
