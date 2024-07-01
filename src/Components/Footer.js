import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const Footers = () => {
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            © {new Date().getFullYear()}, India, All Rights and Reserved
        </Footer>
    )
}

export default Footers;
