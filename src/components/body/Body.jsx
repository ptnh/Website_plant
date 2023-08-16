import './body.scss';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
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
import { createApiCart, readApiCart, readApiPlant, updateApiCart } from '~/Api';
// import Notification from './notification/Notification';

const Body = ({ username, id, onCartUpdate }) => {
    const navigate = useNavigate();
    // chứa thông tin danh sách hàng
    const [plants1, setPlants1] = useState([]);
    const [plants2, setPlants2] = useState([]);
    const [plants3, setPlants3] = useState([]);
    const [plants4, setPlants4] = useState([]);
    //lấy data truyền vào plants
    useEffect(() => {
        fetch(`${readApiPlant}?type_plant=Cay_De_Ban`)
            .then((response) => response.json())
            .then((data) => setPlants1(data));
    }, []);
    useEffect(() => {
        fetch(`${readApiPlant}?type_plant=Cay_May_Man`)
            .then((response) => response.json())
            .then((data) => setPlants2(data));
    }, []);
    useEffect(() => {
        fetch(`${readApiPlant}?type_plant=Cay_Noi_That`)
            .then((response) => response.json())
            .then((data) => setPlants3(data));
    }, []);
    useEffect(() => {
        fetch(`${readApiPlant}?type_plant=Cay_Thuy_Sinh`)
            .then((response) => response.json())
            .then((data) => setPlants4(data));
    }, []);

    const comment = document.querySelector('.detail-plant');

    const [translateX1, setTranslateX1] = useState(0);
    const [count1, setCount1] = useState(0);

    const [translateX2, setTranslateX2] = useState(0);
    const [count2, setCount2] = useState(0);

    const [translateX3, setTranslateX3] = useState(0);
    const [count3, setCount3] = useState(0);

    const [translateX4, setTranslateX4] = useState(0);
    const [count4, setCount4] = useState(0);
    // xử lý di chuyển chọn lựa sản phẩm sang phải
    const handleNext1 = () => {
        if (count1 === plants1.length - 4) {
            setCount1(count1);
        } else {
            setTranslateX1(translateX1 - 300);
            setCount1(count1 + 1);
        }
    };

    // xử lý di chuyển chọn lựa sản phẩm sang trái
    const handlePrev1 = () => {
        if (count1 === 0) {
            setTranslateX1(translateX1 + 0);
        } else {
            setTranslateX1(translateX1 + 300);
            setCount1(count1 - 1);
        }
    };

    // xử lý di chuyển chọn lựa sản phẩm sang phải
    const handleNext2 = () => {
        if (count2 === plants2.length - 4) {
            setCount2(count2);
        } else {
            setTranslateX2(translateX2 - 300);
            setCount2(count2 + 1);
        }
    };

    // xử lý di chuyển chọn lựa sản phẩm sang trái
    const handlePrev2 = () => {
        if (count2 === 0) {
            setTranslateX2(translateX2 + 0);
        } else {
            setTranslateX2(translateX2 + 300);
            setCount2(count2 - 1);
        }
    };
    // xử lý di chuyển chọn lựa sản phẩm sang phải
    const handleNext3 = () => {
        if (count3 === plants3.length - 4) {
            setCount3(count3);
        } else {
            setTranslateX3(translateX3 - 300);
            setCount3(count3 + 1);
        }
    };

    // xử lý di chuyển chọn lựa sản phẩm sang trái
    const handlePrev3 = () => {
        if (count3 === 0) {
            setTranslateX3(translateX3 + 0);
        } else {
            setTranslateX3(translateX3 + 300);
            setCount3(count3 - 1);
        }
    };
    // xử lý di chuyển chọn lựa sản phẩm sang phải
    const handleNext4 = () => {
        if (count4 === plants4.length - 4) {
            setCount4(count4);
        } else {
            setTranslateX4(translateX4 - 300);
            setCount4(count4 + 1);
        }
    };

    // xử lý di chuyển chọn lựa sản phẩm sang trái
    const handlePrev4 = () => {
        if (count4 === 0) {
            setTranslateX4(translateX4 + 0);
        } else {
            setTranslateX4(translateX4 + 300);
            setCount4(count4 - 1);
        }
    };
    //thêm sản phẩm vào giỏ hàng
    const handleClickAddToCart = (plant) => {
        if(idString === ''){
            alert('Bạn chưa đăng nhập');
            navigate('/login');
        } else {
            handleAddToCart(plant);
        }
    };
    const idString = id.toString();
    //thêm sản phẩm vào giỏ hàng

    const handleAddToCart = (plantId) => {
        // Gửi request GET đến API để lấy dữ liệu hiện tại
        let count = 0;
        fetch(readApiCart)
            .then((response) => response.json())
            .then((data) => {
                const existingCartItem = data.find(
                    (item) => item.id_owner === idString && item.id_plant === plantId.id,
                );
                if (existingCartItem) {
                    count = parseInt(existingCartItem.quantity, 10);
                    count = count + 1;
                    const formData2 = new FormData();
                    // formData2.append('id_cart', NULL);
                    formData2.append('id_owner', idString);
                    formData2.append('id_plant', plantId.id);
                    formData2.append('name_product', plantId.name);
                    formData2.append('image_represent', plantId.picture_main);
                    formData2.append('price_product', plantId.price_new);
                    formData2.append('quantity', count);
                    fetch(updateApiCart, {
                        method: 'POST',
                        body: formData2,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            setMessage('Thêm vào giỏ hàng thành công!');
                        })
                        .catch((error) => console.error('Error updating cart item:', error));
                } else {
                    const formData2 = new FormData();
                    // formData2.append('id_cart', NULL);
                    formData2.append('id_owner', idString);
                    formData2.append('id_plant', plantId.id);
                    formData2.append('name_product', plantId.name);
                    formData2.append('image_represent', plantId.picture_main);
                    formData2.append('price_product', plantId.price_new - (plantId.price_new * plantId.discount) / 100);
                    formData2.append('quantity', 1);

                    fetch(createApiCart, {
                        method: 'POST',
                        body: formData2,
                    })
                        .then((response) => {
                            if (response.ok) {
                                setMessage('Thêm vào giỏ hàng thành công!');
                            } else {
                                throw new Error('Có lỗi xảy ra khi thêm sản phẩm.');
                            }
                        })
                        .catch((error) => console.error('Error deleting product:', error));
                }
                setMessage('');
            });
        onCartUpdate();
    };
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (message) {
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
            }, 1000); // Hiển thị trong 1 giây
        }
    }, [message]);

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

            <div className="category-plants" id="CAY_MAY_MAN">
                <div className="stemp">
                    <span>Cây may mắn</span>
                </div>
                <div className="list-plants">
                    <button className="arrow-button left-button" onClick={handlePrev2}>
                        <FontAwesomeIcon className="icons-left" icon={faArrowLeft} />
                    </button>
                    <div className="detail-plant-container" style={{ transform: `translateX(${translateX2}px)` }}>
                        {plants2.map((plant) => (
                            <div key={plant.id} className="detail-plant">
                                <img className="custom-image" src={plant.picture_main} alt="" />
                                <h3>
                                    <a href={`/product?id=${plant.id}`}>{plant.name}</a>
                                </h3>
                                <div className="price">
                                    <div className={` ${plant.discount > 0 ? 'price-old' : 'hidden_discount'}`}>
                                        {' '}
                                        {plant.discount > 0 ? `${plant.discount}%` : ''}
                                    </div>
                                    <div className={` ${plant.discount > 0 ? 'price-discount' : 'hidden_discount'}`}>
                                        {plant.price_new} VND
                                    </div>
                                    <div className={` ${plant.discount == 0 ? 'price-new' : 'price-new'}`}>
                                        {plant.price_new - (plant.price_new * plant.discount) / 100} VND
                                    </div>
                                </div>
                                <button class="add-product" onClick={() => handleClickAddToCart(plant)}>
                                    <p>THÊM VÀO GIỎ HÀNG</p>
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="arrow-button right-button" onClick={handleNext2}>
                        <FontAwesomeIcon className="icons-right" icon={faArrowRight} />
                    </button>
                </div>
            </div>

            <div className="category-plants" id="CAY_NOI_THAT">
                <div className="stemp">
                    <span>Cây nội thất</span>
                </div>
                <div className="list-plants">
                    <button className="arrow-button left-button" onClick={handlePrev3}>
                        <FontAwesomeIcon className="icons-left" icon={faArrowLeft} />
                    </button>
                    <div className="detail-plant-container" style={{ transform: `translateX(${translateX3}px)` }}>
                        {plants3.map((plant) => (
                            <div key={plant.id} className="detail-plant">
                                <img className="custom-image" src={plant.picture_main} alt="" />
                                <h3>
                                    <a href={`/product?id=${plant.id}`}>{plant.name}</a>
                                </h3>
                                <div className="price">
                                    <div className={` ${plant.discount > 0 ? 'price-old' : 'hidden_discount'}`}>
                                        {' '}
                                        {plant.discount > 0 ? `${plant.discount}%` : ''}
                                    </div>
                                    <div className={` ${plant.discount > 0 ? 'price-discount' : 'hidden_discount'}`}>
                                        {plant.price_new} VND
                                    </div>
                                    <div className={` ${plant.discount == 0 ? 'price-new' : 'price-new'}`}>
                                        {plant.price_new - (plant.price_new * plant.discount) / 100} VND
                                    </div>
                                </div>
                                <button class="add-product" onClick={() => handleClickAddToCart(plant)}>
                                    <p>THÊM VÀO GIỎ HÀNG</p>
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="arrow-button right-button" onClick={handleNext3}>
                        <FontAwesomeIcon className="icons-right" icon={faArrowRight} />
                    </button>
                </div>
            </div>

            <div className="category-plants" id="CAY_THUY_SINH">
                <div className="stemp">
                    <span>Cây thủy sinh</span>
                </div>
                <div className="list-plants">
                    <button className="arrow-button left-button" onClick={handlePrev4}>
                        <FontAwesomeIcon className="icons-left" icon={faArrowLeft} />
                    </button>
                    <div className="detail-plant-container" style={{ transform: `translateX(${translateX4}px)` }}>
                        {plants4.map((plant) => (
                            <div key={plant.id} className="detail-plant">
                                <img className="custom-image" src={plant.picture_main} alt="" />
                                <h3>
                                    <a href={`/product?id=${plant.id}`}>{plant.name}</a>
                                </h3>
                                <div className="price">
                                    <div className={` ${plant.discount > 0 ? 'price-old' : 'hidden_discount'}`}>
                                        {' '}
                                        {plant.discount > 0 ? `${plant.discount}%` : ''}
                                    </div>
                                    <div className={` ${plant.discount > 0 ? 'price-discount' : 'hidden_discount'}`}>
                                        {plant.price_new} VND
                                    </div>
                                    <div className={` ${plant.discount == 0 ? 'price-new' : 'price-new'}`}>
                                        {plant.price_new - (plant.price_new * plant.discount) / 100} VND
                                    </div>
                                </div>
                                <button class="add-product" onClick={() => handleClickAddToCart(plant)}>
                                    <p>THÊM VÀO GIỎ HÀNG</p>
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="arrow-button right-button" onClick={handleNext4}>
                        <FontAwesomeIcon className="icons-right" icon={faArrowRight} />
                    </button>
                </div>
            </div>

            <div className="category-plants" id="CAY_DE_BAN">
                <div className="stemp">
                    <span>Cây để bàn</span>
                </div>
                <div className="list-plants">
                    <button className="arrow-button left-button" onClick={handlePrev1}>
                        <FontAwesomeIcon className="icons-left" icon={faArrowLeft} />
                    </button>
                    <div className="detail-plant-container" style={{ transform: `translateX(${translateX1}px)` }}>
                        {plants1.map((plant) => (
                            <div key={plant.id} className="detail-plant">
                                <img className="custom-image" src={plant.picture_main} alt="" />
                                <h3>
                                    <a href={`/product?id=${plant.id}`}>{plant.name}</a>
                                </h3>
                                <div className="price">
                                    <div className={` ${plant.discount > 0 ? 'price-old' : 'hidden_discount'}`}>
                                        {' '}
                                        {plant.discount > 0 ? `${plant.discount}%` : ''}
                                    </div>
                                    <div className={` ${plant.discount > 0 ? 'price-discount' : 'hidden_discount'}`}>
                                        {plant.price_new} VND
                                    </div>
                                    <div className={` ${plant.discount == 0 ? 'price-new' : 'price-new'}`}>
                                        {plant.price_new - (plant.price_new * plant.discount) / 100} VND
                                    </div>
                                </div>
                                <button class="add-product" onClick={() => handleClickAddToCart(plant)}>
                                    <p>THÊM VÀO GIỎ HÀNG</p>
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="arrow-button right-button" onClick={handleNext1}>
                        <FontAwesomeIcon className="icons-right" icon={faArrowRight} />
                    </button>
                </div>
            </div>

            {visible ? (
                <div className="info_status_cart">
                    <h3>{message}</h3>
                </div>
            ) : null}
        </>
    );
};

export default Body;
