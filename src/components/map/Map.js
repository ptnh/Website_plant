import React from 'react';
import './map.scss';

function Map() {
    return (
        <>
            <div className="container">
                <div className="map_container">
                    <div className="map-responsive">
                    <iframe className="map_shop"
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9901.401020407884!2d106.61601079799645!3d11.255692915434704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174ca09ec0a66ed%3A0xdae46b5d6a5f45c8!2zQsOgdSBCw6BuZywgQsOsbmggRMawxqFuZywgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1690451867712!5m2!1svi!2s`}></iframe>
                    </div>
                    
                </div>
                <div className="info_contact">
                    <h2>Thông tin liên hệ cửa hàng</h2>
                    <div className="contact-info">
                        <div className="info-item">
                            <h3>Địa chỉ cửa hàng:</h3>
                            <p>Đường Tô Ký, Phường Tân Chánh Hiệp, Quận 12, TP Hồ Chí Minh</p>
                        </div>
                        <div className="info-item">
                            <h3>Số điện thoại:</h3>
                            <p>(+84) 332 212 903</p>
                        </div>
                        <div className="info-item">
                            <h3>Email:</h3>
                            <p>2051120229@.ut.edu.vn</p>
                        </div>
                        <div className="info-item">
                            <h3>Giờ mở cửa:</h3>
                            <p>Từ Thứ 2 đến Thứ 6: 8:00 AM - 6:00 PM</p>
                            <p>Thứ 7 và Chủ Nhật: 9:00 AM - 4:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Map;
