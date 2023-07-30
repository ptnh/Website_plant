import React from 'react';
import Footer from '~/components/footer/Footer';
import './policy.scss';
function Policy() {
    return (
        <>
            <div className="container_policy">
                <div class="carousel-item">
                    <div class="box">
                        <div class="client_info">
                            <div class="client_name">
                                <h5>Điều kiện đổi hàng</h5>
                            </div>
                        </div>
                        Chúng tôi xin trình bày những điều kiện đổi hàng (cây cảnh) của chúng tôi nhằm đảm bảo quyền lợi
                        và sự hài lòng của khách hàng. Vui lòng đọc kỹ và hiểu rõ các điều khoản sau đây trước khi tiến
                        hành đổi hàng. Điều kiện đổi hàng dưới đây áp dụng cho các trường hợp đổi hàng do lỗi sản xuất
                        hoặc vấn đề kỹ thuật, và không bao gồm việc đổi hàng do yêu cầu cá nhân của khách hàng.
                        <div className="option_1">
                            <h6>1. Thời gian đổi hàng:</h6>
                            <p className="content_option_1">
                                Khách hàng có quyền đổi hàng trong vòng 7 ngày kể từ ngày nhận sản phẩm. Sản phẩm cần
                                được giữ nguyên tình trạng ban đầu, không hư hỏng, không sử dụng, và phải còn đầy đủ tem
                                nhãn, bao bì, phụ kiện đi kèm.
                            </p>
                        </div>
                        <div className="option_2">
                            <h6>2. Điều kiện chấp nhận đổi hàng:</h6>
                            <p className="content_option_2">
                                Cây cảnh đổi phải còn sống, không bị héo úa hoặc tổn thương do vận chuyển hoặc bảo quản
                                không đúng cách. Cây cảnh phải được trả về cùng với hóa đơn mua hàng hoặc chứng từ xác
                                nhận giao hàng.
                            </p>
                        </div>
                        <div className="option_3">
                            <h6>3. Quy trình đổi hàng:</h6>
                            <p className="content_option_3">
                                Khách hàng có nhu cầu đổi hàng vui lòng liên hệ với bộ phận chăm sóc khách hàng của
                                chúng tôi qua số điện thoại hoặc email được cung cấp trên hóa đơn mua hàng. Chúng tôi sẽ
                                yêu cầu khách hàng cung cấp thông tin về sản phẩm và nguyên nhân đổi hàng để kiểm tra và
                                xác nhận yêu cầu. Sau khi xác nhận đủ điều kiện đổi hàng, chúng tôi sẽ hỗ trợ khách hàng
                                về quy trình trả hàng và cung cấp thông tin về sản phẩm thay thế (nếu có). Việc đổi hàng
                                sẽ được tiến hành sau khi nhận được sản phẩm trả về và xác nhận tình trạng của cây cảnh.
                            </p>
                        </div>
                        <div className="option_4">
                            <h6>4. Phí vận chuyển đổi hàng:</h6>
                            <p className="content_option_4">
                                Trong trường hợp đổi hàng do lỗi sản xuất hoặc vấn đề kỹ thuật, chúng tôi sẽ chịu trách
                                nhiệm và chi trả các khoản phí vận chuyển liên quan. Trường hợp khách hàng muốn đổi hàng
                                do yêu cầu cá nhân, phí vận chuyển đổi hàng sẽ do khách hàng tự chi trả.
                            </p>
                        </div>
                        <div className="option_5">
                            <h6>5. Chính sách hoàn tiền:</h6>
                            <p className="content_option_5">
                                Chúng tôi cam kết đổi hàng chất lượng cao và đảm bảo đáp ứng nhu cầu của khách hàng.
                                Trong trường hợp sản phẩm đổi không còn hàng hoặc khách hàng không muốn đổi hàng khác,
                                chúng tôi sẽ tiến hành hoàn tiền tương đương giá trị sản phẩm ban đầu. Thời gian hoàn
                                tiền có thể kéo dài từ 5-10 ngày làm việc sau khi xác nhận yêu cầu hoàn tiền.
                            </p>
                        </div>
                        <div className="option_6">
                            <h6>6. Điều kiện không áp dụng đổi hàng:</h6>
                            <p className="content_option_6">
                                Cây cảnh đã được sử dụng, hư hỏng do lỗi sử dụng, hay bị ảnh hưởng bởi những yếu tố tự
                                nhiên như nước mưa, nhiệt độ quá cao hoặc quá thấp không nằm trong trách nhiệm của chúng
                                tôi để kiểm soát. Cây cảnh đã bị thay đổi, chỉnh sửa hoặc tuột dáng so với trạng thái
                                ban đầu khi mua hàng.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="box">
                        <div class="client_info">
                            <div class="client_name">
                                <h5>Dịch vụ đổi hàng</h5>
                            </div>
                            {/* <i class="fa fa-quote-left" aria-hidden="true"></i> */}
                        </div>
                        Nếu có bất kỳ vấn đề gì về sản phẩm cây cảnh bạn đã mua từ chúng tôi, hãy yên tâm liên hệ với
                        chúng tôi. Chúng tôi cam kết hỗ trợ quý khách trong việc đổi hàng nếu sản phẩm không đáp ứng
                        được mong đợi hoặc bị hỏng hóc do quy trình vận chuyển.
                        <div className="option_1">
                            <h6>Chính sách đổi hàng linh hoạt:</h6>
                            <p className="content_option_1">
                                Nếu có bất kỳ vấn đề gì về sản phẩm cây cảnh bạn đã mua từ chúng tôi, hãy yên tâm liên
                                hệ với chúng tôi. Chúng tôi cam kết hỗ trợ quý khách trong việc đổi hàng nếu sản phẩm
                                không đáp ứng được mong đợi hoặc bị hỏng hóc do quy trình vận chuyển.
                            </p>
                        </div>
                        <div className="option_2">
                            <h6>Quy trình đổi hàng:</h6>
                            <p className="content_option_2">
                                Để đổi hàng, quý khách chỉ cần thực hiện các bước sau đây:
                                <p>
                                    Bước 1: Liên hệ với chúng tôi: Hãy thông báo vấn đề của bạn và mong muốn đổi hàng
                                    thông qua số điện thoại hoặc email được cung cấp trên website của chúng tôi.
                                </p>
                                <p>
                                    Bước 2: Xác nhận thông tin: Đội ngũ chăm sóc khách hàng của chúng tôi sẽ liên hệ lại
                                    với bạn để xác nhận thông tin và tìm hiểu thêm về vấn đề mà bạn gặp phải.
                                </p>
                                <p>
                                    Bước 3: Quy trình đổi hàng: Sau khi xác nhận, chúng tôi sẽ hướng dẫn bạn về quy
                                    trình đổi hàng và hỗ trợ trong việc chọn cây cảnh mới phù hợp với sở thích và yêu
                                    cầu của bạn.
                                </p>
                                <p>
                                    Bước 4: Giao hàng mới: Chúng tôi sẽ tiến hành gửi cây cảnh mới đến địa chỉ mà bạn đã
                                    cung cấp.
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Policy;
