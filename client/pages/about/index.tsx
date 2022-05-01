import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from '../../styles/pages/about/index.module.scss'
import { FaHome, FaClock, FaChevronRight, FaLocationArrow, FaPhoneAlt, FaFax, FaEnvelope, FaBars } from 'react-icons/fa';
import { useRouter } from "next/router";

const AboutPage: NextPage = () => {

    const router = useRouter()

    return (
        <>
            <Head>
                <title> DreamLand Group </title>
                <meta name="description" content="Hệ sinh thái dịch vụ bất động sản số 1 - DreamLand đang ngày càng hoàn thiện dịch vụ môi giới, truyền thông, đầu tư và quản lý bất động sản" />
            </Head>
            {/* Header  */}
            <header className={styles["header"]}>
                <div className="container">
                    <div className={styles['header-area']}>
                        <div className={styles["logo"]} onClick={() => router.push("/")}>
                            <Image
                                src={"/logo/logo.png"}
                                alt="#"
                                width={115}
                                height={50}
                            />
                        </div>
                        <nav className={styles['menu']}>
                            <ul>
                                <li> <button onClick={() => router.push("/")}><FaHome /></button>  </li>
                                <li> Giới thiệu </li>
                                <li> Tin tức </li>
                                <li> Lĩnh vực kinh doanh </li>
                                <li> Dự án </li>
                                <li> Liên hệ </li>
                            </ul>
                            <button> <FaBars /> </button>
                        </nav>
                    </div>
                </div>
            </header>
            {/* Banner  */}
            <section>
                <div className={styles['banner']} style={{ backgroundImage: 'url(/logo/banner.jpg)' }}></div>
            </section>

            {/* News */}
            <section className={styles["news"]}>
                <div className="container">
                    <div className={styles['news-title']}>
                        Tin tức và sự kiện
                    </div>
                    <div className={styles['news-list']}>
                        <div className={`${styles['list-item']}`}>
                            <div className={styles['small-news']}>
                                <div>
                                    <Image
                                        src={"/logo/small-news.jpg"}
                                        width={592}
                                        height={420}
                                        alt="#"
                                    />
                                </div>
                                <div className={styles['news-descr']}>
                                    <div className={styles['popup__title']}>Liên tiếp đạt nhiều giải thưởng danh giá, Cen Land khẳng định vị thế Top đầu</div>
                                    <div className={styles['popup__detail']}>Vượt qua nhiều biến động của thị trường bất động sản (BĐS), Công ty Cổ phần BĐS Thế Kỷ (Cen Land) ngày càng khẳng định vị thế dẫn đầu trong các công ty dịch vụ BĐS tại Việt Nam.</div>
                                    <div className={styles['popup__timestamp']}><FaClock style={{ marginRight: 4 }} /> 19/04/2022</div>
                                </div>
                            </div>
                            <div className={styles['small-news']}>
                                <div>
                                    <Image
                                        src={"/logo/big-news.jpg"}
                                        width={592}
                                        height={420}
                                        alt="#"
                                    />
                                </div>
                                <div className={styles['news-descr']}>
                                    <div className={styles['popup__title']}>Liên tiếp đạt nhiều giải thưởng danh giá, Cen Land khẳng định vị thế Top đầu</div>
                                    <div className={styles['popup__detail']}>Vượt qua nhiều biến động của thị trường bất động sản (BĐS), Công ty Cổ phần BĐS Thế Kỷ (Cen Land) ngày càng khẳng định vị thế dẫn đầu trong các công ty dịch vụ BĐS tại Việt Nam.</div>
                                    <div className={styles['popup__timestamp']}><FaClock style={{ marginRight: 4 }} /> 19/04/2022</div>
                                </div>
                            </div>
                            <div className={styles['small-news']}>
                                <div>
                                    <Image
                                        src={"/logo/small-news.jpg"}
                                        width={592}
                                        height={420}
                                        alt="#"
                                    />
                                </div>
                                <div className={styles['news-descr']}>
                                    <div className={styles['popup__title']}>Liên tiếp đạt nhiều giải thưởng danh giá, Cen Land khẳng định vị thế Top đầu</div>
                                    <div className={styles['popup__detail']}>Vượt qua nhiều biến động của thị trường bất động sản (BĐS), Công ty Cổ phần BĐS Thế Kỷ (Cen Land) ngày càng khẳng định vị thế dẫn đầu trong các công ty dịch vụ BĐS tại Việt Nam.</div>
                                    <div className={styles['popup__timestamp']}><FaClock style={{ marginRight: 4 }} /> 19/04/2022</div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles['list-item']} ${styles['list-item--right']}`}>
                            <div className={styles['big-news']}>
                                <Image
                                    src={"/logo/big-news.jpg"}
                                    width={592}
                                    height={420}
                                    alt="#"
                                />
                                <div className={styles['news-popup']}>
                                    <div className={styles['popup__title']}>Liên tiếp đạt nhiều giải thưởng danh giá, Cen Land khẳng định vị thế Top đầu</div>
                                    <div className={styles['popup__detail']}>Vượt qua nhiều biến động của thị trường bất động sản (BĐS), Công ty Cổ phần BĐS Thế Kỷ (Cen Land) ngày càng khẳng định vị thế dẫn đầu trong các công ty dịch vụ BĐS tại Việt Nam.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Category  */}
            <section className={styles['categories']}>
                <div className={styles['categories-title']}>LĨNH VỰC HOẠT ĐỘNG</div>
                <div className={styles['categories-list']}>
                    <div className={styles['categories-list__item']}>
                        <div className={styles['category']}>
                            <Image
                                width={382}
                                height={652}
                                src={"/img/xay-dung.jpg"}
                                alt="#"
                            />
                            <div className={styles["category-desc"]}>
                                <div className={styles["category-desc__title"]}>Phát triển<br />bất động sản</div>
                                <div className={styles["category-desc__content"]}>Là một trong những nhà phát triển dự án hàng đầu Việt Nam, Tập đoàn Đất Xanh tự hào mang đến những dự án chất lượng cao, mang đến những trải nghiệm hoàn hảo cho khách hàng</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['categories-list__item']}>
                        <div className={styles['category']}>
                            <Image
                                width={382}
                                height={652}
                                src={"/img/phat-trien-bds.jpg"}
                                alt="#"
                            />
                            <div className={styles["category-desc"]}>
                                <div className={styles["category-desc__title"]}>Phát triển<br />bất động sản</div>
                                <div className={styles["category-desc__content"]}>Là một trong những nhà phát triển dự án hàng đầu Việt Nam, Tập đoàn Đất Xanh tự hào mang đến những dự án chất lượng cao, mang đến những trải nghiệm hoàn hảo cho khách hàng</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['categories-list__item']}>
                        <div className={styles['category']}>
                            <Image
                                width={382}
                                height={652}
                                src={"/img/khu-cong-nghiep-home2.jpg"}
                                alt="#"
                            />
                            <div className={styles["category-desc"]}>
                                <div className={styles["category-desc__title"]}>Phát triển<br />bất động sản</div>
                                <div className={styles["category-desc__content"]}>Là một trong những nhà phát triển dự án hàng đầu Việt Nam, Tập đoàn Đất Xanh tự hào mang đến những dự án chất lượng cao, mang đến những trải nghiệm hoàn hảo cho khách hàng</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['categories-list__item']}>
                        <div className={styles['category']}>
                            <Image
                                width={382}
                                height={652}
                                src={"/img/HSS_6331_resize.jpg"}
                                alt="#"
                            />
                            <div className={styles["category-desc"]}>
                                <div className={styles["category-desc__title"]}>Phát triển<br />bất động sản</div>
                                <div className={styles["category-desc__content"]}>Là một trong những nhà phát triển dự án hàng đầu Việt Nam, Tập đoàn Đất Xanh tự hào mang đến những dự án chất lượng cao, mang đến những trải nghiệm hoàn hảo cho khách hàng</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Project */}
            <section className={styles['project']}>
                <div className="container">
                    <div className={styles['project-title']}>DỰ ÁN NỔI BẬT</div>
                    <div className={styles['project-list']}>
                        <div className={styles['project-list__item']}>
                            <div className={styles['project-item']}>
                                <Image
                                    width={380}
                                    height={302}
                                    src={'/img/327128795_Cen Ocean Park 1-min.jpg'}
                                    alt="#"
                                />
                                <div className={styles['project-item__name']}>
                                    <FaChevronRight />
                                    <p>Cen Ocean Park</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles['project-list__item']}>
                            <div className={styles['project-item']}>
                                <Image
                                    width={380}
                                    height={302}
                                    src={'/img/VinhomesSmartCity.jpg'}
                                    alt="#"
                                />
                                <div className={styles['project-item__name']}>
                                    <FaChevronRight />
                                    <p>Vinhomes Smart City</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles['project-list__item']}>
                            <div className={styles['project-item']}>
                                <Image
                                    width={380}
                                    height={302}
                                    src={'/img/HamubayPhanThiet.jpg'}
                                    alt="#"
                                />
                                <div className={styles['project-item__name']}>
                                    <FaChevronRight />
                                    <p>Hamubay Phan Thiet</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles['project-list__item']}>
                            <div className={styles['project-item']}>
                                <Image
                                    width={380}
                                    height={302}
                                    src={'/img/327128795_Cen Ocean Park 1-min.jpg'}
                                    alt="#"
                                />
                                <div className={styles['project-item__name']}>
                                    <FaChevronRight />
                                    <p>Cen Ocean Park</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles['project-list__item']}>
                            <div className={styles['project-item']}>
                                <Image
                                    width={380}
                                    height={302}
                                    src={'/img/VinhomesSmartCity.jpg'}
                                    alt="#"
                                />
                                <div className={styles['project-item__name']}>
                                    <FaChevronRight />
                                    <p>Vinhomes Smart City</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles['project-list__item']}>
                            <div className={styles['project-item']}>
                                <Image
                                    width={380}
                                    height={302}
                                    src={'/img/HamubayPhanThiet.jpg'}
                                    alt="#"
                                />
                                <div className={styles['project-item__name']}>
                                    <FaChevronRight />
                                    <p>Hamubay Phan Thiet</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* footer */}
            <footer className={styles['footer']} style={{ backgroundImage: "url('https://www.datxanh.vn/template/tint/images/bgFooter.jpg')" }}>
                <div className={styles['footer-bg']}>
                    <div className="container">
                        <div className={styles["footer-list"]}>
                            <div className={styles["ftr-list-col--big"]}>
                                <Image
                                    src={"/logo/logo.png"}
                                    alt="#"
                                    width={153}
                                    height={75}
                                />
                                <div className={styles['company-info']}>
                                    <p>
                                        <FaLocationArrow />
                                        Trụ sở chính: 2W Ung Văn Khiêm, P.25, Quận Bình Thạnh, TP.HCM
                                    </p>
                                    <p>
                                        <FaPhoneAlt />
                                        Điện thoại: 028 6252 5252
                                    </p>
                                    <p>
                                        <FaFax />
                                        Fax: 028 6252 5252
                                    </p>
                                    <p>
                                        <FaEnvelope />
                                        Email: info@datxanh.com.vn
                                    </p>
                                </div>
                            </div>
                            <div className={styles['ftr-list-col']}>
                                <div className={styles['company-info']}>
                                    <h5>VĂN PHÒNG GIAO DỊCH</h5>
                                    <p>Văn phòng tại Hà Nội :
                                        <br />-Tầng 1, Số 137 Nguyễn Ngọc Vũ, Trung Hòa, Cầu Giấy, Hà Nội.
                                        <br /><br />Văn phòng tại TP. Hồ Chí Minh:
                                        <br />-Tầng 8-9, Tòa nhà Cen Group, 91A Cao Thắng, phường 3, quận 3, TP.HCM.</p>
                                </div>
                            </div>
                            <div className={styles['ftr-list-col']}>
                                <div className={styles['company-info']}>
                                    <h5>Công ty Cổ phần Bất động sản Thế Kỷ</h5>
                                    <p>ĐKKD 0101160306 Do Sở Kế Hoạch Và Đầu Tư Thành Phố Hà Nội cấp ngày 20 tháng 08 năm 2001</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default AboutPage