import Header from '~/components/header/Header';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '~/components/footer/Footer';
import './product.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faClover, faHouse, faSpa, faStar, faTree } from '@fortawesome/free-solid-svg-icons';
import { createApiCart, createApiComment, readApiCart, readApiComment, readApiPlant, updateApiCart } from '~/Api';

function Product({ isLoggedIn, username, ids, onCartUpdate }) {
    // Lấy giá trị id từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const navigate = useNavigate();
    // chứa thông tin danh sách hàng
    const [plants, setPlants] = useState([]);

    // Gửi yêu cầu API hoặc truy vấn cơ sở dữ liệu để lấy dữ liệu dựa vào giá trị id
    useEffect(() => {
        fetch(`${readApiPlant}?id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                // Lọc các cây theo loại và lưu vào state
                const type_Plant = data.filter((plant) => setType_Plant(plant.type_plant));

                // Lưu danh sách cây và danh sách cây theo loại vào state
                setPlants(data);
            });
    }, []);

    // chứa thông tin danh sách hàng
    const [list_plants, setListPlants] = useState([]);
    const [type_plant, setType_Plant] = useState(''); // Đặt giá trị mặc định cho type_plant

    useEffect(() => {
        if (type_plant !== '') {
            // Đảm bảo type_plant đã có giá trị trước khi fetch
            fetch(`${readApiPlant}?type_plant=${type_plant}`)
                .then((response) => response.json())
                .then((data) => setListPlants(data));
        }
    }, [type_plant]); // Theo dõi sự thay đổi của type_plant để kích hoạt useEffect

    function changeImage(imagePath) {
        var largeImage = document.getElementById('largeImage');
        largeImage.src = imagePath;
    }
    const idString = ids.toString();
    //thêm sản phẩm vào giỏ hàng
    const handleClickAddToCart = (plant) => {
        if (idString === '') {
            alert('Bạn chưa đăng nhập');
            navigate('/login');
        } else {
            handleAddToCart(plant);
        }
    };

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
                            setMessage('Sản phẩm đã được thêm vào giỏ hàng thành công!');
                        })
                        .catch((error) => console.error('Error updating cart item:', error));
                } else {
                    const formData2 = new FormData();
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
                                // updateCarts(); //gọi hàm update giỏ hàng
                                setMessage('Sản phẩm đã được thêm vào giỏ hàng thành công!');
                            } else {
                                throw new Error('Có lỗi xảy ra khi xóa sản phẩm.');
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
            }, 1000); // Hiển thị trong 3 giây
        }
    }, [message]);

    const [content, setContent] = useState('');
    const [starts, setStarts] = useState(5);
    //thêm nhận xét đánh giá sản phẩm
    const handleCreateComment = () => {
        if (idString === '') {
            alert('Bạn chưa đăng nhập');
            navigate('/login');
        } else {
            const formData2 = new FormData();
            formData2.append('id_owner', ids);
            formData2.append('id_plant', id);
            formData2.append('content', content);
            formData2.append('start', starts);
            if (content === '') {
                alert('Bạn chưa nhập bình luận');
            } else {
                fetch(createApiComment, {
                    method: 'POST',
                    body: formData2,
                })
                    .then((response) => {
                        if (response.ok) {
                        } else {
                            throw new Error('Có lỗi xảy ra khi thêm bình luận.');
                        }
                    })
                    .catch((error) => console.error('Error add comment:', error));

                setReloadComment(true);
            }
        }
    };

    // lấy danh sách đánh giá theo mã sản phẩm
    const [comments, setComments] = useState([]);
    const [reloadComment, setReloadComment] = useState(false);
    useEffect(() => {
        fetch(`${readApiComment}?id_plant=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setComments(data);
                setReloadComment(false);
            });
    }, [reloadComment]);

    const [avgStart, setAvgStart] = useState(null);
    useEffect(() => {
        fetch(`${readApiComment}?id_plants=${id}`)
            .then((response) => response.json())
            .then((data) => {
                let totalStart = 0;

                for (const comment of data) {
                    totalStart += parseFloat(comment.sosao); // Chuyển sosao từ chuỗi sang số để tính toán
                }
                let totalSl = 0;

                for (const comment of data) {
                    totalSl += parseFloat(comment.sl); // Chuyển sosao từ chuỗi sang số để tính toán
                }
                console.log(totalSl);
                const averageStart = totalSl > 0 ? totalStart / totalSl : 0;
                const formattedAvgStart = averageStart.toFixed(1); // Định dạng có 1 chữ số sau dấu phẩy
                setAvgStart(formattedAvgStart);
                setReloadComment(false);
            });
    }, [reloadComment]);

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
                                        Cây cảnh toát lên vẻ đẹp tự nhiên, kết hợp hình dáng, màu sắc và sự sống, làm
                                        tươi mới mọi không gian.
                                    </p>

                                    <div className="price-product">
                                        <div className="real-price">
                                            <span style={{ color: 'green', marginRight: '12px' }}>Giá sản phẩm</span>
                                            <p>{plant.price_new - (plant.price_new * plant.discount) / 100} VND</p>
                                        </div>

                                        <p className="discount-price">
                                            <span> Giá cũ: {plant.price_new} VND</span>
                                        </p>
                                    </div>
                                    <div className="save-money">
                                        <p>
                                            Tiết kiệm: <span>{plant.discount}%</span>
                                        </p>
                                        {/* <p className="discount-price">Giá cũ: <span>200000</span></p> */}
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <button
                                            className="add-product-detail"
                                            onClick={() => handleClickAddToCart(plant)}
                                        >
                                            <FontAwesomeIcon icon={faCartShopping} /> Thêm vào giỏ hàng
                                        </button>
                                        {idString === '' ? null : (
                                            <button className="view-product-detail">
                                                <FontAwesomeIcon icon={faCartShopping} />
                                                <a href={`/carts`}>Xem giỏ hàng</a>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>

                    <div className="category-plants-product">
                        <div id="comment" class="product__reviews">
                            <h3 class="product__reviews-title desc-title">Đánh giá sản phẩm</h3>
                            <div class="box-rating">
                                <div class="average-rating">
                                    <h4>Trung bình đánh giá:</h4>
                                    <div className="aver-rating">
                                        <span class="rating center">{avgStart}/5</span>
                                        <div class="star center">
                                            <FontAwesomeIcon className="icon_service" icon={faClover} />
                                            <FontAwesomeIcon className="icon_service" icon={faClover} />
                                            <FontAwesomeIcon className="icon_service" icon={faClover} />
                                            <FontAwesomeIcon className="icon_service" icon={faClover} />
                                            <FontAwesomeIcon className="icon_service" icon={faClover} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="box-form">
                                <div enctype="multipart/form-data">
                                    <div class="selectStar">
                                        <span>
                                            5 <FontAwesomeIcon className="icon_service" icon={faClover} />
                                        </span>
                                        <select
                                            name="star_select"
                                            id="star_select"
                                            onChange={(e) => setStarts(e.target.value)}
                                        >
                                            <option value="5">5 sao</option>
                                            <option value="4">4 sao</option>
                                            <option value="3">3 sao</option>
                                            <option value="2">2 sao</option>
                                            <option value="1">1 sao</option>
                                        </select>
                                    </div>
                                    <input
                                        class="item2"
                                        name="text"
                                        type="text"
                                        placeholder="Nhập đánh giá sản phẩm..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                    <button class="item3" id="comment" name="comment" onClick={handleCreateComment}>
                                        Gửi
                                    </button>
                                </div>
                            </div>
                            <div class="box_review">
                                <div class="box-content">
                                    {comments.map((comment) => (
                                        <div class="box-item">
                                            <div class="avatar">
                                                <span></span>
                                            </div>
                                            <div class="comment">
                                                <span class="user-name">{comment.name_client}</span>
                                                <div class="star-cmt">
                                                    <span class="rating">
                                                        {comment.start}{' '}
                                                        <FontAwesomeIcon className="icon_service" icon={faClover} />
                                                    </span>
                                                    <span class="comment-container">{comment.content}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
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
            {visible ? (
                <div className="info_status_cart">
                    <h3>{message}</h3>
                </div>
            ) : null}
            <Footer />
        </>
    );
}

export default Product;
