import "./footer.scss"

const Footer = () =>{
    return (
        <>
            <footer>
            <div class="left">
                {/* <img src="" alt="" class="logo-footer"> */}
                <div class="contact">
                    <p>Môn học: Thực tập tốt nghiệp</p>
                    <p>Đề tài: Xây dựng website bán cây cảnh</p>                  
                </div>
                <div class="contact">
                    <p>Giáo viên hướng dẫn: ThS Vũ Đình Long</p>
                    <p>Thành viên thực hiện:</p>                 
                    <p>Phan Thiên Nhân Hạnh</p>                                    
                </div>
                
            </div>
            <div class="right">
                {/* <a href="#"><i class="fa-brands fa-facebook"></i></a> */}
            </div>
            </footer>
        </>
    )
}

export default Footer