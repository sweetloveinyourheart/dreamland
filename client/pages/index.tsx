import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from '../styles/pages/index.module.scss'
import { FaHome, FaClock, FaChevronRight, FaLocationArrow, FaPhoneAlt, FaFax, FaEnvelope, FaBars, FaArrowRight, FaArrowDown, FaGlobe } from 'react-icons/fa';
import { CgArrowLongDown } from 'react-icons/cg'
import { useRouter } from "next/router";
import { Col, Row, SpecialContainer } from "../UI/gridSystem";
//@ts-ignore
import { Zoom, Fade } from 'react-reveal';
import { BlogInterface } from "../types/interfaces/blog";
import { initializeApollo } from "../lib/apolloClient";
import { GET_BLOGS, GET_PAGE_TEMPLATE } from "../graphql/queries/introPage";
import Link from "next/link";
import { GET_TOP_PROJECTS_QUERY } from "../graphql/queries/homePage";
import { ProjectInterface } from "../types/interfaces/project";
import { useEffect, useState } from "react";
import Moment from "react-moment";

interface AboutPageProps {
    template: {
        banner: string | null
    }
    blogs: BlogInterface[]
    projects: ProjectInterface[]
}

const AboutPage: NextPage<AboutPageProps> = ({ template, blogs, projects }) => {
    const [selectedProject, setSelectedProject] = useState<ProjectInterface | undefined>()
    const [isNavActive, setNavActive] = useState<boolean>(false)

    const router = useRouter()

    useEffect(() => {
        if (projects.length !== 0) {
            setSelectedProject(projects[0])
        }
    }, [projects])

    const renderProjects = (): JSX.Element[] => {
        return projects.map((project, index) => {
            return (
                <Col xl={6} key={index}>
                    <div className={`${styles['project-name']} ${project._id === selectedProject?._id ? styles['project-name--active'] : ''}`} onClick={() => setSelectedProject(project)}>
                        <FaArrowRight />
                        {project.projectName}
                    </div>
                </Col>
            )
        })
    }

    const renderBlogs = (): JSX.Element[] => {
        return blogs.map((blog, index) => {
            return (
                <Col md={6} lg={4} xl={3} key={index}>
                    <Zoom >
                        <div className={`${styles['list-item']}`}>
                            <div>
                                <Image
                                    src={blog.image}
                                    width={592}
                                    height={420}
                                    alt="#"
                                />
                            </div>
                            <div className={styles['news-descr']}>
                                <div className={styles['popup__title']}>{blog.title}</div>
                                <div className={styles['popup__timestamp']}><FaClock style={{ marginRight: 4 }} />
                                    <Moment format="DD/MM/yyyy">
                                        {blog.timeStamp}
                                    </Moment>
                                </div>
                                <div className={styles['popup__detail']}>{blog.content.slice(0, blog.content.length >= 150 ? 150 : blog.content.length - 2)} ........</div>
                                <div className={styles['popup__btn']}>
                                    <button onClick={() => router.push(`/blog/${blog.link}`)}> Xem thêm </button>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </Col>
            )
        })
    }

    return (
        <>
            <Head>
                <title> DreamLand Group </title>
                <meta name="description" content="Hệ sinh thái dịch vụ bất động sản số 1 - DreamLand đang ngày càng hoàn thiện dịch vụ môi giới, truyền thông, đầu tư và quản lý bất động sản" />
            </Head>
            {/* Header  */}
            <header className={styles["header"]}>
                <SpecialContainer>
                    <div className={styles['header-area']}>
                        <div className={styles["logo"]} onClick={() => router.push("/")}>
                            <Image
                                src={"/logo/logo.png"}
                                alt="#"
                                width={275}
                                height={50}
                            />
                        </div>
                        <nav className={`${styles['menu']} ${isNavActive ? styles['menu--active'] : ''}`}>
                            <ul>
                                <li> {isNavActive ? <Link href={'/home'}> Bất động sản </Link> : <button onClick={() => router.push("/home")}> <FaHome /></button>} </li>
                                <li> <Link href={"/"}>Giới thiệu</Link> </li>
                                <li>  <Link href={"/#tin-tuc"}>Tin tức</Link> </li>
                                <li> <Link href={"/#linh-vuc-hoat-dong"}>Lĩnh vực hoạt động</Link> </li>
                                <li> <Link href={"/#du-an-noi-bat"}>Dự án</Link> </li>
                                <li> <Link href={"/#lien-he"}>Liên hệ</Link> </li>
                            </ul>
                            <button onClick={() => setNavActive(s => !s)}> <FaBars /> </button>
                        </nav>
                    </div>
                </SpecialContainer>
            </header>
            {/* Banner  */}
            <section>
                {template.banner
                    && (
                        <div className={styles['banner']} style={{ backgroundImage: `url(${template.banner})` }}>
                            <div className={styles['scroll-down']}>
                                <div className={styles['scroll-down__item']} onClick={() => router.push('/#tin-tuc')}>
                                    <span>Khám phá</span>
                                    <div className={styles['arrow']}>
                                        <CgArrowLongDown />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </section>

            {/* News */}
            <section className={styles["news"]} id="tin-tuc">
                <SpecialContainer>
                    <Row>
                        <Col xl={12}>
                            <div className={styles['news-title']}>
                                Tin tức và sự kiện
                                <div className={`${styles['divider']}`}></div>
                            </div>
                        </Col>
                    </Row>
                    <div className={styles['news-list']}>
                        <Row>
                            {renderBlogs()}
                        </Row>
                    </div>
                </SpecialContainer>
            </section>
            {/* Category  */}
            <section className={styles['categories']} id="linh-vuc-hoat-dong">
                <div className={styles['categories-title']}>LĨNH VỰC HOẠT ĐỘNG</div>
                <Fade left>
                    <div className={styles['categories-list']}>
                        <div className={styles['categories-list__item']}>
                            <div className={styles['category']}>
                                <Image
                                    width={500}
                                    height={853}
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
                                    width={500}
                                    height={853}
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
                                    width={500}
                                    height={853}
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
                                    width={500}
                                    height={853}
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
                </Fade>
            </section>

            {/* Project */}
            <section className={styles['project']} id="du-an-noi-bat">
                <div className={styles['project-list']}>
                    <div className={styles['project-list__item']}>
                        <Fade left>
                            <div className={styles['project-info']}>
                                <div className={styles['project-title']}>DỰ ÁN NỔI BẬT
                                    <div className={styles['divider']}></div>
                                </div>
                                <Row>
                                    {renderProjects()}
                                </Row>
                            </div>
                        </Fade>
                    </div>
                    <div className={styles['project-list__item']}>
                        <div className={styles['project-item']}>
                            <Image
                                width={1200}
                                height={900}
                                src={selectedProject?.media.images[0] ?? '/img/327128795_Cen Ocean Park 1-min.jpg'}
                                alt="#"
                            />
                            <div className={styles['project-item__name']}>
                                <FaChevronRight />
                                <p>{selectedProject?.projectName}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* footer */}
            <footer className={styles['footer']} style={{ backgroundImage: "url('https://www.datxanh.vn/template/tint/images/bgFooter.jpg')" }} id="lien-he">
                <div className={styles['footer-bg']}>
                    <SpecialContainer>
                        <div className={styles["footer-list"]}>
                            <div className={styles["ftr-list-col--big"]}>
                                <Image
                                    src={"/logo/logo.png"}
                                    alt="#"
                                    width={275}
                                    height={50}
                                />
                                <div className={styles['company-info']}>
                                    <p>
                                        <FaLocationArrow />
                                        Trụ sở chính: 89 Lý Thái Tổ, Tân Lợi, TP. Buôn Ma Thuột, Tỉnh Đắk Lắk
                                    </p>
                                    <p>
                                        <FaPhoneAlt />
                                        Điện thoại: 0262 223 8888
                                    </p>
                                    <p>
                                        <FaEnvelope />
                                        Email: info@dienkhoigroup.vn
                                    </p>
                                    <p>
                                        <FaGlobe />
                                        Website: www.dienkhoigroup.vn
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
    )
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const client = initializeApollo()

        const blogResult = await client.query({
            query: GET_BLOGS
        })

        const templateResult = await client.query({
            query: GET_PAGE_TEMPLATE,
            variables: {
                pageName: "introduction"
            }
        })

        const projectsResult = await client.query<{ projects: ProjectInterface[] }>({
            query: GET_TOP_PROJECTS_QUERY
        })

        return {
            props: {
                template: templateResult?.data.template || { banner: null },
                blogs: blogResult?.data.blogs || [],
                projects: projectsResult?.data.projects || []
            }
        }

    } catch (error) {
        return {
            props: {
                template: { banner: null },
                blogs: [],
                projects: []
            }
        }
    }
}

export default AboutPage