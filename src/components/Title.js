import React from 'react';
import { Typography, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const Title = ({ children, tips }) => {
    return (
        <div style={{ marginTop: 16, display: 'flex' }}>
            <Typography.Title level={2} style={{ lineHeight: 1 }}>{children}</Typography.Title>
            <Tooltip title={tips} placement="right">
                <InfoCircleOutlined style={{ fontSize: 18, margin: '4px 0 0 4px' }} />
            </Tooltip>
        </div>
    )
}

export default Title