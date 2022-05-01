import Head from "next/head";
import { FunctionComponent } from "react";
import { FaAngleDoubleRight, FaMapMarkedAlt, FaUniversity } from "react-icons/fa";
import { BiPhone } from "react-icons/bi"
import Header from "../../components/header/header";
import styles from '../../styles/pages/item.module.scss'
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
import Footer from "../../components/footer/footer";
import Items from "../../components/items/items";
import Link from "next/link";

interface ItemPageProps {

}

const ItemPage: FunctionComponent<ItemPageProps> = () => {
    return (
        <>
            <Head>
                <title> Sản phẩm </title>
            </Head>
            <Header />
            <main style={{ backgroundColor: "#f4f4f4", padding: '64px 0' }}>
                <div className="container">
                    <div className={styles['link']}>
                        <ol>
                            <li><span>Trang chủ</span> <FaAngleDoubleRight /></li>
                            <li><span>Mua bán</span> <FaAngleDoubleRight /></li>
                            <li><span>TP. HCM</span> <FaAngleDoubleRight /></li>
                            <li><span>Nhà ở 3 tầng</span></li>
                        </ol>
                        <button> Về danh sách </button>
                    </div>
                    <div className={styles['area']}>
                        <div className={styles['content']}>
                            <Carousel>
                                <div className={styles["image"]}>
                                    <img src="/item/item1.jpg" />
                                    <span>
                                        <Image
                                            src={"/item/item1.jpg"}
                                            width={800}
                                            height={600}
                                            alt="Image"
                                        />
                                    </span>
                                    <div className={styles['image__abs']}>
                                        <img src="/item/item1.jpg" />
                                    </div>
                                </div>
                                <div className={styles["image"]}>
                                    <img src="/item/item2.jpg" />
                                    <span>
                                        <Image
                                            src={"/item/item2.jpg"}
                                            width={800}
                                            height={600}
                                            alt="Image"
                                        />
                                    </span>
                                    <div className={styles['image__abs']}>
                                        <img src="/item/item2.jpg" />
                                    </div>
                                </div>
                                <div className={styles["image"]}>
                                    <img src="/item/item3.jpg" />
                                    <span>
                                        <Image
                                            src={"/item/item3.jpg"}
                                            width={800}
                                            height={600}
                                            alt="Image"
                                        />
                                    </span>
                                    <div className={styles['image__abs']}>
                                        <img src="/item/item3.jpg" />
                                    </div>
                                </div>
                                <div className={styles["image"]}>
                                    <img src="/item/item4.jpg" />
                                    <span>
                                        <Image
                                            src={"/item/item4.jpg"}
                                            width={800}
                                            height={600}
                                            alt="Image"
                                        />
                                    </span>
                                    <div className={styles['image__abs']}>
                                        <img src="/item/item4.jpg" />
                                    </div>
                                </div>
                                <div className={styles["image"]}>
                                    <img src="/item/item5.jpg" />
                                    <span>
                                        <Image
                                            src={"/item/item5.jpg"}
                                            width={800}
                                            height={600}
                                            alt="Image"
                                        />
                                    </span>
                                    <div className={styles['image__abs']}>
                                        <img src="/item/item5.jpg" />
                                    </div>
                                </div>
                            </Carousel>
                            <div className={styles['name']}>
                                Bán nhà hẻm xe hơi 5m đường số 59. HĐT 12tr/tháng
                            </div>
                            <div className={styles['price']}>
                                <span>4,95 tỷ</span>
                                <span> - 44 m2</span>
                            </div>
                            <div className={styles['installment']}>
                                <FaUniversity />
                                <p>Trả góp <span>50.6 triệu/tháng</span>, trả trước 1.08 tỷ</p>
                            </div>
                            <div className={styles['address']}>
                                <FaMapMarkedAlt />
                                <p>Phường 16, Quận Gò Vấp, Tp Hồ Chí Minh, <span>Xem bản đồ</span></p>
                            </div>
                            <div className={styles['description']}>
                                {`- Bán nhà Gò Vấp giá rẻ! Kết cấu mới 100%, diện tích vuông vức 5.5 x 7m công nhận đủ. Đúc 5 tấm. Sổ hồng chính chủ. Vị trí nhà nằm trong khu đồng bộ cao cấp, dân trí cao, cơ sở hạ tầng đồng bộ. Nhà thích hợp định cư lâu dài, cho thuê hoặc kinh doanh.
- Giá bán: 5.4 tỷ (thương lượng chính chủ)
- Diện tích : 5.5 x 7m công nhận đủ. DT sàn : 192.5m2.
- Kết cấu nhà: 1 trệt 1 lửng 3 lầu- sân thượng.
- Thiết kế: Phòng khách, khu vực bếp, 4 phòng ngủ, 5WC, phòng giặt, phòng thờ, sân để xe.
- Nhà thiết kế sang trọng với màu sơn trắng tinh tế. Không gian mở với đầy đủ ánh sáng và gió.
- Nhà đúc kiên cố và vững chắc. Toàn bộ vật liệu, thiết bị đều được tuyển chọn từ các thương hiệu lớn để đảm bảo độ bền cũng như công năng sử dụng tối đa. 
- Hướng nhà: Bắc.
- Hẻm trước nhà: 5m.
- Nhà 1 xẹc thuộc trục đường Số 9, phường 16, quận Gò Vấp, TP. Hồ Chí Minh.
- Vị thuận tiện kết nối giao thông khu vực, tiếp giáp với các đường: Phạm Văn Chiêu, Lê Văn Thọ, Cây Trâm, Quang Trung,..
- Di chuyển qua quận 12 chỉ 10 phút, di chuyển qua sân bay Tân Sân Nhất 15 phút, giáp Tân Bình, Quận Phú Nhuận 15p, ra trung tâm thành phố chỉ 30 phút,…
- Đầy đủ tiện ích trong bán kính 3km: Chợ Thạch Đà, công viên Làng Hoa, THCS An Hội, THPT Lý Thái Tổ,,..
- Căn nhà được thực hiện bởi Công ty kiến trúc nhiều năm kinh nghiệm trong nghành, đảm bảo xây dựng chất lượng vượt trội, an toàn cho gia chủ.
- Giao nhà sau khi công chứng mua bán. Nhà chính chủ, đang trống thuận tiện vào ở ngay!`}
                            </div>
                        </div>
                        <div className={styles['contact']}>
                            <div className={styles['contact-owner']}>
                                <Image src={'/logo/profile.png'} width={50} height={50} />
                                <div className={styles['contact-owner__info']}>
                                    <h5>Đinh Văn Dũng</h5>
                                    <span>Môi giới</span>
                                </div>
                            </div>
                            <div className={styles['contact-phone']}>
                                <div className={styles['contact-phone__guard']}>
                                    <div className={`${styles['phone--hidden']}`}>
                                        <BiPhone />
                                        <span>0931******</span>
                                    </div>
                                    <div>Bấm để hiện số</div>
                                </div>
                            </div>
                            <div className={styles['overview']}>
                                <h4> Thông tin cơ bản </h4>
                                <div className={styles['overview__col']}>
                                    <div className={styles['overview-item']}>
                                        <div className={styles['overview-item__image']}>
                                            <Image src={"/desc/dien-tich.png"} width={25} height={25} alt="dien-tich" />
                                        </div>
                                        <span>Diện tích: </span>
                                        <span>48 m²</span>
                                    </div>
                                    <div className={styles['overview-item']}>
                                        <div className={styles['overview-item__image']}>
                                            <Image src={"/desc/double-bed.png"} width={25} height={25} alt="dien-tich" />
                                        </div>
                                        <span>Phòng ngủ: </span>
                                        <span>4 phòng</span>
                                    </div>
                                    <div className={styles['overview-item']}>
                                        <div className={styles['overview-item__image']}>
                                            <Image src={"/desc/toilet.png"} width={25} height={25} alt="dien-tich" />
                                        </div>
                                        <span>Phòng vệ sinh: </span>
                                        <span>4 phòng</span>
                                    </div>
                                    <div className={styles['overview-item']}>
                                        <div className={styles['overview-item__image']}>
                                            <Image src={"/desc/contract.png"} width={25} height={25} alt="dien-tich" />
                                        </div>
                                        <span>Giấy tờ pháp lý: </span>
                                        <span>Đã có sổ</span>
                                    </div>
                                    <div className={styles['overview-item']}>
                                        <div className={styles['overview-item__image']}>
                                            <Image src={"/desc/sofa.png"} width={25} height={25} alt="dien-tich" />
                                        </div>
                                        <span>Tình trạng nội thất: </span>
                                        <span>Nội thất cao cấp</span>
                                    </div>
                                </div>
                                <div className={styles['overview__col']}>
                                    <div className={styles['overview-item']}>
                                        <div className={styles['overview-item__image']}>
                                            <Image src={"/desc/double-arrow-horizontal-symbol.png"} width={25} height={25} alt="dien-tich" />
                                        </div>
                                        <span>Chiều dọc: </span>
                                        <span>48 m²</span>
                                    </div>
                                    <div className={styles['overview-item']}>
                                        <div className={styles['overview-item__image']}>
                                            <Image src={"/desc/double-arrow-vertical-symbol.png"} width={25} height={25} alt="dien-tich" />
                                        </div>
                                        <span>Chiều ngang: </span>
                                        <span>4 phòng</span>
                                    </div>
                                    <div className={styles['overview-item']}>
                                        <div className={styles['overview-item__image']}>
                                            <Image src={"/desc/money.png"} width={25} height={25} alt="dien-tich" />
                                        </div>
                                        <span>Giá/m2: </span>
                                        <span>103,13 triệu/m²</span>
                                    </div>
                                    <div className={styles['overview-item']}>
                                        <div className={styles['overview-item__image']}>
                                            <Image src={"/desc/north.png"} width={25} height={25} alt="dien-tich" />
                                        </div>
                                        <span>Hướng cửa chính: </span>
                                        <span>Đông Nam</span>
                                    </div>
                                    <div className={styles['overview-item']}>
                                        <div className={styles['overview-item__image']}>
                                            <Image src={"/desc/building.png"} width={25} height={25} alt="dien-tich" />
                                        </div>
                                        <span>Tổng số tầng: </span>
                                        <span>2 tầng</span>
                                    </div>
                                    <div className={styles['overview-item']}>
                                        <div className={styles['overview-item__image']}>
                                            <Image src={"/desc/smart-home.png"} width={25} height={25} alt="dien-tich" />
                                        </div>
                                        <span>Loại hình nhà ở: </span>
                                        <span>Nhà ngõ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['stall']}>
                        <h4> Tin bất động sản liên quan </h4>
                        <div className={styles['stall__items']}>
                            <Items />
                        </div>
                        <div className={styles['stall__more']}>
                            <Link href={"/"}> Xem thêm tin liên quan </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default ItemPage;