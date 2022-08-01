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
import { GetOutstandingPostData, GET_OUTSTANDING_POSTS, GET_TOP_POSTS_QUERY, GET_TOP_PROJECTS_QUERY, OutstandingPost, TopPostsResult } from '../graphql/queries/homePage'
import { GET_PAGE_TEMPLATE } from '../graphql/queries/introPage'
import { initializeApollo } from '../lib/apolloClient'
import { ProjectInterface } from '../types/interfaces/project'
import { Container } from '../UI/gridSystem'
import styles from './../styles/pages/home.module.scss'

interface HomePageProps {
  template: {
    banner: {
      imgUrl: string
      directLink: string | null
    } | null
  }
  projects: ProjectInterface[]
  posts: TopPostsResult
  outstandingPosts: OutstandingPost
}

const Home: NextPage<HomePageProps> = ({ projects, posts, outstandingPosts, template }) => {
  return (
    <>
      <Head>
        <title> ĐIỀN KHÔI LAND </title>
        <link rel="icon" href="https://res.cloudinary.com/dienkhoiland/image/upload/v1656394563/logo/LOGO-DIEN-KHOI_amhn6i.ico" />
        <meta name="description" content="Hệ sinh thái dịch vụ bất động sản số 1 - Điền Khôi Land đang ngày càng hoàn thiện dịch vụ môi giới, truyền thông, đầu tư và quản lý bất động sản" />
      </Head>
      <Header />
      <main style={{ backgroundColor: 'rgba(244,244,244, 0.8)' }}>
        <MainBanner banner={template.banner} />
        <MainCategories />
        <section className={styles['items-area']}>
          <Container>
            <div className={styles['stall']}>
              <h4> Mua bán bất động sản </h4>
              <div className={styles['stall__items']}>
                <Items data={[...posts.sellingApartments, ...posts.sellingHouses, ...posts.sellingLands]} />
              </div>
              <div className={styles['stall__more']}>
                <Link href={"/mua-ban/bat-dong-san"}> Xem thêm tin mua bán</Link>
              </div>
            </div>
          </Container>
        </section>

        <section className={styles['items-area']}>
          <Container>
            <div className={styles['stall']}>
              <h4> Cho thuê bất động sản </h4>
              <div className={styles['stall__items']}>
                <Items data={[...posts.rentingApartments, ...posts.rentingHouses, ...posts.rentingLands]} />
              </div>
              <div className={styles['stall__more']}>
                <Link href={"/cho-thue/bat-dong-san"}> Xem thêm tin cho thuê </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className={styles['items-area']}>
          <Container>
            <div className={styles['stall']}>
              <h4> Bất động sản nổi bật </h4>
              <div className={styles['special-content']}>
                <div className={styles['special-content__title']}>Đối tác tin cậy</div>
                <div className={styles['special-content__txt']}><FaShieldAlt /> Thông tin BĐS chính xác</div>
                <div className={styles['special-content__txt']}><FaShieldAlt /> Đã xác minh</div>
              </div>
              <div className={styles['stall__items']}>
                <Items guard data={[...outstandingPosts.apartments, ...outstandingPosts.houses, ...outstandingPosts.lands, ...outstandingPosts.businessPremises, ...outstandingPosts.motals]} />
              </div>
            </div>
          </Container>
        </section>

        <section className={styles['items-area']}>
          <Container>
            <div className={styles['stall']}>
              <h4> Dự án được quan tâm </h4>
              <div className={styles['stall__items']}>
                <Projects data={projects} />
              </div>
              <div className={styles['stall__more']}>
                <Link href={"/du-an-bat-dong-san"}> Xem thêm dự án </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const client = initializeApollo()

    const templateResult = await client.query({
      query: GET_PAGE_TEMPLATE,
      variables: {
        pageName: "introduction"
      }
    })

    const projectsResult = await client.query<{ projects: ProjectInterface[] }>({
      query: GET_TOP_PROJECTS_QUERY
    })

    const topPostsResult = await client.query<TopPostsResult>({
      query: GET_TOP_POSTS_QUERY
    })

    const outstandingPostsResult = await client.query<GetOutstandingPostData>({
      query: GET_OUTSTANDING_POSTS
    })

    return {
      props: {
        template: templateResult?.data.template || { banner: null },
        projects: projectsResult?.data?.projects ?? [],
        posts: topPostsResult?.data ?? {
          sellingApartments: [],
          sellingHouses: [],
          sellingLands: [],
          rentingApartments: [],
          rentingHouses: [],
          rentingLands: []
        },
        outstandingPosts: outstandingPostsResult?.data.posts ?? {
          apartments: [],
          houses: [],
          lands: [],
          businessPremises: [],
          motals: []
        }
      },
      revalidate: 60
    }
  } catch (error) {
    return {
      props: {
        template: {
          banner: null
        },
        projects: [],
        posts: {
          sellingApartments: [],
          sellingHouses: [],
          sellingLands: [],
          rentingApartments: [],
          rentingHouses: [],
          rentingLands: []
        },
        outstandingPosts: {
          apartments: [],
          houses: [],
          lands: [],
          businessPremises: [],
          motals: []
        }
      },
      revalidate: 60,
    }
  }
}

export default Home
