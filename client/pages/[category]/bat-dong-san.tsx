import { useLazyQuery } from "@apollo/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { FaGripHorizontal } from "react-icons/fa";
import Filter from "../../components/filter/filter";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import Items, { ItemDataDisplay } from "../../components/items/items";
import Paging from "../../components/paging/paging";
import { useAddress } from "../../contexts/address";
import {
    AllPostsResult,
    AllPostsVars,
    ApartmentPostResult,
    ApartmentPostVars,
    BusinessPremisesPostResult,
    BusinessPremisesPostVars,
    GET_ALL_POSTS,
    GET_APARTMENT_POSTS,
    GET_BUSINESS_PREMISES_POSTS,
    GET_HOUSE_POSTS,
    GET_LAND_POSTS,
    GET_MOTAL_POSTS,
    HousePostResult,
    HousePostVars,
    LandPostResult,
    LandPostVars,
    MotalPostsResult,
    MotalPostsVars
} from "../../graphql/queries/browsingPost";
import { GET_REAL_ESTATE_PAGING_DATA, RealEstatePagingVars, RealEstatePagingData, RealEstatePaging } from "../../graphql/queries/paging";
import { initializeApollo } from "../../lib/apolloClient";
import { categorySpeaker } from "../../lib/converter";
import { FilterState, GuardFilter } from "../../lib/guardFilter";
import styles from '../../styles/pages/bat-dong-san.module.scss'
import { RealEstateCategory, RealEstateType } from "../../types/enums/realEstate";
import { PaginationFilter } from "../../types/interfaces/realEstate";

interface BrowsingPageProps {
    data: ItemDataDisplay[]
    category: RealEstateCategory | null
    pagingData: RealEstatePaging | null
}

export const INIT_CURSOR = 0
export const INIT_LIMIT = 2
export const STEP = 2

const RealEstateBrowsingPage: NextPage<BrowsingPageProps> = ({ data, category, pagingData }) => {
    const [posts, setPosts] = useState<ItemDataDisplay[]>([])
    const [type, setType] = useState<RealEstateType | "All" | undefined>()
    const [isVerticalDisplay, setVerticalDisplay] = useState(true)
    const [filter, setFilter] = useState<any>()
    const [paging, setPaging] = useState<PaginationFilter>({
        limit: INIT_LIMIT,
        cursor: INIT_CURSOR
    })
    const [search, setSearch] = useState<string | undefined>()

    let router = useRouter()
    const { getAddress } = useAddress()

    const [getAllPosts, { data: allPostsData, error: allPostsErr }] =
        useLazyQuery<AllPostsResult, AllPostsVars>(GET_ALL_POSTS, {
            notifyOnNetworkStatusChange: true,
            variables: {
                filter,
                paging: { cursor: paging.cursor, limit: Math.ceil(INIT_LIMIT / 1) },
                search
            }
        })

    const [getApartments, { data: apartmentsData, error: apartmentsErr }] =
        useLazyQuery<ApartmentPostResult, ApartmentPostVars>(GET_APARTMENT_POSTS, {
            notifyOnNetworkStatusChange: true,
            variables: {
                filter,
                paging
            }
        })

    const [getHouses, { data: housesData, error: housesErr }] =
        useLazyQuery<HousePostResult, HousePostVars>(GET_HOUSE_POSTS, {
            notifyOnNetworkStatusChange: true,
            variables: {
                filter,
                paging
            }
        })

    const [getLands, { data: landsData, error: landsErr }] =
        useLazyQuery<LandPostResult, LandPostVars>(GET_LAND_POSTS, {
            notifyOnNetworkStatusChange: true,
            variables: {
                filter,
                paging
            }
        })

    const [getBusinessPremises, { data: businessPremisesData, error: businessPremisesErr }] =
        useLazyQuery<BusinessPremisesPostResult, BusinessPremisesPostVars>(GET_BUSINESS_PREMISES_POSTS, {
            notifyOnNetworkStatusChange: true,
            variables: {
                filter,
                paging
            }
        })

    const [getMotals, { data: motalsData, error: motalsErr }] =
        useLazyQuery<MotalPostsResult, MotalPostsVars>(GET_MOTAL_POSTS, {
            notifyOnNetworkStatusChange: true,
            variables: {
                filter,
                paging
            }
        })

    // Set filter and paging from query
    useEffect(() => {
        const { query } = router

        // "category" field is required, so query field must > 1
        if (Object.keys(query).length > 1) {
            // extract filter from URL query 
            let address = getAddress(Number(query?.province), Number(query?.district), Number(query?.ward))
            let price = {
                ...(query?.price && { min: Number(String(query.price).split('-')[0]) }),
                ...(query?.price && { max: Number(String(query.price).split('-')[1]) })
            }

            let acreage = {
                ...((GuardFilter(FilterState.Acreage, type) && query?.acreage) && { min: Number(String(query.acreage).split('-')[0]) }),
                ...((GuardFilter(FilterState.Acreage, type) && query?.acreage) && { max: Number(String(query.acreage).split('-')[1]) })
            }

            let direction = {
                ...((query?.direction && type === RealEstateType.CanHo) && { balconyDirection: query.direction }),
                ...((query?.direction && type === RealEstateType.NhaO) && { doorDirection: query.direction }),
                ...((query?.direction && type === RealEstateType.Dat) && { doorDirection: query.direction }),
                ...((query?.direction && type === RealEstateType.CanHo) && { doorDirection: query.direction }),
            }

            // collect filter data
            let newFilter = {
                ...({ category }),
                ...(Object.keys(address).length !== 0 && { address }),
                ...(Object.keys(price).length !== 0 && { price }),
                ...(query?.project && { project: query.project }),
                ...(Object.keys(acreage).length !== 0 && { acreage }),
                ...(query?.rooms && { numberOfBedrooms: Number(query.rooms) }),
                ...(Object.keys(direction) && { ...direction }),
                ...(query?.special && { type: query.special }),
            }

            setFilter(newFilter)

            // collect paging data
            let page = query?.page
            if (page) {
                setPaging(s => ({ ...s, cursor: (Number(page) - 1) * STEP }))
            }

            // collect search data
            let search = query?.search
            if (search) {
                setSearch(String(search))
            }

            // set type
            setType(query?.type ? String(query.type) as RealEstateType : "All")
        } else {
            setFilter({ category })
            setType(undefined)
        }
    }, [router.query])

    // trigger GraphQL Query
    useEffect(() => {
        switch (type) {
            case "All":
                getAllPosts()
                return;

            case RealEstateType.CanHo:
                getApartments()
                return;

            case RealEstateType.NhaO:
                getHouses()
                return;

            case RealEstateType.Dat:
                getLands()
                return;

            case RealEstateType.VanPhong:
                getBusinessPremises()
                return;

            case RealEstateType.PhongTro:
                getMotals()
                return;

            default:
                setPosts(data)
                return;
        }

    }, [type, filter, paging, search])

    // collect data
    useEffect(() => {
        if (type === "All" && allPostsData) {
            return setPosts([
                ...allPostsData.posts.apartments,
                ...allPostsData.posts.houses,
                ...allPostsData.posts.lands,
                ...allPostsData.posts.businessPremises,
                ...((category === RealEstateCategory.ChoThue) ? allPostsData.posts.motals : [])
            ])
        }

        if (type === RealEstateType.CanHo && apartmentsData) {
            return setPosts(apartmentsData.apartments)
        }

        if (type === RealEstateType.NhaO && housesData) {
            return setPosts(housesData.houses)
        }

        if (type === RealEstateType.Dat && landsData) {
            return setPosts(landsData.lands)
        }

        if (type === RealEstateType.VanPhong && businessPremisesData) {
            return setPosts(businessPremisesData.businessPremises)
        }

        if (type === RealEstateType.PhongTro && motalsData) {
            return setPosts(motalsData.motals)
        }

    }, [type, allPostsData, apartmentsData, housesData, landsData, businessPremisesData, motalsData])

    const findByType = useCallback((type: RealEstateType) => {
        router.push({
            query: {
                ...router.query,
                type
            }
        })
    }, [router.query])

    if (!category || !pagingData) return <></>

    return (
        <>
            <Head>
                <title>{categorySpeaker(category)} bất động sản</title>
                <meta name="name" content="Chợ Tốt - Website Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt" />
                <meta name="description" content="Cập nhật giá cả mua bán bất động sản Toàn quốc mới nhất tháng 04/2022. Thông tin bất động sản rõ ràng. Sắp xếp theo nhu cầu dễ chọn lựa" />
            </Head>
            <Header />
            <main style={{ backgroundColor: 'rgba(244,244,244, 0.8)', padding: '64px 0' }}>
                <Filter filter={filter} type={type} />
                <div className="container">
                    <div className={styles['type-selector']}>
                        <div
                            className={`${styles['selector-item']} ${type === RealEstateType.CanHo ? `${styles['selector-item--active']}` : ""}`}
                            onClick={() => findByType(RealEstateType.CanHo)}
                        >
                            <div className={styles['selector-item__image']}>
                                <div><Image width={36} height={36} alt="" src={'https://res.cloudinary.com/dienkhoiland/image/upload/v1656328726/icons/office-building_bo5g9z.png'} /></div>
                            </div>
                            <p>Căn hộ, Chung cư</p>
                        </div>
                        <div
                            className={`${styles['selector-item']} ${type === RealEstateType.NhaO ? `${styles['selector-item--active']}` : ""}`}
                            onClick={() => findByType(RealEstateType.NhaO)}
                        >
                            <div className={styles['selector-item__image']}>
                                <div><Image width={36} height={36} alt="" src={'https://res.cloudinary.com/dienkhoiland/image/upload/v1656328726/icons/home_wt8cwv.png'} /></div>
                            </div>
                            <p>Nhà ở</p>
                        </div>
                        <div
                            className={`${styles['selector-item']} ${type === RealEstateType.Dat ? `${styles['selector-item--active']}` : ""}`}
                            onClick={() => findByType(RealEstateType.Dat)}
                        >
                            <div className={styles['selector-item__image']}>
                                <div><Image width={36} height={36} alt="" src={'https://res.cloudinary.com/dienkhoiland/image/upload/v1656328726/icons/area_khe2ww.png'} /></div>
                            </div>
                            <p>Đất đai</p>
                        </div>
                        <div
                            className={`${styles['selector-item']} ${type === RealEstateType.VanPhong ? `${styles['selector-item--active']}` : ""}`}
                            onClick={() => findByType(RealEstateType.VanPhong)}
                        >
                            <div className={styles['selector-item__image']}>
                                <div> <Image width={36} height={36} alt="" src={'https://res.cloudinary.com/dienkhoiland/image/upload/v1656328726/icons/enterprise_qfkzhi.png'} /></div>
                            </div>
                            <p>Văn phòng, Mặt bằng</p>
                        </div>
                        {filter?.category === RealEstateCategory.ChoThue
                            && (
                                <div
                                    className={`${styles['selector-item']} ${type === RealEstateType.PhongTro ? `${styles['selector-item--active']}` : ""}`}
                                    onClick={() => findByType(RealEstateType.PhongTro)}
                                >
                                    <div className={styles['selector-item__image']}>
                                        <div><Image width={36} height={36} alt="" src={'https://res.cloudinary.com/dienkhoiland/image/upload/v1656328726/icons/house_tdwfkw.png'} /></div>
                                    </div>
                                    <p>Nhà trọ</p>
                                </div>
                            )
                        }
                    </div>
                    <div className={styles['filter-area']}>
                        <div className={styles['filter']}>
                            <div className={`${styles['filter__item']} ${styles['filter__item--active']}`}>Tất cả</div>
                            {/* <div className={styles['filter__item']}>Cá nhân</div>
                            <div className={styles['filter__item']}>Môi giới</div> */}
                        </div>
                        <div className={styles['display']}>
                            <button onClick={() => setVerticalDisplay(s => !s)}><FaGripHorizontal /></button>
                        </div>
                    </div>
                    <div className={styles['items-area']}>
                        <Items vertical={isVerticalDisplay} data={posts} />
                    </div>
                </div>
                <Paging type={type} data={pagingData} paging={paging} />
            </main>
            <Footer />
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { category: 'mua-ban' } },
            { params: { category: 'cho-thue' } }
        ],
        fallback: false // true or 'blocking'
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    try {
        const client = initializeApollo()

        const category = context.params?.category

        const result = await client.query<AllPostsResult, AllPostsVars>({
            query: GET_ALL_POSTS,
            variables: {
                filter: {
                    category: category === "cho-thue" ? "ChoThue" : "MuaBan"
                },
                paging: { cursor: INIT_CURSOR, limit: Math.ceil(INIT_LIMIT / 1) }
            }
        })

        const paging = await client.query<RealEstatePagingData, RealEstatePagingVars>({
            query: GET_REAL_ESTATE_PAGING_DATA,
            variables: {
                category: category === "cho-thue" ? "ChoThue" : "MuaBan"
            }
        })

        return {
            props: {
                data: [
                    ...result.data?.posts.apartments,
                    ...result.data?.posts.houses,
                    ...result.data?.posts.lands,
                    ...result.data?.posts.businessPremises,
                    ...((category === "cho-thue") ? result.data?.posts.motals : [])
                ],
                category: category === "cho-thue" ? "ChoThue" : "MuaBan",
                pagingData: paging.data.stats
            },
            revalidate: 60
        }
    } catch (error) {
        return {
            props: {
                data: [],
                category: "MuaBan",
                pagingData: {
                    stats: {
                        apartments: 0,
                        houses: 0,
                        lands: 0,
                        businessPremises: 0,
                        motals: 0,
                    }
                }
            },
            revalidate: 60,
        }
    }
}


export default RealEstateBrowsingPage
