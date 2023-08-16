import Header from '~/components/header/Header';
import Footer from '~/components/footer/Footer';
import './pay.scss';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { createApiOrder, deleteApiCart, readApiAccount, readApiCart } from '~/Api';

function Pay({ isLoggedIn, username, id }) {
    //tạo kết nối lấy thông tin khách hàng
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    useEffect(() => {
        fetch(`${readApiAccount}?id_account=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setClients(data);
            });
    }, [id]);

    const [carts, setCarts] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0);

    useEffect(() => {
        // Tính tổng tiền khi carts thay đổi
        const calculatedTotalMoney = carts.reduce((total, cart) => total + cart.price_product * cart.quantity, 0);
        setTotalMoney(calculatedTotalMoney);
    }, [carts]);
    // tạo kết nối
    useEffect(() => {
        fetch(`${readApiCart}?id_owner=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCarts(data);
            });
    }, [carts.length]);

    const filteredCarts = carts.filter((cart) => cart.id_owner === id);
    function generateRandomCode() {
        const randomOrder = Math.floor(Math.random() * 10000); // Tạo 4 chữ số ngẫu nhiên

        // const idString = String(id_owner).padStart(4, '0'); // Chuyển id_owner thành chuỗi 4 chữ số

        const randomCode = `DH${randomOrder}${id}`;
        return randomCode;
    }

    const getCurrentFormattedDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        return `${year}/${month}/${day}`;
    };

    // console.log(filteredOrders);
    const handleSubmitOrders = (list_carts) => {
        const createIdOrder = generateRandomCode();
        const formattedDate = getCurrentFormattedDate();
        list_carts.map((list_cart) => {
            const formData2 = new FormData();
            formData2.append('id_order', createIdOrder);
            formData2.append('id_owner', list_cart.id_owner);
            formData2.append('id_plant', list_cart.id_plant);
            formData2.append('name_product', list_cart.name_product);
            formData2.append('image_represent', list_cart.image_represent);
            formData2.append('price_product', list_cart.price_product);
            formData2.append('quantity', list_cart.quantity);
            formData2.append('day_bought',formattedDate);
            formData2.append('total_money', totalMoney);
            formData2.append('status_order', 'Chờ duyệt');
            fetch(createApiOrder, {
                method: 'POST',
                body: formData2,
            })
                .then((response) => {
                    if (!response.ok) {
                        // throw new Error(`Có lỗi xảy ra khi xóa sản phẩm thứ ${i + 1}.`);
                    }
                })
                .catch((error) => console.error(`Error deleting product `, error));
        });
        for (let i = 0; i < list_carts.length; i++) {
            const formData = new FormData();
            formData.append('id_cart', list_carts[i].id_cart);

            fetch(deleteApiCart, {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Có lỗi xảy ra khi xóa sản phẩm thứ ${i + 1}.`);
                    }
                })
                .catch((error) => console.error(`Error deleting product ${i + 1}:`, error));
        }
        
        navigate('/info');
    };

    const [nameClient, setNameClient] = useState('');
    const [phoneClient, setPhoneClient] = useState('');
    const [emailClient, setEmailClient] = useState('');
    const [addressClient, setAddressClient] = useState('');

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
                <h3>Thông tin thanh toán</h3>
                <FontAwesomeIcon icon={faTree} />
                <div className="icon-mid">
                    <FontAwesomeIcon icon={faSpa} />
                </div>
            </div>

            <div className="section_pay_money">
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
                        <div class="stage_2_carts">
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
                <div className="infomation_client_pay">
                    <form>
                        <h3>Thông tin khách hàng</h3>
                        {clients.map((client) =>
                            client.username_account === username ? (
                                <div>
                                    <div class="form-group">
                                        <input
                                            placeholder="Tên khách hàng"
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={client.name_client}
                                            autoFocus
                                            onFocus={(e) => setNameClient(e.target.value)}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input
                                            placeholder="SĐT"
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={client.phone_client}
                                            autoFocus
                                            onFocus={(e) => setPhoneClient(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input
                                            placeholder="Email"
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={client.email_client}
                                            autoFocus
                                            onFocus={(e) => setEmailClient(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input
                                            placeholder="Địa chỉ"
                                            type="text"
                                            id="address"
                                            name="address"
                                            autoFocus
                                            value={client.address_client}
                                            onFocus={(e) => setAddressClient(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            ) : null,
                        )}

                        <h3>Thông tin đơn hàng</h3>
                        <table className="list_products">
                            <thead>
                                <tr>
                                    <th>Ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá cả</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carts.map((cart) => (
                                    <tr key={cart.id_cart}>
                                        <td>
                                            <img src={cart.image_represent} alt={cart.name_product} />
                                        </td>
                                        <td>{cart.name_product}</td>
                                        <td>{cart.price_product}</td>
                                        <td>{cart.quantity}</td>
                                        <td className="total_money">{cart.price_product * cart.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p>Tổng tiền: {totalMoney}</p>
                        <button
                            className="btn_buy_product"
                            type="submit"
                            onClick={() => handleSubmitOrders(filteredCarts)}
                        >
                            Xác nhận đặt hàng
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Pay;
