import Header from '~/pages/header/Header';
import React, { useState, useEffect } from 'react';
import Footer from '~/components/footer/Footer';
import './product.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faClover, faHouse, faSpa, faStar, faTree } from '@fortawesome/free-solid-svg-icons';

function Product({ isLoggedIn, username, ids }) {
    // Lấy giá trị id từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    // alert(id);
    // Gọi hàm để hiển thị nội dung tương ứng với id
    // Ví dụ: gọi hàm fetchDataAndDisplay(id) để lấy dữ liệu từ API và hiển thị lên trang
    // fetchDataAndDisplay(id);

    const plantsAPI = `http://localhost:3000/plants_home?id=${id}`;

    // chứa thông tin danh sách hàng
    const [plants, setPlants] = useState([]);
    // function fetchDataAndDisplay(id) {
    // Gửi yêu cầu API hoặc truy vấn cơ sở dữ liệu để lấy dữ liệu dựa vào giá trị id
    useEffect(() => {
        fetch(plantsAPI)
            .then((response) => response.json())
            .then((data) => setPlants(data));
    }, []);

    const list_plantAPI = 'http://localhost:3000/plants_home';

    // chứa thông tin danh sách hàng
    const [list_plant, setListPlant] = useState([]);
    //lấy data truyền vào plants
    useEffect(() => {
        fetch(list_plantAPI)
            .then((response) => response.json())
            .then((data) => setListPlant(data));
    }, []);

    function changeImage(imagePath) {
        var largeImage = document.getElementById('largeImage');
        largeImage.src = imagePath;
    }
    // còn thíu hàm handlelogout onLogout={handleLogout} , onLogout

    //thêm sản phẩm vào giỏ hàng
    const handleClickAddToCartc = (plant) => {
        handleAddToCartc(plant);
    };
    const idStrings = ids.toString();
    //thêm sản phẩm vào giỏ hàng
    const handleAddToCartc = (plantId) => {
        const CartssAPI = 'http://localhost:3000/cart_bought';
        alert(CartssAPI);
        const newCart = {
            owner: idStrings,
            id_plant: plantId.id,
            image_represent: plantId.pic,
            name_product: plantId.name,
            price_bought: plantId.price_new,
            quantity: 1,
        };

        // Gửi request GET đến API để lấy dữ liệu hiện tại
        fetch(CartssAPI)
            .then((response) => response.json())
            .then((data) => {
                // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
                const existingCartItem = data.find((item) => item.owner === idString && item.id_plant === plantId.id);
                alert('1');
                if (existingCartItem) {
                    // Nếu sản phẩm đã tồn tại, tăng số lượng lên +1
                    const updatedCart = {
                        ...existingCartItem,
                        quantity: existingCartItem.quantity + 1,
                    };
                    alert('2');
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
                } else {
                    // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
                    alert('3');
                    fetch(CartssAPI, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newCart),
                    })
                        .then((response) => response.json())
                        .then((data) => {})
                        .catch((error) => console.error('Error fetching carts:', error));
                }
            })
            .catch((error) => console.error('Error fetching carts:', error));
    };

    //thêm sản phẩm vào giỏ hàng
    const handleClickAddToCart = (plant) => {
        handleAddToCart(plant);
    };
    const idString = id.toString();

    //thêm sản phẩm vào giỏ hàng
    const handleAddToCart = (plantId) => {
        const CartssAPI = 'http://localhost:3000/cart_bought';
        const newCart = {
            owner: idString,
            id_plant: plantId.id,
            image_represent: plantId.pic,
            name_product: plantId.name,
            price_bought: plantId.price_new,
            quantity: 1,
        };

        // Gửi request GET đến API để lấy dữ liệu hiện tại
        fetch(CartssAPI)
            .then((response) => response.json())
            .then((data) => {
                // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
                const existingCartItem = data.find((item) => item.owner === idString && item.id_plant === plantId.id);

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
                        .then((data) => {})
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
                        .then((data) => {})
                        .catch((error) => console.error('Error fetching carts:', error));
                }
            })
            .catch((error) => console.error('Error fetching carts:', error));
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
                <h3>CHI TIẾT SẢN PHẨM</h3>
                <FontAwesomeIcon icon={faTree} />
                <div className="icon-mid">
                    <FontAwesomeIcon icon={faSpa} />
                </div>
            </div>

            <div className="section_body_detail_product">
                <div className="section_left">
                    <div className="detail-product">
                        {plants.map((plant) => (
                            <>
                                <div className="detail-image">
                                    <img
                                        className="main-image"
                                        id="largeImage"
                                        src={plant.picture_main}
                                        alt="Large Image"
                                    ></img>
                                    <div className="list-extra-image">
                                        <img
                                            className="extra-image image-first"
                                            src={plant.picture_main}
                                            onClick={() => changeImage(plant.picture_main)}
                                        ></img>
                                        <img
                                            className="extra-image image-second"
                                            src={plant.picture_other_1}
                                            onClick={() => changeImage(plant.picture_other_1)}
                                        ></img>
                                        <img
                                            className="extra-image image-threee"
                                            src={plant.picture_other_2}
                                            onClick={() => changeImage(plant.picture_other_2)}
                                        ></img>
                                        <img
                                            className="extra-image image-four"
                                            src={plant.picture_other_3}
                                            onClick={() => changeImage(plant.picture_other_3)}
                                        ></img>
                                    </div>
                                </div>
                                <span className="seperate"> </span>
                                <div className="detail-content">
                                    <h3>{plant.name}</h3>

                                    <p className="info-product">
                                        Thông tin sản phẩm: img elements must have an alt prop, either with meaningful
                                        text, or an empty string for decorative images
                                    </p>

                                    <div className="price-product">
                                        <span style={{ color: 'green', marginRight: '12px' }}>Giá sản phẩm</span>
                                        <p className="real-price">{plant.price_new}</p>
                                        <p className="discount-price">
                                            <span> Giá cũ: {plant.price_old}</span>
                                        </p>
                                    </div>
                                    <div className="save-money">
                                        <p className="real-price">
                                            Tiết kiệm: <span>13%</span>
                                        </p>
                                        {/* <p className="discount-price">Giá cũ: <span>200000</span></p> */}
                                    </div>
                                    {/* <div className="review-product">
                                        <span>Đánh giá sản phẩm</span>
                                        <div className="start">
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                        </div>
                                    </div> */}
                                    <div style={{ display: 'flex' }}>
                                        <button
                                            className="add-product-detail"
                                            onClick={() => handleClickAddToCartc(plant)}
                                        >
                                            <FontAwesomeIcon icon={faCartShopping} /> Thêm vào giỏ hàng
                                        </button>
                                        <button className="view-product-detail">
                                            <FontAwesomeIcon icon={faCartShopping} />
                                            <a href={`http://localhost:2112/carts`}>Xem giỏ hàng</a>
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>

                    <div className="category-plants-product">
                        <div className="stemp-product">
                            <span>Yêu thích</span> <a href="/"> | xem tất cả</a>
                        </div>
                        <div className="list-plants-product">
                            {list_plant.map((list_plants) => (
                                <div className="detail-plant-product" key={list_plants.id}>
                                    <img src={list_plants.picture_main} alt="" />
                                    <h3>
                                        <a href={`/product?id=${list_plants.id}`}>{list_plants.name}</a>
                                    </h3>
                                    <div className="price-product">
                                        <div className="price-old-product">{list_plants.price_old}</div>
                                        <div className="price-new-product">{list_plants.price_new}</div>
                                    </div>
                                    <button
                                        class="add-product-product"
                                        onClick={() => handleClickAddToCart(list_plants)}
                                    >
                                        CHO VÀO GIỎ HÀNG
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="section_right">
                    <div className="services">
                        <div className="title_service">
                            <h4>Tiện ích cửa hàng</h4>
                        </div>
                        <div className="content-service">
                            <div className="detail-service">
                                <FontAwesomeIcon className="icon_service" icon={faClover} />
                                <p>Chính sách hoàn trả sau 3 ngày</p>
                            </div>
                            <div className="detail-service">
                                <FontAwesomeIcon className="icon_service" icon={faClover} />
                                <p>Chất lượng sản phẩm cao</p>
                            </div>
                            <div className="detail-service">
                                <FontAwesomeIcon className="icon_service" icon={faClover} />
                                <p>Nhận tạo dáng, chăm sóc cây trồng</p>
                            </div>
                            <div className="detail-service">
                                <FontAwesomeIcon className="icon_service" icon={faClover} />
                                <p>Miễn phí vận chuyển nội thành</p>
                            </div>
                        </div>
                    </div>
                    <div className="info_shop">
                        <div className="heading_shop">
                            <h4>Thông tin cửa hàng</h4>
                        </div>
                        <div className="detail_info">
                            <FontAwesomeIcon className="icon_info" icon={faHouse} />
                            <p>Chi nhánh A - Địa chỉ: Số 123, Đường ABC, Quận XYZ</p>
                        </div>
                        <div className="detail_info">
                            <FontAwesomeIcon className="icon_info" icon={faHouse} />
                            <p>Chi nhánh A - Địa chỉ: Số 123, Đường ABC, Quận XYZ</p>
                        </div>
                        <div className="detail_info">
                            <FontAwesomeIcon className="icon_info" icon={faHouse} />
                            <p>Chi nhánh A - Địa chỉ: Số 123, Đường ABC, Quận XYZ</p>
                        </div>
                        <div className="detail_info">
                            <FontAwesomeIcon className="icon_info" icon={faHouse} />
                            <p>Chi nhánh A - Địa chỉ: Số 123, Đường ABC, Quận XYZ</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Product;
