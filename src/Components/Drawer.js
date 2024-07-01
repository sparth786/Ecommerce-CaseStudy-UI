import React, { useEffect } from 'react';
import logo from '../images/logo.png';
import { fetchCarts } from './Redux/ViewCartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCarts } from './Redux/DeleteCartReducer';

const Drawers = ({ formattedDate }) => {
    const dispatch = useDispatch();
    const cartStates = useSelector((state) => state.viewCart.carts);
    const totalSum = cartStates.reduce((sum, item) => sum + (item.totalAmount*item.quantity), 0);
    
    useEffect(() => {
        dispatch(fetchCarts())
            .then((response) => {
                console.log('Fetched carts:', response);
            })
            .catch((error) => {
                console.error('Failed to fetch carts:', error);
            });
    }, [dispatch]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            console.log('Razorpay script loaded');
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const openRazorpay = () => {
        if (window.Razorpay) {
            const options = {
                key: 'rzp_test_LAGWrBltvmtMrE',
                amount: totalSum * 100,
                name: 'Ecommerce',
                description: 'Appointment Charges',
                image: logo,
                handler: (response) => {
                    console.log(response);
                },
                theme: {
                    color: '#4287f5',
                },
                currentDate: formattedDate,
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } else {
            console.error('Razorpay SDK not loaded');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-8">
                    <div className="p-2">
                        <h4>Shopping cart</h4>
                    </div>

                    {
                        cartStates.map((items) => {
                            return (
                                <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                                    <div className="mr-1"><img className="rounded" src={items.imageURL} alt='not found' width="70" /></div>
                                    <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">{items.productName}</span>

                                    </div>
                                    <div className="d-flex flex-row align-items-center qty"><i className="fa fa-minus text-danger"></i>
                                        <h5 className="text-grey mt-1 mr-1 ml-1">{items.quantity}</h5><i className="fa fa-plus text-success"></i></div>
                                    <div>
                                        <h5 className="text-grey">&#8377; {items.price}/-</h5>
                                    </div>
                                    <div>
                                        <h5 className="text-grey">Total Amount:  &#8377; {items.totalAmount}/-</h5>
                                    </div>
                                    <div>
                                    <button className="btn btn-danger btn-block btn-sm ml-2 pay-button" type="button" onClick={() => {
                                        dispatch(deleteCarts(items.cartId))
                                        dispatch(fetchCarts())
                                    }}>X</button>
                                    </div>
                                    <div className="d-flex align-items-center"><i className="fa fa-trash mb-1 text-danger"></i></div>
                                </div>
                            )
                        })
                    }
                    <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">Total Amount: &#8377; {totalSum}</div>
                    <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button className="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button" onClick={openRazorpay}>Proceed to Pay</button></div>
                </div>
            </div>
        </div>
    );
};

export default Drawers;
