import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from '@/assets/logo-google.png'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { useStore } from '@/store'

const Login = () => {
  // 获取跳转实例对象
    const { loginStore } = useStore()
    const navigate = useNavigate()
    async function onFinish (values) {
        console.log(values);
        const { mobile, code } = values
        await loginStore.getToken({ mobile, code })
        navigate('/', { replace: true })
        message.success('successful signing')
    }

    return (
        <div className="login">
        <Card className="login-container">
            <img className="login-logo" src={logo} alt="" />
            <Form 
                validateTrigger={['onBlur', 'onChange']}
                onFinish={ onFinish }
                initialValues={{
                  mobile: '13811111111',
                  code: '246810',
                  remember: true
                }}
            >
                <Form.Item
                    name="mobile"
                    rules={[
                    {
                        pattern: /^1[3-9]\d{9}$/,
                        message: 'The cell phone number is not in the right format',
                        validateTrigger: 'onBlur'
                    },
                    { required: true, message: 'Plz input tel number' }
                    ]}
                >
                    <Input size="large" placeholder="Plz input tel number" />
                </Form.Item>
                <Form.Item
                    name="code"
                    rules={[
                        { len: 6, message: 'Verification code 6 characters', validateTrigger: 'onBlur' },
                        { required: true, message: 'Plz input vertification code' }
                    ]}
                >
                    <Input size="large" placeholder="Plz input verification code" />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox className="login-checkbox-label">
                        I have read and agree to the User Agreement and Privacy Policy
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block>
                        Sign in
                    </Button>
                </Form.Item>
            </Form>
        </Card>
        </div>
    )
}
    

export default Login