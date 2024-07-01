import React, { useState, useEffect } from 'react';
import { Card, Skeleton, Button, Divider, notification } from 'antd';
import { ShoppingCartOutlined, CodeSandboxOutlined } from '@ant-design/icons';
import ViewDetailModal from './ViewDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../Components/Redux/ProductReducer";
import { addCarts } from './Redux/AddCartReducer';
import { fetchCarts } from './Redux/ViewCartReducer';
import { viewProductDetails } from './Redux/ViewProductsDetailsReducer';

const { Meta } = Card;

const Product = () => {
    const [loading, setLoading] = useState(true);
    const [counter, setCounter] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(1);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const incrementCounter = () => {
        setCounter(counter + 1);
    };

    const decrementCounter = () => {
        if (counter > 1) {
            setCounter(counter - 1);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedProductId(null);
    };

    const dispatch = useDispatch();
    const states = useSelector((state) => {
        return state.products.items;
    })

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCarts())
    }, [dispatch])

    const [prdId, setProdId] = useState();
    console.log(prdId)
    const handleViewDetails = (productId) => {
        setSelectedProductId(productId);
        setModalVisible(true);
        setProdId({prdId: productId})
    };


    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    };

    return (
        <div className='h-100'>
            {contextHolder}
            <div className='container'>
                <h2>Products</h2>
                <div className='row'>
                    {
                        states.map((items) => {
                            return (
                                <div className='col'>
                                    <Skeleton loading={loading} avatar active style={{
                                        width: 300,
                                        marginTop: 16,
                                    }}>
                                        <Card
                                            style={{
                                                width: 300,
                                                marginTop: 16,
                                            }}
                                            cover={
                                                <img
                                                    alt="example"
                                                    src={items.imageURL}
                                                    style={{ height: "200px" }}
                                                />
                                            }
                                        >
                                            <Meta
                                                title={items.name}
                                            />
                                            <Divider><CodeSandboxOutlined /></Divider>
                                            <div className="row mt-2" style={{ alignItems: "center" }}>
                                                <div>
                                                    <p className="mt-2 product-text"><span style={{ fontWeight: "bold" }}>Category:</span> {items.category.name}</p>
                                                </div>
                                                <div>
                                                    <p className="mt-2 product-text"><span style={{ fontWeight: "bold" }}>Price:</span> &#8377; {items.price}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div>
                                                    <p className="mt-2 product-text"><span style={{ fontWeight: "bold" }}>Qty:&nbsp;&nbsp;</span>
                                                        <Button onClick={decrementCounter}>-</Button>&nbsp;
                                                        <input type='text' className='input-cart-counter' onChange={(e) => setQty({ qty: e.target.value })} value={counter} readOnly />&nbsp;
                                                        <Button onClick={incrementCounter}>+</Button>
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="mt-2 product-text"><Button danger style={{ width: "100%", height: "36px" }}
                                                        onClick={() => {
                                                            dispatch(addCarts({
                                                                name: items.name,
                                                                category: items.category.name,
                                                                price: items.price,
                                                                quantity: qty,
                                                                productId: items.category.id,
                                                                userId: 4,
                                                                imageURL: items.imageURL
                                                            }));
                                                            <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
                                                        }}
                                                    ><b>Cart</b><ShoppingCartOutlined style={{ fontSize: '25px' }} /></Button>
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="mt-2 product-text"><Button type="primary" style={{ width: "100%", height: "36px" }} onClick={() => handleViewDetails(selectedProductId)}>View Details</Button></p>
                                                </div>
                                            </div>
                                        </Card>
                                    </Skeleton>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <ViewDetailModal prdId={prdId} visible={modalVisible} onClose={handleCloseModal} />
        </div>
    );
};

export default Product;
