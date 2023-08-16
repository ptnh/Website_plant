import Header from '~/components/header/Header';
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
    faChevronRight,
    faCircle,
    faMoneyBill1Wave,
    faSpa,
    faStar,
    faTree,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { readApiCart, updateApiCart } from '~/Api';

function Carts({ isLoggedIn, username, id }) {
    // chứa các sản phẩm có id trùng với client
    const [carts, setCarts] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0);
    const [quantities, setQuantities] = useState([]);
    // tạo kết nối
    useEffect(() => {
        fetch(`${readApiCart}?id_owner=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCarts(data);
                const newQuantities = {};
                data.forEach((cart) => {
                    newQuantities[cart.id_plant] = cart.quantity; // Lưu quantity theo cart id
                });

                setQuantities(newQuantities); // Cập nhật state quantities
            });
    }, [quantities]);

    // cập nhật tổng số tiền
    useEffect(() => {
        updateTotalMoney();
    }, [quantities]);

    const updateTotalMoney = () => {
        let total = 0;
        carts.forEach((cart) => {
            const quantity = quantities[cart.id_plant] || cart.quantity;
            total += cart.price_product * quantity;
        });
        setTotalMoney(total);
    };

    // giảm số lượng sản phẩm đi 1
    const idString = id.toString();
    const decreaseQuantity = (id, id_plant, cart) => {
        let count = 0;
        // Gửi request GET đến API để lấy dữ liệu hiện tại
        fetch(readApiCart)
            .then((response) => response.json())
            .then((data) => {
                // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
                const existingCartItem = data.find((item) => item.id_owner === idString && item.id_plant === id_plant);

                if (existingCartItem) {
                    count = parseInt(existingCartItem.quantity, 10);
                    if (count === 0) {
                    } else {
                        count = count - 1;
                        const formData2 = new FormData();
                        // formData2.append('id_cart', NULL);
                        formData2.append('id_owner', idString);
                        formData2.append('id_plant', cart.id_plant);
                        formData2.append('name_product', cart.name_product);
                        formData2.append('image_represent', cart.image_represent);
                        formData2.append('price_product', cart.price_priduct);
                        formData2.append('quantity', count);
                        fetch(updateApiCart, {
                            method: 'POST',
                            body: formData2,
                        })
                            .then((response) => response.json())
                            .then((data) => {})
                            .catch((error) => console.error('Error updating cart item:', error));
                    }
                }
            });
    };

    // tăng lên 1
    const increaseQuantity = (id, id_plant, cart) => {
        let count = 0;
        // Gửi request GET đến API để lấy dữ liệu hiện tại
        fetch(readApiCart)
            .then((response) => response.json())
            .then((data) => {
                // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
                const existingCartItem = data.find((item) => item.id_owner === idString && item.id_plant === id_plant);

                if (existingCartItem) {
                    count = parseInt(existingCartItem.quantity, 10);
                    count = count + 1;
                    const formData2 = new FormData();
                    // formData2.append('id_cart', NULL);
                    formData2.append('id_owner', idString);
                    formData2.append('id_plant', cart.id_plant);
                    formData2.append('name_product', cart.name_product);
                    formData2.append('image_represent', cart.image_represent);
                    formData2.append('price_product', cart.price_priduct);
                    formData2.append('quantity', count);
                    fetch(updateApiCart, {
                        method: 'POST',
                        body: formData2,
                    })
                        .then((response) => response.json())
                        .then((data) => {})
                        .catch((error) => console.error('Error updating cart item:', error));
                }
            });
    };

    // xử lý thanh toán
    const history = useNavigate();
    const handlePay = (carts, total_money) => {
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
                        <div class="stage_1_carts">
                            <FontAwesomeIcon className="phase" icon={faCartShopping} />
                            <p>Giỏ hàng của tôi</p>
                            <div class="stage_1_carts_icon">
                                <FontAwesomeIcon icon={faChevronRight} />
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        </div>
                        <div class="stage_2">
                            <FontAwesomeIcon className="phase" icon={faMoneyBill1Wave} />
                            <p>Thông tin thanh toán</p>
                            <div class="stage_2_carts_icon">
                                <FontAwesomeIcon icon={faChevronRight} />
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        </div>
                        <div class="stage_3">
                            <FontAwesomeIcon className="phase" icon={faCheck} />
                            <p>Giỏ hàng của tôi</p>
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
                                    <tr key={cart.id_cart}>
                                        <td>
                                            <img src={cart.image_represent} />
                                        </td>
                                        <td>{cart.name_product}</td>
                                        <td>{cart.price_product}</td>
                                        <td>
                                            <div className="quantity">
                                                <button
                                                    className="btn_minus"
                                                    onClick={() => decreaseQuantity(cart.id_cart, cart.id_plant, cart)}
                                                >
                                                    -
                                                </button>

                                                <span className="quantity_value">{quantities[cart.id_plant]}</span>
                                                <button
                                                    className="btn_plus"
                                                    onClick={() => increaseQuantity(cart.id_cart, cart.id_plant, cart)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="total_money">{cart.price_product * quantities[cart.id_plant]}</td>
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
