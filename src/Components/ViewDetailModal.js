import React, { useEffect } from 'react';
import { Modal, Button } from 'antd';
import logo from "../images/logo.png"
import { useDispatch, useSelector } from 'react-redux';
import { viewProductDetails } from './Redux/ViewProductsDetailsReducer';

const ViewDetailModal = ({ visible, onClose, prdId }) => {

    const dispatch = useDispatch();
    const states = useSelector((s) => {
        return s
    })

    useEffect(() => {
        dispatch(viewProductDetails(prdId))
    }, [dispatch])

    return (
        <Modal
            title="Product Details"
            open={visible}
            footer={[
                <Button key="close" onClick={onClose}>
                    Close
                </Button>,
            ]}
            onCancel={onClose}
        >
            <div className='row'>
                <div className='col-md-6'>
                    <img style={{ height: "350px", width: "200px" }} src={logo} alt="not found" />
                </div>
                <div className='col-md-6'>
                    <h3 style={{ color: "gray" }}>Description</h3>
                    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing soft</p>
                    <hr />
                    <h3 style={{ color: "gray" }}>Extra Details</h3>
                    <p><span style={{ fontWeight: "bold", fontSize: "15px" }}>Cateogry:</span> Cloths</p>
                    <p><span style={{ fontWeight: "bold", fontSize: "15px" }}>Price:</span> &#8377; 550/-</p>
                    <p><span style={{ fontWeight: "bold", fontSize: "15px" }}>Qty.:</span> 5</p>
                </div>
            </div>
        </Modal>
    );
};

export default ViewDetailModal;
