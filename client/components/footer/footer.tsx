import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Col, Container, Row } from "../../UI/gridSystem";
import styles from './footer.module.scss'

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    return (
        <footer className={styles["footer"]}>
            <Container>
                <Row>
                    <Col xs={12} sm={12} xl={3}>
                        <div className={styles['footer-item']}>
                            <div>
                                <h4>TẢI ỨNG DỤNG</h4>
                                <div className={styles['download-methods']}>
                                    <div className={styles['download-methods__QR']}>
                                        <Image
                                            src={"/footer/group-qr.png"}
                                            width={75}
                                            height={75}
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <div>
                                            <Image
                                                src={"/footer/ios.svg"}
                                                width={94}
                                                height={32}
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <Image
                                                src={"/footer/android.svg"}
                                                width={94}
                                                height={32}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} xl={3}>
                        <div className={styles['footer-item']}>
                            <div>
                                <h4>LIÊN KẾT TRANG</h4>
                                <div className={styles['link']}><Link href={"/"}>Trang chủ</Link></div>
                                <div className={styles['link']}><Link href={"/mua-ban/bat-dong-san"}>Mua bán</Link></div>
                                <div className={styles['link']}><Link href={"/cho-thue/bat-dong-san"}>Cho thuê</Link></div>
                                <div className={styles['link']}><Link href={"/du-an-bat-dong-san"}>Dự án</Link></div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} xl={3}>
                        <div className={styles['footer-item']}>
                            <div>
                                <h4>VỀ DREAMLAND</h4>
                                <div className={styles['link']}><Link href={"/"}>Giới thiệu</Link></div>
                                <div className={styles['link']}><Link href={"/"}>Lĩnh vực kinh doanh</Link></div>
                                <div className={styles['link']}><Link href={"/"}>Tin tức</Link></div>
                                <div className={styles['link']}><Link href={"/"}>Dự án</Link></div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} xl={3}>
                        <div className={styles['footer-item']}>
                            <div>
                                <h4>LIÊN KẾT</h4>
                                <div className={styles['social']}>
                                    <div className={styles['social__item']}><FaFacebook color="#14a7fa" /></div>
                                    <div className={styles['social__item']}><FaInstagram color="#e21873" /></div>
                                    <div className={styles['social__item']}><FaYoutube color="#f30606" /></div>
                                </div>
                                <h4>Chứng nhận</h4>
                                <Image
                                    src={"/footer/certificate.png"}
                                    width={130}
                                    height={40}
                                    alt="certificate"
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className={styles["address"]}>
                    <address>CÔNG TY CỔ PHẦN TẬP ĐOÀN ĐIỀN KHÔI - Địa chỉ: 89G Lý Thái Tổ, P. Tân Lợi, TP. Buôn Ma Thuột, Tỉnh Đắk Lắk. </address>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;