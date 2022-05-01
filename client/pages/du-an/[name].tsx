import Head from "next/head"
import Image from "next/image"
import { FaAngleDoubleRight, FaCameraRetro, FaChild, FaDumbbell, FaMapMarkedAlt, FaParking } from "react-icons/fa"
import { BiCctv, BiFootball, BiShieldAlt, BiSpa, BiStoreAlt, BiSwim } from 'react-icons/bi'
import { Carousel } from "react-responsive-carousel"
import Header from "../../components/header/header"
import styles from '../../styles/pages/du-an/index.module.scss'
import Footer from "../../components/footer/footer"
import Items from "../../components/items/items"
import Link from "next/link"

const RealEstateProject = () => {

    return (
        <>
            <Head>
                <title>Dự án bất động sản</title>
            </Head>
            <Header />
            <main style={{ backgroundColor: "#fff", padding: '64px 0' }}>
                <div className={styles['link-area']}>
                    <div className="container">
                        <div className={styles['link']}>
                            <ol>
                                <li><span>Trang chủ</span> <FaAngleDoubleRight /></li>
                                <li><span>Dự án</span> <FaAngleDoubleRight /></li>
                                <li><span>Nhà ở 3 tầng</span></li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className={styles['images']}>
                    <Carousel showThumbs={false} showIndicators={false}>
                        <div className={styles["image"]}>
                            <img src="/item/pj1.jpg" />
                            <img src="/item/pj2.jpg" />
                        </div>
                        <div className={styles["image"]}>
                            <img src="/item/pj3.jpg" />
                            <img src="/item/pj4.jpg" />
                        </div>
                    </Carousel>
                </div>
                <div className="container">
                    <div className={styles['project-header']}>
                        <h3>Vinhomes Central Park</h3>
                        <div className={styles['project-header__address']}>
                            <FaMapMarkedAlt />
                            <p>208 Nguyễn Hữu Cảnh, Phường 22, Quận Bình Thạnh, Tp Hồ Chí Minh, <span>Xem bản đồ</span></p>
                        </div>
                        <div className={styles['project-header__links']}>
                            <button>Xem tin đăng bán</button>
                            <button>Xem tin cho thuê</button>
                        </div>
                    </div>
                    <div className={styles['project-content']}>
                        <nav className={styles['content-navigator']}>
                            <a className={styles['content-navigator__item'] + ` ${styles['content-navigator__item--active']}`} href="#thongtin">Thông tin</a>
                            <a className={styles['content-navigator__item']} href="#tienich">Tiện ích</a>
                            <a className={styles['content-navigator__item']} href="#tindangban">Tin đăng bán</a>
                            <a className={styles['content-navigator__item']} href="#tinchothue">Tin cho thuê</a>
                            <a className={styles['content-navigator__item']} href="#chudautu">Chủ đầu tư</a>
                            <a className={styles['content-navigator__item']} href="#gioithieu">Giới thiệu</a>
                            <a className={styles['content-navigator__item']} href="#matbang">Mặt bằng</a>
                        </nav>
                        <div className={styles['pj-info']} id="thongtin">
                            <h3> Thông tin dự án </h3>
                            <div className={styles['pj-info__row']}>
                                <div className={styles['pj-info__col']}>
                                    <div className={`${styles['pj-info-item']} ${styles['pj-info-item--block']}`}>
                                        <h5>Giá mua bán</h5>
                                        <p>---</p>
                                        <p>Từ 83.3tr/m²</p>
                                    </div>
                                    <div className={styles['pj-info-item']}>
                                        <h5>Khởi công</h5>
                                        <p>Tháng 10/2014</p>
                                    </div>
                                    <div className={styles['pj-info-item']}>
                                        <h5>Chủ đầu tư</h5>
                                        <p>Tập đoàn Vingroup</p>
                                    </div>
                                    <div className={styles['pj-info-item']}>
                                        <h5>Tổng diện tích</h5>
                                        <p>439100</p>
                                    </div>
                                    <div className={styles['pj-info-item']}>
                                        <h5>Tiến độ</h5>
                                        <p>---</p>
                                    </div>
                                </div>
                                <div className={styles['pj-info__col']}>
                                    <div className={`${styles['pj-info-item']} ${styles['pj-info-item--block']}`}>
                                        <h5>Giá cho thuê</h5>
                                        <p>---</p>
                                        <p>Từ 83.3tr/m²</p>
                                    </div>
                                    <div className={styles['pj-info-item']}>
                                        <h5>Bàn giao</h5>
                                        <p>Tháng 10/2018</p>
                                    </div>
                                    <div className={styles['pj-info-item']}>
                                        <h5>Loại hình</h5>
                                        <p>Khu đô thị mới</p>
                                    </div>
                                    <div className={styles['pj-info-item']}>
                                        <h5>Quy mô</h5>
                                        <p>---</p>
                                    </div>
                                    <div className={styles['pj-info-item']}>
                                        <h5>Trạng thái</h5>
                                        <p>---</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles['pj-utilities']} id="tienich">
                            <h3> Tiện ích sử dụng </h3>
                            <div className={styles['pj-utilities__row']}>
                                <div className={styles['pj-utilities__col']}>
                                    <div className={styles['pj-utilities-item']}>
                                        <FaDumbbell />
                                        <span>Phòng Gym</span>
                                    </div>
                                </div>
                                <div className={styles['pj-utilities__col']}>
                                    <div className={styles['pj-utilities-item']}>
                                        <BiFootball />
                                        <span>Khu thể thao</span>
                                    </div>
                                </div>
                                <div className={styles['pj-utilities__col']}>
                                    <div className={styles['pj-utilities-item']}>
                                        <BiCctv />
                                        <span>Camera an ninh</span>
                                    </div>
                                </div>
                                <div className={styles['pj-utilities__col']}>
                                    <div className={styles['pj-utilities-item']}>
                                        <BiShieldAlt />
                                        <span>Bảo vệ 24/7</span>
                                    </div>
                                </div>
                                <div className={styles['pj-utilities__col']}>
                                    <div className={styles['pj-utilities-item']}>
                                        <BiSwim />
                                        <span>Hồ bơi</span>
                                    </div>
                                </div>
                                <div className={styles['pj-utilities__col']}>
                                    <div className={styles['pj-utilities-item']}>
                                        <FaParking />
                                        <span>Bãi đậu xe</span>
                                    </div>
                                </div>
                                <div className={styles['pj-utilities__col']}>
                                    <div className={styles['pj-utilities-item']}>
                                        <BiStoreAlt />
                                        <span>Trung tâm thương mại</span>
                                    </div>
                                </div>
                                <div className={styles['pj-utilities__col']}>
                                    <div className={styles['pj-utilities-item']}>
                                        <BiSpa />
                                        <span>Spa</span>
                                    </div>
                                </div>
                                <div className={styles['pj-utilities__col']}>
                                    <div className={styles['pj-utilities-item']}>
                                        <FaChild />
                                        <span>Khu vui chơi trẻ em</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles['pj-plan']} id="matbang">
                            <h3>Mặt bằng dự án</h3>
                            <div className={styles['pj-plan-track']}>
                                <div className={styles['pj-plan-track__selector']}>
                                    <h5 style={{ backgroundColor: "#f4f4f4" }}>Nội thất trong nhà</h5>
                                    <h5>Nội thất trong nhà</h5>
                                    <h5>Nội thất trong nhà</h5>
                                    <h5>Nội thất trong nhà</h5>
                                    <h5>Nội thất trong nhà</h5>
                                    <h5>Nội thất trong nhà</h5>
                                    <h5>Nội thất trong nhà</h5>
                                    <h5>Nội thất trong nhà</h5>
                                    <h5>Nội thất trong nhà</h5>
                                    <h5>Nội thất trong nhà</h5>
                                    <h5>Nội thất trong nhà</h5>
                                    <h5>Nội thất trong nhà</h5>
                                </div>
                                <div className={styles['pj-plan-track__img']}>
                                    <Image
                                        src={'/item/pj-plan-1.jpg'}
                                        width={439}
                                        height={439}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles['pj-items']} id="tindangban">
                            <h3>Tin đăng bán dự án Vinhomes Grand Park (Vincity Quận 9)</h3>
                            <Items />
                            <div className={styles['pj-items__more']}>
                                <Link href={"/"}> Xem thêm tin cho thuê </Link>
                            </div>
                        </div>
                        <div className={styles['pj-items']} id="tinchothue">
                            <h3>Tin cho thuê dự án Vinhomes Grand Park (Vincity Quận 9)</h3>
                            <Items />
                            <div className={styles['pj-items__more']}>
                                <Link href={"/"}> Xem thêm tin cho thuê </Link>
                            </div>
                        </div>
                        <div className={styles['pj-desr']} id="gioithieu">
                            <h3>Giới thiệu dự án</h3>
                            <div className={styles['pj-desr__content']}>
                                {`1.Vị trí:
    - Vincity Quận 9 tọa lạc ngay trục đường Nguyễn Xiển trung tâm Quận 9. Giáp các trục đường lớn như: Cao tốc Sài Gòn – Dầu Giây
    - 10 phút để tới khu du lịch Suối Tiên
    - 5 phút để tới khu trung tâm công nghệ cao của Tp.Hồ Chí Minh
    - 10 phút để tới khu thể thao sân Golf Rạch Chiếc
    - 15 phút để đến trung tâm Quận 2.
    - 6 phút để đến AEON Mall và Trường Đại Học Fulbright tương lai.

2.Tiện ích:
    - Hệ Thống trường đào tạo liên cấp quốc tế Vinschool
    - Hệ thống bệnh viện chăm sóc sức khỏe Vinmec
    - Hệ thống công viên ngoài trời với khu chạy bộ, khu thư giản, khu tổ chức sự kiện, khu thể dục thể thao, khu ngắm cảnh ven sông
    - Hệ thống trung tâm thương mại: Nhà hàng, rạp chiếu phim, khu ẩm thực, khu mua sắm, khu giải trí trong nhà…
    - Hệ thống quản lý, dịch vụ căn hộ tại Vinhomes và nhiều tiện ích nội khu khác

3.Chủ đầu tư:
    - Tập đoàn Vingroup - Chủ đầu tư uy tín
    - Dự án khác:Khu Đô thị Sinh thái Vinhomes Riverside, Trung tâm thương mại Vincom Center Bà Triệu, Vincom Center Đồng Khởi, Vincom Center Long Biên… 

4. Chính sách ưu đãi:
    - Ngân hàng Techcombank cho vay 80% giá trị căn hộ
    - Thời gian vay linh hoạt, kéo dài: Lên tới 35 năm tạo giảm áp lực trả nợ (Chỉ từ mức 4 triệu đồng/tháng)
    - Đặc biệt trong thời gian chờ nhận nhà (≈24 tháng) sẽ không phải thanh toán nợ với ngân hàng

5.Quy mô dự án:
    - Tổng diện tích: 365ha
    - Quy mô : 71 toà Block, cao từ 22 – 30 tầng
    - Gồm 44.000 căn hộ, 700 căn Shophouse, 1.700 nhà phố và biệt thự. Với các diện tích:
    - Căn hộ : 30 – 90m2
    - Shophouse : 100 – 200m2
    - Nhà phố : 70 – 120m2
    - Biệt thự : 200 – 500m2

6.Tiến độ dự án:
    - Năm khởi công: Quý IV/2018
    - Năm hoàn thành: 2021
    - Thời gian bàn giao: Quý IV/2021`}
                            </div>
                        </div>
                        <div className={styles['pj-owner']} id="chudautu">
                            <h3>Chủ đầu tư dự án</h3>
                            <div className={styles['owner']}>
                                <div className={styles['owner__img']}>
                                    <Image
                                        src={'/item/pj-owner.jpg'}
                                        width={50}
                                        height={50}
                                        alt="#"
                                    />
                                </div>
                                <div className={styles['owner__name']}>
                                    <p>Tập đoàn Vingroup</p>
                                    <span>Thành lập từ năm: 2019</span>
                                </div>
                            </div>
                            <div className={styles['owner-decr']}>
                                {`Với tầm nhìn dài hạn và quan điểm phát triển bền vững, Vingroup đã tập trung đầu tư vào lĩnh vực du lịch và bất động sản (BĐS) với hai thương hiệu chiến lược ban đầu là Vinpearl và Vincom. 
Bằng những nỗ lực không ngừng, Vincom đã trở thành một trong những thương hiệu số 1 Việt Nam về BĐS với hàng loạt các tổ hợp Trung tâm thương mại (TTTM) - Văn phòng - Căn hộ đẳng cấp tại các thành phố lớn, dẫn đầu xu thế đô thị thông minh - sinh thái hạng sang tại Việt Nam. 
Cùng với Vincom, Vinpearl cũng trở thành cánh chim đầu đàn của ngành Du lịch với chuỗi khách sạn, khu nghỉ dưỡng, khu biệt thự biển, công viên giải trí, sân golf đẳng cấp 5 sao và trên 5 sao quốc tế. 
Tháng 1/2012, Công ty CP Vinpearl sáp nhập vào Công ty CP Vincom và chính thức hoạt động dưới mô hình Tập đoàn với tên gọi Tập đoàn Vingroup - Công ty CP. Trên tinh thần phát triển bền vững và chuyên nghiệp, sau khi thành lập, Vingroup đã cơ cấu lại và tập trung phát triển với nhiều nhóm thương hiệu như:
    • Vinhomes (Hệ thống căn hộ và biệt thự dịch vụ đẳng cấp)• Vincom (Hệ thống TTTM đẳng cấp)
    • Vinpearl (Khách sạn, du lịch)
    • Vinpearl Land (Vui chơi giải trí)
    • Vinmec (Y tế)
    • Vinschool (Giáo dục)
    • VinCommerce (Kinh doanh bán lẻ: VinMart, VinPro, Ađâyrồi, VinDS...)
    • VinEco (Nông nghiệp)
    • Almaz (Trung tâm ẩm thực và Hội nghị Quốc tế)Với mong muốn đem đến cho thị trường những sản phẩm - dịch vụ theo tiêu chuẩn quốc tế và những trải nghiệm hoàn toàn mới về phong cách sống hiện đại, ở bất cứ lĩnh vực nào Vingroup cũng chứng tỏ vai trò tiên phong, dẫn dắt sự thay đổi xu hướng tiêu dùng. 
Vingroup đã làm nên những điều kỳ diệu để tôn vinh thương hiệu Việt và tự hào là một trong những Tập đoàn kinh tế tư nhân hàng đầu Việt Nam.`}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default RealEstateProject