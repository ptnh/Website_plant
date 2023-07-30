import './body.scss';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
    faChildReaching,
    faCircleXmark,
    faHeart,
    faLeaf,
    faMagnifyingGlass,
    faMoneyBillTrendUp,
    faSpinner,
    faArrowRight,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

const Body = ({ username, id }) => {
    const plantsAPI = 'http://localhost:3000/plants_home';

    // chứa thông tin danh sách hàng
    const [plants, setPlants] = useState([]);
    //lấy data truyền vào plants
    useEffect(() => {
        fetch(plantsAPI)
            .then((response) => response.json())
            .then((data) => setPlants(data));
    }, []);

    const limitedPlants = plants.slice(0, 4); // Giới hạn chỉ lấy 4 phần tử đầu tiên

    const comment = document.querySelector('.detail-plant');

    const [translateX, setTranslateX] = useState(0);
    const [count, setCount] = useState(0);

    // xử lý di chuyển chọn lựa sản phẩm sang phải
    const handleNext = () => {
        if (count === plants.length - 4) {
            setCount(count);
        } else {
            setTranslateX(translateX - 300);
            setCount(count + 1);
        }
    };

    // xử lý di chuyển chọn lựa sản phẩm sang trái
    const handlePrev = () => {
        if (count === 0) {
            setTranslateX(translateX + 0);
        } else {
            setTranslateX(translateX + 300);
            setCount(count - 1);
        }
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
            <div className="body_first">
                <img src="background.jpg" alt="" />
                <div className="benefit">
                    <h2>Lợi ích mua cây</h2>
                    <div className="list-benefit">
                        <div className="item-benefit">
                            <FontAwesomeIcon className="icons" icon={faHeart} />
                            <div className="content">
                                <h3>Tạo cảm giác thoải mái</h3>
                                <p>
                                    Chăm sóc cây trồng giúp bạn thư giãn. Từ đó, sẽ giảm thiểu được những sự mệt mỏi về
                                    tinh thần, hưng phấn hơn,vui vẻ hơn.
                                </p>
                            </div>
                        </div>
                        <div className="item-benefit">
                            <FontAwesomeIcon className="icons" icon={faChildReaching} />
                            <div className="content">
                                <h3>Sức khỏe</h3>
                                <p>
                                    Có thêm cây xanh trong nhà, góp phần không nhỏ trong việc bảo vệ sức khỏe mọi người
                                    trong nhà.
                                </p>
                            </div>
                        </div>
                        <div className="item-benefit">
                            <FontAwesomeIcon className="icons" icon={faMoneyBillTrendUp} />
                            <div className="content">
                                <h3>Thu hút tài lộc</h3>
                                <p>
                                    Ngoài việc làm đẹp cho ngôi nhà của bạn, cây cảnh còn có ý nghĩa rất lớn về mặt
                                    phong thủy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* dự kiến sẽ bỏ vì không tính được cách số lượng sản phẩm đã bán tất cả  */}
            {/* <div className="best-seller">
                <div className="title">
                    <FontAwesomeIcon className="icon-best-seller" icon={faLeaf} />
                    <h4>SẢN PHẨM BÁN CHẠY</h4>
                    <FontAwesomeIcon className="icon-best-seller" icon={faLeaf} />
                </div>
                <div className="product">
                    <div className="contetn-product">
                        <img src="sen-da-mini.jpg" alt="" />
                        <div className="content">
                            <h3>Tên sản phẩm</h3>
                            <h3>Giá sản phẩm</h3>
                            <div className="add-product-bestseler">
                                <button className="btn-add-product-bestseler" href="">Cho vào giỏ hàng</button>
                            </div>
                        </div>
                    </div>
                    <div className="contetn-product">
                        <img src="sen-da-mini.jpg" alt="" />
                        <div className="content">
                            <h3>Tên sản phẩm</h3>
                            <h3>Giá sản phẩm</h3>
                            <div className="add-product-bestseler">
                                <button className="btn-add-product-bestseler" href="">Cho vào giỏ hàng</button>
                            </div>
                        </div>
                    </div><div className="contetn-product">
                        <img src="sen-da-mini.jpg" alt="" />
                        <div className="content">
                            <h3>Tên sản phẩm</h3>
                            <h3>Giá sản phẩm</h3>
                            <div className="add-product-bestseler">
                                <button className="btn-add-product-bestseler" href="">Cho vào giỏ hàng</button>
                            </div>
                        </div>
                    </div><div className="contetn-product">
                        <img src="sen-da-mini.jpg" alt="" />
                        <div className="content">
                            <h3>Tên sản phẩm</h3>
                            <h3>Giá sản phẩm</h3>
                            <div className="add-product-bestseler">
                                <button className="btn-add-product-bestseler" href="">Cho vào giỏ hàng</button>
                            </div>
                        </div>
                    </div><div className="contetn-product">
                        <img src="sen-da-mini.jpg" alt="" />
                        <div className="content">
                            <h3>Tên sản phẩm</h3>
                            <h3>Giá sản phẩm</h3>
                            <div className="add-product-bestseler">
                                <button className="btn-add-product-bestseler" href="">Cho vào giỏ hàng</button>
                            </div>
                        </div>
                    </div><div className="contetn-product">
                        <img src="sen-da-mini.jpg" alt="" />
                        <div className="content">
                            <h3>Tên sản phẩm</h3>
                            <h3>Giá sản phẩm</h3>
                            <div className="add-product-bestseler">
                                <button className="btn-add-product-bestseler" href="">Cho vào giỏ hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="category-plants">
                <div className="stemp">
                    <span>Yêu thích</span>
                </div>
                <div className="list-plants">
                    <button className="arrow-button left-button" onClick={handlePrev}>
                        <FontAwesomeIcon className="icons-left" icon={faArrowLeft} />
                    </button>
                    <div className="detail-plant-container" style={{ transform: `translateX(${translateX}px)` }}>
                        {plants.map((plant) => (
                            <div key={plant.id} className="detail-plant">
                                <img class="custom-image" src={plant.picture_main} alt="" />
                                <h3>
                                    <a href={`/product?id=${plant.id}`}>{plant.name}</a>
                                </h3>
                                <div className="price">
                                    <div className="price-old">{plant.price_old}</div>
                                    <div className="price-new">{plant.price_new}</div>
                                </div>
                                <button class="add-product" onClick={() => handleClickAddToCart(plant)}>
                                    CHO VÀO GIỎ HÀNG
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="arrow-button right-button" onClick={handleNext}>
                        <FontAwesomeIcon className="icons-right" icon={faArrowRight} />
                    </button>
                </div>
            </div>

            <div className="category-plants">
                <div className="stemp">
                    <span>Yêu thích</span>
                </div>
                <div className="list-plants">
                    <button className="arrow-button left-button" onClick={handlePrev}>
                        <FontAwesomeIcon className="icons-left" icon={faArrowLeft} />
                    </button>
                    <div className="detail-plant-container" style={{ transform: `translateX(${translateX}px)` }}>
                        {plants.map((plant) => (
                            <div key={plant.id} className="detail-plant">
                                <img class="custom-image" src={plant.picture_main} alt="" />
                                <h3>
                                    <a href={`/product?id=${plant.id}`}>{plant.name}</a>
                                </h3>
                                <div className="price">
                                    <div className="price-old">{plant.price_old}</div>
                                    <div className="price-new">{plant.price_new}</div>
                                </div>
                                <button class="add-product" onClick={() => handleClickAddToCart(plant)}>
                                    CHO VÀO GIỎ HÀNG
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="arrow-button right-button" onClick={handleNext}>
                        <FontAwesomeIcon className="icons-right" icon={faArrowRight} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Body;
