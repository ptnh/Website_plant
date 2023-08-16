import React, { useState, useEffect } from 'react';
import './header.scss';
import { menuData } from '../../data-plants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteApiCart, readApiCart, readApiPlant } from '~/Api';

const Header = ({ isLoggedIn, username, id, onLogout, onCartUpdate}) => {
    // tạo mảng lưu sản phẩm trong giỏ hàng
    const [carts, setCarts] = useState([]);
    const [cartsUpdated, setCartsUpdated] = useState(false);

    //tạo kết nối giỏ hàng khi có thay đổi sẽ cập nhật
    useEffect(() => {
        fetch(readApiCart)
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data.filter((item) => item.id_owner === id);
                setCarts(filteredData);
            });
    }, [cartsUpdated]);
    useEffect(() => {
        fetch(readApiCart)
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data.filter((item) => item.id_owner === id);
                setCarts(filteredData);
            });
    }, [onCartUpdate]);
    // Hàm cập nhật giỏ hàng khi có thay đổi
    const updateCarts = () => {
        setCartsUpdated(!cartsUpdated);
    };
    // Sử dụng hàm updateCarts để cập nhật giỏ hàng khi có thay đổi

    const [menus, setMenus] = useState(menuData);
    const history = useNavigate();
    // xử lý đăng xuất
    const handleLogout = (e) => {
        e.preventDefault();
        onLogout();
        history('/');
    };

    //xử lý xóa sản phẩm khỏi giỏ hàng
    const handleRemoveProduct = (cart) => {
        const formData2 = new FormData();
        formData2.append('id_cart', cart.id_cart);
        formData2.append('id_owner', cart.id_owner);
        formData2.append('id_plant', cart.id_plant);
        formData2.append('name_product', cart.name_product);
        formData2.append('image_reprsent', cart.image_represent);
        formData2.append('price_product', cart.price_product);
        formData2.append('quantity', cart.quantity);
        fetch(deleteApiCart, {
            method: 'POST',
            body: formData2,
        })
            .then((response) => {
                if (response.ok) {
                    updateCarts(); //gọi hàm update giỏ hàng
                } else {
                    throw new Error('Có lỗi xảy ra khi xóa sản phẩm.');
                }
            })
            .catch((error) => console.error('Error deleting product:', error));
    };

    // tìm kiếm
    const [searchPlants, setSearchPlants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Gửi yêu cầu API hoặc truy vấn cơ sở dữ liệu để lấy dữ liệu dựa vào giá trị id
    useEffect(() => {
        fetch(readApiPlant)
            .then((response) => response.json())
            .then((data) => setSearchPlants(data));
    }, []);

    const handleSearch = () => {
        if (searchTerm === '') {
            setSearchResults([]);
        } else {
            setTimeout(() => {
                const filteredResults = searchPlants.filter((searchPlant) =>
                    searchPlant.name.toLowerCase().includes(searchTerm.toLowerCase()),
                );
                setSearchResults(filteredResults);
            }, 1000);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [searchTerm]); // Chỉ gọi handleSearch khi searchTerm thay đổi

    return (
        <>
            <header>
                <div className="header-first">
                    <ul className="main-menu">
                        {menus.map((menu) => {
                            return (
                                <>
                                    <li>
                                        <a href={menu.path}>{menu.name}</a>
                                    </li>
                                </>
                            );
                        })}
                    </ul>
                    <div className="check-account">
                        {isLoggedIn ? (
                            <>
                                <div className="cart">
                                    <FontAwesomeIcon className="cart-icon" icon={faCartShopping} />
                                    <span class="header__cart-notice">
                                        {carts.length === 0 ? (
                                            <>
                                                <span>{carts.length}</span>
                                                <div className="cart-list">
                                                    <h4 class="cart-heading">Hiện chưa có sản phẩm trong giỏ hàng</h4>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <span>{carts.length}</span>
                                                <div className="cart-list">
                                                    <h4 class="cart-heading">Sản phẩm đã thêm</h4>
                                                    <ul class="cart-list-item">
                                                        {carts.map((cart) => (
                                                            <>
                                                                <li class="cart-item">
                                                                    <img
                                                                        className="cart-img"
                                                                        src={cart.image_represent}
                                                                    ></img>
                                                                    <div class="cart-item-info">
                                                                        <div class="cart-item-head">
                                                                            <h5 class="cart-item-name">
                                                                                {cart.name_product}
                                                                            </h5>
                                                                            <div class="cart-item-price-wrap">
                                                                                <span class="cart-item-price">
                                                                                    {cart.price_bought}
                                                                                </span>
                                                                                <span class="cart-item-multiply">
                                                                                    x
                                                                                </span>
                                                                                <span class="cart-item-qnt">
                                                                                    {cart.quantity}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="cart-item-body">
                                                                            <span class="cart-item-description">
                                                                                Phân loại: khá
                                                                            </span>
                                                                            <button
                                                                                class="cart-remove-product"
                                                                                onClick={() =>
                                                                                    handleRemoveProduct(cart)
                                                                                }
                                                                            >
                                                                                Xóa
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </>
                                                        ))}
                                                    </ul>
                                                    <a href="http://localhost:2112/carts" class="view-cart btn-cart">
                                                        Xem giỏ hàng
                                                    </a>
                                                </div>
                                            </>
                                        )}
                                    </span>
                                </div>

                                <form className="after-login" onSubmit={handleLogout}>
                                    <div class="info-account account-ui">
                                        <img
                                            src="https://saigonbling.b-cdn.net/wp-content/uploads/2022/07/ho-ly-la-gi-2.jpg"
                                            className="account-user-avatar"
                                        ></img>
                                        <span class="account-user-name">{username}</span>
                                        <ul class="account-menu">
                                            <li>
                                                <button className="btn-logout" type="submit">
                                                    Đăng xuất
                                                </button>
                                            </li>
                                            <li>
                                                <button className="link_info">
                                                    <a href='/info'>Thông tin</a>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <button className="btn-header btn-login-header">
                                    <a href="http://localhost:2112/login">Đăng nhập</a>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="header-second">
                    <img className="logo" src="./logo.jpg" alt="" />
                    <h3>Mang lợi ích cho không gian xanh</h3>
                    <div className="search">
                        <input
                            placeholder="Tìm kiếm cây cảnh"
                            value={searchTerm}
                            spellCheck={false}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <button1 className="search-btn" onClick={handleSearch}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button1>

                        {searchResults.length > 0 && (
                            <div className="search-results">
                                {searchResults.map((result) => (
                                    <p className="list" key={result.id}>
                                        <a href={`/product?id=${result.id}`}>{result.name}</a>
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="header-third">
                    <div className="tree-category">
                        <ul className="tree-type">
                            <img src="sen-da-mini.jpg" alt="" />
                            <li>
                                <a href="http://localhost:2112/#CAY_MAY_MAN">CÂY MAY MẮN</a>
                            </li>
                            <img src="sen-da-mini.jpg" alt="" />
                            <li>
                                <a href="http://localhost:2112/#CAY_DE_BAN">CÂY ĐỂ BÀN</a>
                            </li>
                            <img src="sen-da-mini.jpg" alt="" />
                            <li>
                                <a href="http://localhost:2112/#CAY_THUY_SINH">CÂY THỦY SINH</a>
                            </li>
                            <img src="sen-da-mini.jpg" alt="" />
                            <li>
                                <a href="http://localhost:2112/#CAY_NOI_THAT">CÂY NỘI THẤT</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
