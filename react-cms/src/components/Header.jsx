import React, { useEffect, useState } from 'react'
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import defaultAvatar from '../assets/default_avatar.png'

export default function Header() {
    const [avatar, setAvatar] = useState(defaultAvatar)
    const [username, setUsername] = useState('Visitor')

    useEffect(() => {
        let username1 = localStorage.getItem('username')
        if (username) {
            setUsername(setUsername)
        }
    })

    const menu = (
        <Menu>
            <Menu.Item>Modify information</Menu.Item>
            <Menu.Divider />
            <Menu.Item>Logout</Menu.Item>
        </Menu>
    );

    return (
        <header>
            CONTENT MANAGEMENT SYSTEM
            <div className="right">
                <Dropdown overlay={menu}>
                    <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
                        <img src={avatar} className='avatar' alt="" />
                        <span>{username}</span>
                        <CaretDownOutlined />
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}
