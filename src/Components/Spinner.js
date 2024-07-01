import React from 'react'
import { Flex, Spin } from 'antd';

const Spinner = () => {
    return (
        <Flex align="center" gap="middle" style={{ marginTop: "600px" }}>
            <Spin size="large" />
        </Flex>
    )
}

export default Spinner
