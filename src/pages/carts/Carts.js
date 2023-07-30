import Header from '~/pages/header/Header';
import Footer from '~/components/footer/Footer';

import React, { useState, useEffect } from 'react';
import './carts.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    fa1,
    fa2,
    fa3,
    faCartShopping,
    faCheck,
    faCircle,
    faMoneyBill1Wave,
    faSpa,
    faStar,
    faTree,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

function Carts({ isLoggedIn, username, id }) {
    // API lấy các sản phẩm trong giỏ hàng có id giống với client
    const cartsAPI = `http://localhost:3000/cart_bought?owner=${id}`;
    // APi lấy tất cả sản phẩm trong giỏ hàng
    const cartssAPI = `http://localhost:3000/cart_bought`;
    // chứa các sản phẩm có ig trùng với client
    const [carts, setCarts] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0);
    const [quantities, setQuantities] = useState([]);
    // tạo kết nối
    useEffect(() => {
        fetch(cartsAPI)
            .then((response) => response.json())
            .then((data) => {
                setCarts(data);
                const newQuantities = {};
                data.forEach((cart) => {
                    newQuantities[cart.id] = cart.quantity; // Lưu quantity theo cart id
                });

                setQuantities(newQuantities); // Cập nhật state quantities
            });
    }, [carts.length]);
    
    // cập nhật tổng số tiền
    useEffect(() => {
        updateTotalMoney();
    }, [quantities]);

    const updateTotalMoney = () => {
        let total = 0;
        carts.forEach((cart) => {
            const quantity = quantities[cart.id] || cart.quantity;
            total += cart.price_bought * quantity;
        });
        setTotalMoney(total);
    };

    // giảm số lượng sản phẩm đi 1
    const idString = id.toString();
    const decreaseQuantity = (id, id_plant, cart) => {
        const CartssAPI = 'http://localhost:3000/cart_bought';

        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: prevQuantities[id] - 1,
        }));

        // Gửi request GET đến API để lấy dữ liệu hiện tại
        fetch(CartssAPI)
            .then((response) => response.json())
            .then((data) => {
                // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
                const existingCartItem = data.find((item) => item.owner === idString && item.id_plant === id_plant);

                if (existingCartItem) {
                    // Nếu sản phẩm đã tồn tại, giảm số lượng lên -1
                    const updatedCart = {
                        ...existingCartItem,
                        quantity: existingCartItem.quantity - 1,
                    };

                    // Gửi request PUT đến API để cập nhật thông tin sản phẩm trong giỏ hàng
                    fetch(`${CartssAPI}/${existingCartItem.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedCart),
                    })
                        .then((response) => response.json())
                        .then((data) => {})
                        .catch((error) => console.error('Error updating cart item:', error));
                }
            })
            .catch((error) => console.error('Error fetching carts:', error));
    };

    // tăng lên 1
    const increaseQuantity = (id, id_plant, cart) => {
        const CartssAPI = 'http://localhost:3000/cart_bought';
        // Tạo object newCart từ plantId
        const newCart = {};
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: prevQuantities[id] + 1,
        }));

        // Gửi request GET đến API để lấy dữ liệu hiện tại
        fetch(CartssAPI)
            .then((response) => response.json())
            .then((data) => {
                // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
                const existingCartItem = data.find((item) => item.owner === idString && item.id_plant === id_plant);

                if (existingCartItem) {
                    // Nếu sản phẩm đã tồn tại, tăng số lượng lên +1
                    const updatedCart = {
                        ...existingCartItem,
                        quantity: existingCartItem.quantity + 1,
                    };

                    // Gửi request PUT đến API để cập nhật thông tin sản phẩm trong giỏ hàng
                    fetch(`${CartssAPI}/${existingCartItem.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedCart),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            // console.log(data); // In ra dữ liệu trả về từ API sau khi cập nhật
                        })
                        .catch((error) => console.error('Error updating cart item:', error));
                } else {
                    // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
                    fetch(CartssAPI, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newCart),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            // console.log(data); // In ra dữ liệu trả về từ API sau khi thêm newCart vào carts
                        })
                        .catch((error) => console.error('Error fetching carts:', error));
                }
            })
            .catch((error) => console.error('Error fetching carts:', error));
    };

    // xử lý thanh toán
    const orderAPI = 'http://localhost:3000/order';
    const history = useNavigate();
    const handlePay = (carts, total_money) => {
        // Thực hiện các thao tác để insert dữ liệu vào data ở đây
        const totalMoney = carts.reduce((total, cart) => total + cart.price_bought * quantities[cart.id], 0);

        const newOther = {
            carts: carts.map((cart) => ({
                id: cart.id,
                image_represent: cart.image_represent,
                name_product: cart.name_product,
                price_bought: cart.price_bought,
                quantity: quantities[cart.id],
            })),
            owner: id,
            total_money: totalMoney,
        };

        fetch(orderAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOther),
        })
            .then((response) => response.json())
            .then((data) => {
                setCarts([...carts, data]);
            })
            .catch((error) => console.error('Error creating post:', error));

        // Chuyển hướng đến trang thanh toán
        history('/pay');
    };

    return (
        <>
            {isLoggedIn ? (
                <></>
            ) : (
                <>
                    <Header isLoggedIn={isLoggedIn} username={username} />
                </>
            )}

            <div className="section-first-title">
                <FontAwesomeIcon icon={faTree} />
                <h3>Thông tin giỏ hàng</h3>
                <FontAwesomeIcon icon={faTree} />
                <div className="icon-mid">
                    <FontAwesomeIcon icon={faSpa} />
                </div>
            </div>

            <div class="container_list_carts">
                <div class="top_infomation">
                    <div class="stages_of_cart">
                        <div class="stage_1">
                            <FontAwesomeIcon className="phase" icon={faCartShopping} />
                            <p>Giỏ hàng của tôi</p>
                            <FontAwesomeIcon className="fa-light" icon={fa1} />
                        </div>
                        <div class="stage_2">
                            <FontAwesomeIcon className="phase" icon={faMoneyBill1Wave} />
                            <p>Giỏ hàng của tôi</p>
                            <FontAwesomeIcon icon={fa2} />
                        </div>
                        <div class="stage_3">
                            <FontAwesomeIcon className="phase" icon={faCheck} />
                            <p>Giỏ hàng của tôi</p>
                            <FontAwesomeIcon icon={fa3} />
                        </div>
                    </div>
                </div>
                <div class="bottom_infomation">
                    <div class="section_products_cart">
                        <table class="list_products">
                            <tr>
                                <th></th>
                                <th>Tên sản phẩm</th>
                                <th>Giá cả</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                            {carts.map((cart) => (
                                <>
                                    <tr key={cart.id}>
                                        <td>
                                            <img src={cart.image_represent} />
                                        </td>
                                        <td>{cart.name_product}</td>
                                        <td>{cart.price_bought}</td>
                                        <td>
                                            <div className="quantity">
                                                <button
                                                    className="btn_minus"
                                                    onClick={() => decreaseQuantity(cart.id, cart.id_plant, cart)}
                                                >
                                                    -
                                                </button>

                                                <span className="quantity_value">{quantities[cart.id]}</span>
                                                <button
                                                    className="btn_plus"
                                                    onClick={() => increaseQuantity(cart.id, cart.id_plant, cart)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="total_money">{cart.price_bought * quantities[cart.id]}</td>
                                    </tr>
                                </>
                            ))}
                        </table>
                        <div className="total_money_cart">
                            <p className="result">
                                Tổng tiền: <span>{totalMoney}</span>
                            </p>
                            <button className="continute_buy_product">
                                <a href="http://localhost:2112">Tiếp tục mua hàng</a>
                            </button>
                            <button className="pay" onClick={() => handlePay(carts)}>
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Carts;
