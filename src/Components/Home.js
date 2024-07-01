import React from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import ProductPage from "../Components/Product";
import { FloatButton } from 'antd';


const { Content } = Layout;

const Home = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <div className='product-main'>
            <Layout className='h-100'>
                <Content
                    style={{
                        padding: '0 48px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >

                    </Breadcrumb>
                    <div
                        style={{
                            background: colorBgContainer,
                            minHeight: 280,
                            padding: 24,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <ProductPage />
                    </div>
                </Content>
            </Layout>
            <FloatButton.BackTop />
        </div>
    );
};

export default Home;