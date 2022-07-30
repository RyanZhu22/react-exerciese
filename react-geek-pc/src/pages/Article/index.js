import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import './index.scss'
import { values } from 'mobx'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const onFinish = (values) => {
    console.log(values);
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Content management</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          onFinish={onFinish} 
          initialValues={{ status: null }}>
          <Form.Item label="status" name="status">
            <Radio.Group>
              <Radio value={null}>Total</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={1}>Pending review</Radio>
              <Radio value={2}>Audit approved</Radio>
              <Radio value={3}>Audit Failure</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id">
            <Select
              placeholder="Please select article channel"
              defaultValue="lucy"
              style={{ width: 120 }}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>

          <Form.Item label="date" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              Filtering
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Article