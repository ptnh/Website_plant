import Header from '~/components/header/Header';
import Footer from '~/components/footer/Footer';

import React, { useState, useEffect } from 'react';
import './info.scss';
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
import { deleteApiOrder, readApiAccount, readApiOrder, updateApiAccount } from '~/Api';

function Info({ isLoggedIn, username, id }) {
    const [clients, setClients] = useState([]);
    useEffect(() => {
        fetch(`${readApiAccount}?id_account=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setClients(data);
            });
    }, [id]);

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${readApiOrder}?id_owner=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
                console.log(data);
            });
    }, [orders]);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const handleClickDeleteOrder = (order_id) => {
        fetch(readApiOrder)
            .then((response) => response.json())
            .then((data) => {
                const existingOrder = data.find((item) => item.id_order === order_id);

                if (existingOrder) {
                    if (existingOrder.status_order === 'Chờ duyệt') {
                        const formData2 = new FormData();
                        formData2.append('id_order', order_id);
                        console.log(order_id);
                        fetch(deleteApiOrder, {
                            method: 'POST',
                            body: formData2,
                        })
                            .then((response) => {
                                if (response.ok) {
                                    // updateCarts(); //gọi hàm update giỏ hàng
                                } else {
                                    throw new Error('Có lỗi xảy ra khi xóa sản phẩm.');
                                }
                            })
                            .catch((error) => console.error('Error deleting product:', error));
                        setShowSuccessMessage(true);

                        setTimeout(() => {
                            setShowSuccessMessage(false);
                        }, 1500);
                    } else {
                        setShowErrorMessage(true);

                        setTimeout(() => {
                            setShowErrorMessage(false);
                        }, 1500);
                    }
                } else {
                    console.log('Không tìm thấy đơn hàng cần xóa');
                }
            })
            .catch((error) => {
                console.error('Lỗi khi truy vấn API:', error);
            });
    };

    // Hàm xử lý xóa đơn hàng
    const deleteOrder = (order) => {
        // Gọi API hoặc thực hiện các thao tác xóa đơn hàng ở đây
        console.log('Xóa đơn hàng:', order);
    };

    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        fetch(`${readApiAccount}?id_account=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setClients(data);
                const extractedUsernames = data.map((client) => client.username_account);
                setUsernames(extractedUsernames);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);
    const [password, setPassword] = useState('');
    const [name_client, setNameClient] = useState('');
    const [address, setAddressClient] = useState('');
    const [email, setEmailClient] = useState('');
    const [phone, setPhoneClient] = useState('');

    const handleUpdateAccount = () => {
        const formData2 = new FormData();
        formData2.append('name_client', name_client);
        formData2.append('email_client', email);
        formData2.append('phone_client', phone);
        formData2.append('address_client', address);
        formData2.append('username_account', usernames);
        formData2.append('password_account', password);
        // console.log(usernames);
        fetch(updateApiAccount, {
            method: 'POST',
            body: formData2,
        })
            .then((response) => {
                if (response.ok) {
                    
                } else {
                    throw new Error('Có lỗi xảy ra khi xóa sản phẩm.');
                }
            })
            .catch((error) => console.error('Error deleting product:', error));
    };

    const [editing, setEditing] = useState(false);
    return (
        <>
            {isLoggedIn ? (
                <></>
            ) : (
                <>
                    <Header isLoggedIn={isLoggedIn} username={username} />
                </>
            )}

            <div className="section_info_client">
                <img src="Anh_Dao.jpg"></img>
                <div className="content_info">
                    <h3 className="title_info">Thông tin khách hàng</h3>
                    {clients.map((client) =>
                        client.username_account === username ? (
                            <>
                                <form>
                                    <div className="info_detail">
                                        <h3>Tên khách hàng:</h3>
                                        <input
                                            type="text"
                                            name="name_client"
                                            placeholder={client.name_client}
                                            onChange={(e) => setNameClient(e.target.value)}
                                            readOnly={!editing}
                                            // Disable input if not in editing mode
                                        />
                                    </div>
                                    <div className="info_detail">
                                        <h3>Địa chỉ:</h3>
                                        <input
                                            type="text"
                                            name="address_client"
                                            placeholder={client.address_client}
                                            onChange={(e) => setAddressClient(e.target.value)}
                                            readOnly={!editing}
                                        />
                                    </div>
                                    <div className="info_detail">
                                        <h3>Số điện thoại:</h3>
                                        <input
                                            type="text"
                                            name="phone_client"
                                            placeholder={client.phone_client}
                                            onChange={(e) => setPhoneClient(e.target.value)}
                                            readOnly={!editing}
                                        />
                                    </div>
                                    <div className="info_detail">
                                        <h3>Email:</h3>
                                        <input
                                            type="text"
                                            name="email_client"
                                            placeholder={client.email_client}
                                            onChange={(e) => setEmailClient(e.target.value)}
                                            readOnly={!editing}
                                        />
                                    </div>
                                    <div className="info_detail">
                                        <h3>Tài khoản:</h3>
                                        <input
                                            type="text"
                                            name="username_client"
                                            placeholder={client.username_account}
                                            onChange={(e) => setUsernames(e.target.value)}
                                            readOnly={!editing || editing}
                                        />
                                    </div>
                                    <div className="info_detail">
                                        <h3>Password:</h3>
                                        <input
                                            type="password"
                                            name="password_account"
                                            placeholder={client.password_account}
                                            onChange={(e) => setPassword(e.target.value)}
                                            readOnly={!editing}
                                        />
                                    </div>

                                    <button
                                        className="btn_update_info_client"
                                        type="button"
                                        onClick={() => setEditing(true)}
                                    >
                                        Chỉnh sửa thông tin
                                    </button>
                                    {editing && (
                                        <button
                                            className="btn_update_info_client"
                                            type="submit"
                                            onClick={handleUpdateAccount}
                                        >
                                            Lưu thông tin
                                        </button>
                                    )}
                                </form>
                            </>
                        ) : null,
                    )}
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="no_order">
                    <p className="notify_no_order">Hiện không có đơn hàng nào.</p>
                    <a className="back_home" href="/">
                        Quay về mua hàng
                    </a>
                </div>
            ) : (
                orders.map((order, index) => (
                    <div key={order.id_order} className="section_info_order">
                        <div className="info_order_left">
                            {index === 0 || orders[index - 1].id_order !== order.id_order ? (
                                <>
                                    <h3>{order.id_order}</h3>
                                    <div className="status">
                                        <p>Ngày lập đơn: {order.day_bought}</p>
                                        <button className="btn_status">{order.status_order}</button>
                                        <button
                                            className="btn_delete"
                                            onClick={() => handleClickDeleteOrder(order.id_order)}
                                        >
                                            Hủy đơn
                                        </button>
                                    </div>
                                    <p className="total_money_order">{order.total_money} VND</p>
                                </>
                            ) : null}
                        </div>
                        <div className="info_order_right">
                            {index === 0 || orders[index - 1].id_order !== order.id_order ? (
                                <>
                                    <h3 className="info_introduce">Chi tiết sản phẩm đơn hàng</h3>
                                    <table className="list_products">
                                        <thead>
                                            <tr>
                                                <th>Ảnh sản phẩm</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Giá sản phẩm</th>
                                                <th>Số lượng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders
                                                .filter((orderItem) => order.id_order === orderItem.id_order)
                                                .reduce((uniqueProducts, filteredOrder) => {
                                                    if (
                                                        !uniqueProducts.some(
                                                            (product) =>
                                                                product.name_product === filteredOrder.name_product,
                                                        )
                                                    ) {
                                                        uniqueProducts.push(filteredOrder);
                                                    }
                                                    return uniqueProducts;
                                                }, [])
                                                .map((uniqueProduct) => (
                                                    <tr key={uniqueProduct.id_order}>
                                                        <td>
                                                            <img src={uniqueProduct.image_represent} alt="Product" />
                                                        </td>
                                                        <td>{uniqueProduct.name_product}</td>
                                                        <td>{uniqueProduct.price_bought}</td>
                                                        <td>{uniqueProduct.quantity}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </>
                            ) : null}
                        </div>
                    </div>
                ))
            )}
            {showErrorMessage && <p className="info_reason">Đơn hàng đã duyệt không hủy được</p>}
            {showSuccessMessage && <p className="info_reason">Hủy đơn thành công</p>}
            <Footer />
        </>
    );
}

export default Info;
