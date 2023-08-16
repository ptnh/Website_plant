import './footer.scss';

const Footer = () => {
    return (
        <>
            <div class="footer-container">
                <div class="grid wide">
                    <div class="footer-bar">
                        <div class="footer__col">
                            <div class="footer__col-group">
                                <label class="footer__label">Thông tin chung</label>
                                <img src="logo.jpg" style={{ width: `50%`, height: `50%` }}></img>
                                <a href="" class="footer__link">
                                    Thực tập tốt nghiệp
                                </a>
                                <a href="" class="footer__link">
                                    Giáo viên hướng dẫn: Vũ Đình Long
                                </a>
                                <a href="" class="footer__link">
                                    Sinh viên thực hiện: Phan Thiên Nhân Hạnh - 2051120229
                                </a>
                            </div>
                        </div>
                        <div class="footer__col">
                            <div class="footer__col-group">
                                <label class="footer__label">Thông tin, chính sách và điều khoản sử dụng</label>
                                <a href="/policy" class="footer__link">
                                    Mua hàng và thanh toán
                                </a>
                                <a href="/policy" class="footer__link">
                                    Mua trả góp sản phẩm
                                </a>
                                <a href="/policy" class="footer__link">
                                    Tra cứu thông tin đơn hàng
                                </a>
                                <a href="/policy" class="footer__link">
                                    Tra cứu ưu đãi
                                </a>
                                <a href="/policy" class="footer__link">
                                    Tra cứu thông tin bảo hành
                                </a>
                                <a href="/policy" class="footer__link">
                                    Tra cứu hóa đơn điện tử
                                </a>
                                <a href="/policy" class="footer__link">
                                    Chính sách bảo hành
                                </a>
                                <a href="/policy" class="footer__link">
                                    Chính sách hậu mãi
                                </a>
                                <a href="/policy" class="footer__link">
                                    Điều khoản sử dụng
                                </a>
                            </div>
                        </div>
                        <div class="footer__col">
                            <div class="footer__col-group">
                                <label class="footer__label">
                                    Liên hệ hỗ trợ 24/7
                                    <span style={{ fontWeight: `bold`, color: `red` }}>(Miễn phí tư vấn)</span>
                                </label>
                                <div href="/" class="footer__text">
                                    <p class="footer__text-title">Hỗ trợ mua hàng:</p>
                                    <span
                                        class="footer__text-info"
                                        style={{ fontWeight: `bold`, color: `green`, paddingRight: `6px` }}
                                    >
                                        0332212xxx
                                    </span>
                                    <span class="hide-on-mobile">(24/7)</span>
                                </div>
                                <div href="/" class="footer__text">
                                    <p class="footer__text-title">Hỗ trợ kỹ thuật:</p>
                                    <span style={{ fontWeight: `bold`, color: `green`, paddingRight: `6px` }}>
                                        0332212xxx
                                    </span>
                                    <span class="hide-on-mobile">(Giờ hành chính)</span>
                                </div>
                                <div href="/" class="footer__text">
                                    <p class="footer__text-title">Giải quyết khiếu nại:</p>
                                    <span style={{ fontWeight: `bold`, color: `green`, paddingRight: `6px` }}>
                                        0332212xxx
                                    </span>
                                    <span class="hide-on-mobile">(24/7)</span>
                                </div>
                                <div href="/" class="footer__text">
                                    <p class="footer__text-title">Bảo hành sản phẩm:</p>
                                    <span style={{ fontWeight: `bold`, color: `green`, paddingRight: `6px` }}>
                                        0332212xxx
                                    </span>
                                    <span class="hide-on-mobile">(Giờ hành chính)</span>
                                </div>
                                <div href="/" class="footer__text">
                                    <p class="footer__text-title">Vấn đề khác:</p>
                                    <span style={{ fontWeight: `bold`, color: `green`, paddingRight: `6px` }}>
                                        0332212xxx
                                    </span>
                                    <span class="hide-on-mobile">(Giờ hành chính)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
