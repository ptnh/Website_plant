import React, { useState, useEffect } from 'react';
import './introduce.scss';
import Footer from '~/components/footer/Footer';
const Introduce = ({ isLoggedIn, username, id, onLogout }) => {
    return (
        <>
            {/* <Header /> */}

            <div className="container_introduce">
                <img className="image_background" src="background_!.jpg"></img>

                <div className="section_introduce_first">
                    <h3>Chào mừng bạn đến với trang web "Cây Cảnh"!</h3>
                    <p>
                        Chúng tôi tự hào là địa chỉ đáng tin cậy cho những người yêu thích và đam mê cây cảnh tại Việt
                        Nam. Trang web của chúng tôi mang đến cho bạn một thế giới đa dạng và phong phú về cây cảnh, từ
                        những loại cây trang nhã và sang trọng cho đến các loại cây dễ chăm sóc, phù hợp với mọi không
                        gian.
                    </p>
                    <img src="logo.jpg"></img>
                </div>
                <div className="section_introduce_second">
                    <h3>Những sản phẩm mà vườn cây cảnh đang kinh doanh</h3>
                    <p>
                        Hiện tại, đa phần chúng tôi sẽ chuyên kinh doanh các loại cá cảnh hiện đang có trên thị trường
                        TPHCM để đáp ứng nhu cầu của bất kỳ ai và luôn đảm bảo đẹp và đủ kiểu để mọi người lựa chọn.
                        Đồng thời, không chỉ có cây cảnh thôi mà cây cảnh còn cung cấp các dòng sản phẩm để hỗ trợ người
                        mua như: phân bón, tiểu cảnh cây, chậu cây. Tất cả những sản phẩm này đều được đảm bảo về chất
                        lượng lẫn kiểu mẫu.
                    </p>
                    <img src="background.jpg"></img>
                </div>
                <div className="section_introduce_third">
                    <h3>Mục tiêu phát triển của của vườn cây cảnh</h3>
                    <p>
                        Bất kỳ một cửa hàng, doanh nghiệp, hoặc tổ chức nào khi kinh doanh cũng đều có mục tiêu phát
                        triển riêng của mình, và những mục tiêu mà chúng tôi hướng đến sẽ như sau: - Mục tiêu 1: Mang
                        đến cho khách hàng những chậu cây đẹp, chất lượng nhất để đáp ứng niềm đam mê cũng như thú vui
                        để làm đẹp cho căn hộ của khách hàng. Đi kèm với đó là chất lượng sản phẩm, dịch vụ hiện đang
                        được triển khai luôn đảm bảo một cách trọn vẹn nhất. - Mục tiêu 2: Ngày càng hoàn thiện hơn về
                        khâu hỗ trợ và xử lý những đơn hàng được đặt Online tại Website và sẽ tối giản hóa các thao tác
                        từ tiếp nhận và gửi cây cảnh hoặc các sản phẩm đang kinh doanh của Hệ thống cửa hàng cung cấp
                        cây. - Mục tiêu 3: Trở thành một trong những cửa hàng chuyên cung cấp cá cảnh,tại Tân Bình, Quận
                        12 và toàn TPHCM. Là nơi có chất lượng hồ cá cảnh, thi công bể cá hải sản đảm bảo chất lượng
                        nhất TPHCM.
                    </p>
                    <h3>Một số dịch vụ đi kèm tại vườn cây cảnh Sài Gòn</h3>
                    <p>
                        Trong quá trình hoạt động thì chúng tôi cũng đã mở rộng sang các hình thức dịch vụ đa dạng để hỗ
                        trợ khách hàng như sau: + Thi công thiết kế vườn nhà + cây cảnh treo nhà các loại + Cây cảnh
                        công trình Tất cả những dịch vụ này đang được vườn cây Cảnh Sài Gòn ( TPHCM ) mở rộng nhằm đáp
                        ứng nhu cầu của người sử dụng. Trong suốt quá trình triển khai thì cũng đã nhận được rất nhiều
                        những phản hồi tích cực. Đây là một trong những niềm vui của chúng tôi trong thời gian hoạt động
                        tính đến thời điểm hiện tại.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Introduce;
