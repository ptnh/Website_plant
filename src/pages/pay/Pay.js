import Header from '~/pages/header/Header';
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
    faCircle,
    faMoneyBill1Wave,
    faSpa,
    faStar,
    faTree,
} from '@fortawesome/free-solid-svg-icons';

function Pay({ isLoggedIn, username, id }) {

    //tạo kết nối lấy thông tin khách hàng
    const navigate = useNavigate();
    const clientAPI = `http://localhost:3000/accounts`;
    const [clients, setClients] = useState([]);
    useEffect(() => {
        fetch(clientAPI)
            .then((response) => response.json())
            .then((data) => {
                setClients(data);
                // console.log(clients);
            });
    }, [id]);

    const orderAPI = `http://localhost:3000/order?owner=${id}`;
    const [orders, setOrders] = useState([]);
    // tạo kết nối
    useEffect(() => {
        fetch(orderAPI)
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            });
    }, [orders.length]);

    const filteredOrders = orders.filter((order) => order.owner === id);
    console.log(filteredOrders);
    // Tìm giá trị lớn nhất của order.id trong danh sách filteredOrders
    const maxOrderId = filteredOrders.reduce((maxId, order) => Math.max(maxId, order.id), 0);

    // console.log(filteredOrders);
    const handleSubmitBill = (list_carts) => {
        const billAPI = 'http://localhost:3000/bills';
        const newBill = {
            owner: id,
            name_Client: nameClient,
            phone_Client: phoneClient,
            email_Client: emailClient,
            address_Client: addressClient,

            cartsss: list_carts
                .filter((list_cart) => list_cart.id === maxOrderId)
                .map((list_cart) => ({
                    carts: list_cart.carts.map((cart) => ({
                        image_represent: cart.image_represent,
                        name_product: cart.name_product,
                        price_bought: cart.price_bought,
                        quantity: cart.quantity,
                        // Thêm các thuộc tính khác của cart nếu cần
                    })),
                })),
        };

        //tạo kết nối giỏ hàng để xóa sản phẩm
        const cartsqAPI = `http://localhost:3000/cart_bought`;
        // Lấy danh sách các sản phẩm có owner=id từ API
        fetch(`${cartsqAPI}?owner=${id}`)
        .then((response) => response.json())
        .then((data) => {
            // Duyệt qua từng sản phẩm và thực hiện yêu cầu DELETE riêng lẻ cho từng sản phẩm
            const deletePromises = data.map((item) => {
                return fetch(`${cartsqAPI}/${item.id}`, {
                    method: 'DELETE',
                });
            });

            // Sử dụng Promise.all để đợi tất cả các yêu cầu DELETE hoàn thành
            return Promise.all(deletePromises);
        })
        .then((responses) => {
            // Kiểm tra tất cả các phản hồi từ các yêu cầu DELETE
            const allSuccessful = responses.every((response) => response.ok);
            if (allSuccessful) {
                alert('Xóa sản phẩm thành công.');
            } else {
                throw new Error('Có lỗi xảy ra khi xóa sản phẩm.');
            }
        })
        .catch((error) => console.error('Error deleting product:', error));
        

        fetch(billAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBill),
        })
            .then((response) => response.json())
            .then((data) => {})
            .catch((error) => console.error('Error creating post:', error));

        navigate('/');
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
                <div className="infomation_client_pay">
                    <form>
                        <h3>Thông tin khách hàng</h3>
                        {clients.map((client) =>
                            client.name_clients === username ? (
                                <div>
                                    <div class="form-group">
                                        <input
                                            placeholder="Tên khách hàng"
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={client.name_clients}
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
                        <table class="list_products">
                            {filteredOrders.map((order) =>
                                order.id === maxOrderId ? (
                                    <div key={order.id}>
                                        <h3>Đơn hàng #{order.id}</h3>
                                        <table>
                                            <tr>
                                                <th>Ảnh</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Giá cả</th>
                                                <th>Số lượng</th>
                                                <th>Thành tiền</th>
                                            </tr>
                                            {order.carts.map((cart) => (
                                                <tr key={cart.id}>
                                                    <td>
                                                        <img src={cart.image_represent} alt={cart.name_product} />
                                                    </td>
                                                    <td>{cart.name_product}</td>
                                                    <td>{cart.price_bought}</td>
                                                    <td>{cart.quantity}</td>
                                                    <td className="total_money">{cart.price_bought * cart.quantity}</td>
                                                </tr>
                                            ))}
                                        </table>
                                        <p>Tổng tiền: {order.total_money}</p>
                                    </div>
                                ) : null,
                            )}
                        </table>
                        <button type="submit" onClick={() => handleSubmitBill(filteredOrders)}>
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
