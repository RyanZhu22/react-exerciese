import { Link } from 'react-router-dom'
import { Table, Tag, Space, Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import img404 from '@/assets/error.png'
import './index.scss'
import { useEffect, useState } from 'react'
import { http } from '@/utils'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  // channel list management
  const [channelList, setChannelList] = useState([])
  const loadChannelList = async () => {
    const res = await http.get('/channels')
    setChannelList(res.data.channels)
  }

  useEffect(() => {
    loadChannelList()
  }, [])
  // article list management
  const [articleData, setArticleList] = useState({
    list: [], // article list
    count: 0 // article number
  })

  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
    status: 0
  })

  // If async requests function re-execute depending on change of data
  // recommendation: writen into inside  
  useEffect(() => {
    const loadList = async () => {
      const res = http.get('/mp/articles', { params })
      console.log(res);
      const { results, total_count } = res.data
      setArticleList({
        list: results,
        count: total_count
      })
    }
    loadList()
  }, [params])

  const onFinish = (values) => {
    console.log(values);
    const { channel_id, date, status } = values 
    const _params = {}
    if (status !== -1) {
      _params.status = status
    }
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    setParams({
      ...params,
      ..._params
    })
  }

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width:120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={200} height={150} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      {/* 筛选区域 */}
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
              style={{ width: 120 }}
            >
              {channelList.map(channel => <Option key={channel.id} value={channel.name}>{channel.name}</Option>)}
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
      {/* 文章列表区域 */}
      <Card title={`根据筛选条件共查询到 ${articleData.count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articleData.list} />
      </Card>
    </div>
  )
}

export default Article