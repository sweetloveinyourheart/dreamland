import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import styles from './footer.module.scss'

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    return (
        <footer className={styles["footer"]}>
            <div className="container">
                <div className={styles["footer-row"]}>
                    <div className={styles["footer-col"]}>
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
                    <div className={styles["footer-col"]}>
                        <div>
                            <h4>LIÊN KẾT TRANG</h4>
                            <div className={styles['link']}><Link href={"/"}>Trang chủ</Link></div>
                            <div className={styles['link']}><Link href={"/"}>Mua bán</Link></div>
                            <div className={styles['link']}><Link href={"/"}>Cho thuê</Link></div>
                            <div className={styles['link']}><Link href={"/"}>Dự án</Link></div>
                        </div>
                    </div>
                    <div className={styles["footer-col"]}>
                        <div>
                            <h4>VỀ DREAMLAND</h4>
                            <div className={styles['link']}><Link href={"/about"}>Giới thiệu</Link></div>
                            <div className={styles['link']}><Link href={"/"}>Lĩnh vực kinh doanh</Link></div>
                            <div className={styles['link']}><Link href={"/"}>Tin tức</Link></div>
                            <div className={styles['link']}><Link href={"/"}>Dự án</Link></div>
                        </div>
                    </div>
                    <div className={styles["footer-col"]}>
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
                </div>
                <div className={styles["address"]}>
                    <address>CÔNG TY TNHH CHỢ TỐT - Địa chỉ: Phòng 1808, Tầng 18, Mê Linh Point Tower, 02 Ngô Đức Kế, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh </address>
                </div>
            </div>
        </footer>
    );
}

export default Footer;