import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FaShieldAlt } from 'react-icons/fa'
import MainBanner from '../components/banner/banner'
import MainCategories from '../components/categories/categories'
import Footer from '../components/footer/footer'
import Header from '../components/header/header'
import Items from '../components/items/items'
import Projects from '../components/projects/projects'
import { GET_TOP_POSTS_QUERY, GET_TOP_PROJECTS_QUERY, TopPostsResult } from '../graphql/queries/homePage'
import { initializeApollo } from '../lib/apolloClient'
import { ProjectInterface } from '../types/interfaces/project'
import styles from './../styles/pages/index.module.scss'

interface HomePageProps {
  projects: ProjectInterface[]
  posts: TopPostsResult
}

const Home: NextPage<HomePageProps> = ({ projects, posts }) => {
  return (
    <>
      <Head>
        <title> DreamLand Group </title>
        <meta name="description" content="Hệ sinh thái dịch vụ bất động sản số 1 - DreamLand đang ngày càng hoàn thiện dịch vụ môi giới, truyền thông, đầu tư và quản lý bất động sản" />
      </Head>
      <Header />
      <main style={{ backgroundColor: 'rgba(244,244,244, 0.8)' }}>
        <MainBanner />
        <MainCategories />
        <section className={styles['items-area']}>
          <div className="container">
            <div className={styles['stall']}>
              <h4> Mua bán bất động sản </h4>
              <div className={styles['stall__items']}>
                <Items data={[...posts.sellingApartments, ...posts.sellingHouses, ...posts.sellingLands]} />
              </div>
              <div className={styles['stall__more']}>
                <Link href={"/mua-ban/bat-dong-san"}> Xem thêm tin mua bán</Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles['items-area']}>
          <div className="container">
            <div className={styles['stall']}>
              <h4> Cho thuê bất động sản </h4>
              <div className={styles['stall__items']}>
                <Items data={[...posts.rentingApartments, ...posts.rentingHouses, ...posts.rentingLands]} />
              </div>
              <div className={styles['stall__more']}>
                <Link href={"/cho-thue/bat-dong-san"}> Xem thêm tin cho thuê </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles['items-area']}>
          <div className="container">
            <div className={styles['stall']}>
              <h4> Bất động sản từ đối tác </h4>
              <div className={styles['special-content']}>
                <div className={styles['special-content__title']}>Đối tác tin cậy</div>
                <div className={styles['special-content__txt']}><FaShieldAlt /> Thông tin BĐS chính xác</div>
                <div className={styles['special-content__txt']}><FaShieldAlt /> Đã xác minh</div>
              </div>
              <div className={styles['stall__items']}>
                <Items guard data={[...posts.sellingApartments, ...posts.sellingHouses, ...posts.sellingLands]} />
              </div>
              <div className={styles['stall__more']}>
                <Link href={"/bat-dong-san?category=MuaBan"}> Xem thêm tin từ đối tác </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles['items-area']}>
          <div className="container">
            <div className={styles['stall']}>
              <h4> Dự án được quan tâm </h4>
              <div className={styles['stall__items']}>
                <Projects data={projects} />
              </div>
              <div className={styles['stall__more']}>
                <Link href={"/du-an-bat-dong-san"}> Xem thêm dự án </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles['items-area']}>
          <div className="container">
            <div className={styles['review']}>
              <h5>BẤT ĐỘNG SẢN ĐIỀN KHÔI</h5>
              <p>Chợ Tốt Nhà (nha.chotot.com) Chuyên trang mua bán và cho thuê bất động sản được ra mắt bởi trang mua bán trực tuyến Chợ Tốt vào đầu năm 2017. Với hơn 5 triệu lượt truy cập và hơn 200.000 tin đăng phân bố khắp các tỉnh thành trong cả nước mỗi tháng, Chợ Tốt Nhà hướng tới là một trang mua bán bất động sản hiệu quả, dễ sử dụng, đa dạng lựa chọn cho người dùng.</p>
              <p>Với Chợ Tốt Nhà, bạn dễ dàng tìm kiếm mua bán/cho thuê với đa dạng loại hình bất động sản, bao gồm:</p>
              <p>Nhà đất: bạn có thể dễ dàng tìm kiếm theo diện tích, vị trí, hướng cửa chính, đáp ứng đầy đủ các nhu cầu từ tìm nhà hẻm, nhà mặt tiền, nhà phố, nhà biệt thự.
                Căn hộ chung cư: đa dạng các loại hình căn hộ từ chung cư, duplex, penthouse, căn hộ dịch vụ, căn hộ mini, tập thể, cư xá với đầy đủ tiện ích xung quanh.
                Đất: tùy vào mục đích sử dụng, vị trí và diện tích mong muốn, bạn có thể dễ dàng chọn lựa giữa hàng nghìn tin đăng đáp ứng theo nhu cầu.
                Văn phòng, mặt bằng kinh doanh: nếu bạn muốn bắt đầu kinh doanh từ việc mở quán cafe, quán ăn, kinh doanh quần áo, tiệm in ấn, sửa chữa,... thì hoàn toàn có thể tìm kiếm mặt bằng phù hợp. Nếu bạn đang tìm kiếm văn phòng làm việc thì hãy lên Chợ Tốt Nhà để tìm kiếm vị trí hợp phong thủy, diện tích sử dụng rộng rãi,... giúp việc kinh doanh trở nên thuận lợi hơn.
              </p>
              <p>Phòng trọ: dễ dàng tìm kiếm phòng trọ gần khu vực văn phòng, trường học với không gian thoáng mát, tiện di chuyển đến khu vực trung tâm.
                Mua bán và cho thuê bất động sản trên Chợ Tốt Nhà trở nên dễ dàng hơn khi bạn có thể tìm kiếm dựa trên nhu cầu cá nhân với những tin đăng mới nhất, được cập nhật thường xuyên, liên tục.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const client = initializeApollo()

    const projectsResult = await client.query<{ getProjects: ProjectInterface[] }>({
      query: GET_TOP_PROJECTS_QUERY
    })

    const topPostsResult = await client.query<TopPostsResult>({
      query: GET_TOP_POSTS_QUERY
    })

    return {
      props: {
        projects: projectsResult?.data?.getProjects ?? [],
        posts: topPostsResult.data
      },
      revalidate: 60
    }
  } catch (error) {
    return {
      props: {},
      revalidate: 60,
    }
  }
}

export default Home
