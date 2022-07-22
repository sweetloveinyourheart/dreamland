import Head from "next/head";
import Image from "next/image";
import { Container, SpecialContainer } from "../../UI/gridSystem";
import styles from '../../styles/pages/blog.module.scss'
import { useRouter } from "next/router";
import { FaBars, FaChevronRight, FaClock, FaEnvelope, FaFax, FaHome, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { GetServerSideProps } from "next";
import { BlogInterface } from "../../types/interfaces/blog";
import { initializeApollo } from "../../lib/apolloClient";
import { GET_BLOG_BY_LINK } from "../../graphql/queries/blogPage";
import Link from "next/link";
import Moment from "react-moment";

interface BlogPageProps {
    blog: BlogInterface
}

function BlogPage({ blog }: BlogPageProps) {

    const router = useRouter()

    return (
        <>
            <Head>
                <title> {blog.title} </title>
                <link rel="icon" href="https://res.cloudinary.com/dienkhoiland/image/upload/v1656394563/logo/LOGO-DIEN-KHOI_amhn6i.ico" />
            </Head>
            <header className={styles["header"]}>
                <SpecialContainer>
                    <div className={styles['header-area']}>
                        <div className={styles["logo"]} onClick={() => router.push("/")}>
                            <Image
                                src={"https://res.cloudinary.com/dienkhoiland/image/upload/v1656328913/logo/logo_nfdfc7.png"}
                                alt="#"
                                width={275}
                                height={50}
                            />
                        </div>
                        <nav className={styles['menu']}>
                            <ul>
                                <li> <button onClick={() => router.push("/home")}><FaHome /></button>  </li>
                                <li> <Link href={"/"}>Giới thiệu</Link> </li>
                                <li> <Link href={"/#tin-tuc"}>Tin tức</Link> </li>
                                <li> <Link href={"/#linh-vuc-hoat-dong"}>Lĩnh vực hoạt động</Link> </li>
                                <li> <Link href={"/#du-an-noi-bat"}>Dự án</Link> </li>
                                <li> <Link href={"/#lien-he"}>Liên hệ</Link> </li>
                            </ul>
                            <button> <FaBars /> </button>
                        </nav>
                    </div>
                </SpecialContainer>
            </header>
            <main>
                <section className={styles['blog-head']}>
                    <Container>
                        <div className={styles['direct-link']}>
                            <span><FaHome /></span>
                            <span><FaChevronRight /></span>
                            <span> Tin tức sự kiện </span>
                            <span><FaChevronRight /></span>
                            <span> {blog.title} </span>
                        </div>
                        <div className={styles['image']}>
                            <Image
                                src={blog.image}
                                alt="blog-image"
                                width={1920}
                                height={1080}
                            />
                        </div>
                    </Container>
                </section>
                <section className={styles['blog-body']}>
                    <Container>
                        <div className={styles['title']}>
                            <h1> {blog.title} </h1>
                            <div className={styles['title__timestamp']}>
                                <FaClock />
                                <span> <Moment format="DD/MM/yyyy">{blog.timeStamp}</Moment> </span>
                            </div>
                        </div>
                        <div className={`${styles['divider']}`}></div>
                        <div className={styles['content']}>
                            {blog.content}
                        </div>
                    </Container>
                </section>
            </main>
            {/* footer */}
            <footer className={styles['footer']} style={{ backgroundImage: "url('https://www.datxanh.vn/template/tint/images/bgFooter.jpg')" }}>
                <div className={styles['footer-bg']}>
                    <SpecialContainer>
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
                    </SpecialContainer>
                </div>
            </footer>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const link = context.params?.link

        if (!link) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

        const client = initializeApollo()

        const { data, error } = await client.query<{ blog: BlogInterface }>({
            query: GET_BLOG_BY_LINK,
            variables: {
                link
            }
        })

        return {
            props: {
                blog: data.blog
            }
        }

    } catch (error) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
}

export default BlogPage;