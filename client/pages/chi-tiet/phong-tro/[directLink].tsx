import Head from "next/head";
import { FunctionComponent, useState } from "react";
import { FaAngleDoubleRight, FaMapMarkedAlt, FaUniversity } from "react-icons/fa";
import { BiPhone } from "react-icons/bi"
import Header from "../../../components/header/header";
import styles from '../../../styles/pages/chi-tiet.module.scss'
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
import Footer from "../../../components/footer/footer";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { initializeApollo } from "../../../lib/apolloClient";
import { GET_MOTAL_POST_BY_DIRECT_LINK } from "../../../graphql/queries/postPage";
import { RealEstateCategory } from "../../../types/enums/realEstate";
import { directionSpeaker, furnitureSpeaker, houseTypeSpeaker, legalDocumentsSpeaker, moneyConverter, userTypeSpeaker } from "../../../lib/converter";
import Maps from "../../../components/maps/maps";
import { MotalInterface } from "../../../types/interfaces/motal";
import { useQuery } from "@apollo/client";
import { GET_MOTAL_POSTS, MotalPostsResult, MotalPostsVars } from "../../../graphql/queries/browsingPost";
import PageLinks from "../../../components/links/links";
import Items from "../../../components/items/items";

interface HousePageProps {
    data: MotalInterface | null
}

const HousePage: FunctionComponent<HousePageProps> = ({ data }) => {
    const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(false)
    const [showMaps, setShowMaps] = useState<boolean>(false)


    const { data: relativePosts } = useQuery<MotalPostsResult, MotalPostsVars>(GET_MOTAL_POSTS, {
        variables: {
            filter: {
                category: data?.category || "MuaBan"
            },
            paging: {
                limit: 5,
                cursor: (data && data.index > 5) ? data?.index - 5 : 0
            }
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only'
    })

    const renderMedia = () => {
        let result;
        if (data)
            result = data.media.images.map((el, id) => {
                return (
                    <div className={styles["image"]} key={id}>
                        <img src={el} />
                        <span>
                            <Image
                                src={el}
                                width={800}
                                height={600}
                                alt="Image"
                            />
                        </span>
                        <div className={styles['image__abs']}>
                            <img src={el} />
                        </div>
                    </div>
                )
            })

        return result
    }

    if (!data) return null

    return (
        <>
            <Head>
                <title> {data.title} </title>
            </Head>
            <Header />
            <main style={{ backgroundColor: "#f4f4f4", padding: '64px 0' }}>
                <div className="container">
                    <PageLinks category={data.category} title={data.title} />
                    <div className={styles['information']}>
                        <div className={styles['information__media']}>
                            <Carousel>
                                {renderMedia()}
                            </Carousel>
                        </div>
                        <div className={styles['information__quick-info']}>
                            <div className={styles['contact']}>
                                <div className={styles['contact-owner']}>
                                    <Image src={'/logo/profile.png'} width={50} height={50} />
                                    <div className={styles['contact-owner__info']}>
                                        <h5>{data.owner.user.name}</h5>
                                        <span>{userTypeSpeaker(data.owner.type)}</span>
                                    </div>
                                </div>
                                <div className={styles['contact-phone']}>
                                    <div className={styles['contact-phone__guard']} onClick={() => setShowPhoneNumber(s => !s)}>
                                        <div className={`${styles['phone--hidden']}`}>
                                            <BiPhone />
                                            <span>
                                                {showPhoneNumber
                                                    ? (data.owner.user.phone)
                                                    : (`${data.owner.user.phone.slice(0, 4)}******`)
                                                }
                                            </span>
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
                                            <span>{data.detail.acreage.totalAcreage} m²</span>
                                        </div>
                                        {data.overview?.legalDocuments
                                            && (
                                                <div className={styles['overview-item']}>
                                                    <div className={styles['overview-item__image']}>
                                                        <Image src={"/desc/contract.png"} width={25} height={25} alt="dien-tich" />
                                                    </div>
                                                    <span>Giấy tờ pháp lý: </span>
                                                    <span>{legalDocumentsSpeaker(data.overview.legalDocuments)}</span>
                                                </div>
                                            )
                                        }
                                        {data.overview?.furniture
                                            && (
                                                <div className={styles['overview-item']}>
                                                    <div className={styles['overview-item__image']}>
                                                        <Image src={"/desc/sofa.png"} width={25} height={25} alt="dien-tich" />
                                                    </div>
                                                    <span>Tình trạng nội thất: </span>
                                                    <span>{furnitureSpeaker(data.overview.furniture)}</span>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className={styles['overview__col']}>
                                        <div className={styles['overview-item']}>
                                            <div className={styles['overview-item__image']}>
                                                <Image src={"/desc/money.png"} width={25} height={25} alt="dien-tich" />
                                            </div>
                                            <span>Giá/m2: </span>
                                            <span>{moneyConverter(data.detail.pricing.total / data.detail.acreage.totalAcreage)}/m²</span>
                                        </div>
                                        {data.overview?.doorDirection
                                            && (
                                                <div className={styles['overview-item']}>
                                                    <div className={styles['overview-item__image']}>
                                                        <Image src={"/desc/north.png"} width={25} height={25} alt="dien-tich" />
                                                    </div>
                                                    <span>Hướng cửa chính: </span>
                                                    <span>{directionSpeaker(data.overview.doorDirection)}</span>
                                                </div>
                                            )
                                        }
                                        {data.overview?.numberOfFloors
                                            && (
                                                <div className={styles['overview-item']}>
                                                    <div className={styles['overview-item__image']}>
                                                        <Image src={"/desc/numfloor.png"} width={25} height={25} alt="dien-tich" />
                                                    </div>
                                                    <span>Tổng số tầng: </span>
                                                    <span>{data.overview.numberOfFloors}</span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['area']}>
                        <div className={styles['content']}>
                            <div className={styles['name']}>
                                {data.title}
                            </div>
                            <div className={styles['price']}>
                                <span>{moneyConverter(data.detail.pricing.total)}</span>
                                <span> - {data.detail.acreage.totalAcreage} m2</span>
                            </div>
                            <div className={styles['address']}>
                                <FaMapMarkedAlt />
                                <p>{data.detail.address.showHouseNumber && data.detail.address.houseNumber}
                                    , {data.detail.address.street}
                                    , {data.detail.address.ward}
                                    , {data.detail.address.district}
                                    , {data.detail.address.province}
                                </p>
                                <span onClick={() => setShowMaps(true)}>Xem bản đồ</span>
                            </div>
                            <div className={styles['description']}>
                                {data.description}
                            </div>
                        </div>
                        <div className={styles['contact']}>
                            <div className={styles['contact-owner']}>
                                <Image src={'/logo/profile.png'} width={50} height={50} />
                                <div className={styles['contact-owner__info']}>
                                    <h5>{data.owner.user.name}</h5>
                                    <span>{userTypeSpeaker(data.owner.type)}</span>
                                </div>
                            </div>
                            <div className={styles['contact-phone']}>
                                <div className={styles['contact-phone__guard']} onClick={() => setShowPhoneNumber(s => !s)}>
                                    <div className={`${styles['phone--hidden']}`}>
                                        <BiPhone />
                                        <span>
                                            {showPhoneNumber
                                                ? (data.owner.user.phone)
                                                : (`${data.owner.user.phone.slice(0, 4)}******`)
                                            }
                                        </span>
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
                                        <span>{data.detail.acreage.totalAcreage} m²</span>
                                    </div>
                                    {data.overview?.legalDocuments
                                        && (
                                            <div className={styles['overview-item']}>
                                                <div className={styles['overview-item__image']}>
                                                    <Image src={"/desc/contract.png"} width={25} height={25} alt="dien-tich" />
                                                </div>
                                                <span>Giấy tờ pháp lý: </span>
                                                <span>{legalDocumentsSpeaker(data.overview.legalDocuments)}</span>
                                            </div>
                                        )
                                    }
                                    {data.overview?.furniture
                                        && (
                                            <div className={styles['overview-item']}>
                                                <div className={styles['overview-item__image']}>
                                                    <Image src={"/desc/sofa.png"} width={25} height={25} alt="dien-tich" />
                                                </div>
                                                <span>Tình trạng nội thất: </span>
                                                <span>{furnitureSpeaker(data.overview.furniture)}</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className={styles['overview__col']}>
                                    <div className={styles['overview-item']}>
                                        <div className={styles['overview-item__image']}>
                                            <Image src={"/desc/money.png"} width={25} height={25} alt="dien-tich" />
                                        </div>
                                        <span>Giá/m2: </span>
                                        <span>{moneyConverter(data.detail.pricing.total / data.detail.acreage.totalAcreage)}/m²</span>
                                    </div>
                                    {data.overview?.doorDirection
                                        && (
                                            <div className={styles['overview-item']}>
                                                <div className={styles['overview-item__image']}>
                                                    <Image src={"/desc/north.png"} width={25} height={25} alt="dien-tich" />
                                                </div>
                                                <span>Hướng cửa chính: </span>
                                                <span>{directionSpeaker(data.overview.doorDirection)}</span>
                                            </div>
                                        )
                                    }
                                    {data.overview?.numberOfFloors
                                        && (
                                            <div className={styles['overview-item']}>
                                                <div className={styles['overview-item__image']}>
                                                    <Image src={"/desc/numfloor.png"} width={25} height={25} alt="dien-tich" />
                                                </div>
                                                <span>Tổng số tầng: </span>
                                                <span>{data.overview.numberOfFloors}</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['stall']}>
                        <h4> Tin bất động sản liên quan </h4>
                        <div className={styles['stall__items']}>
                            <Items data={relativePosts?.motals || []} />
                        </div>
                        <div className={styles['stall__more']}>
                            <Link href={"/"}> Xem thêm tin liên quan </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Maps show={showMaps} handleShow={setShowMaps} address={data.detail.address} />
            <Footer />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const { directLink } = context.query
        if (!directLink) {
            return {
                redirect: {
                    destination: "/du-an-bat-dong-san",
                    permanent: false
                }
            }
        }

        const client = initializeApollo()
        const { data } = await client.query<{ motal: MotalInterface }>({
            query: GET_MOTAL_POST_BY_DIRECT_LINK,
            variables: {
                link: String(directLink)
            }
        })

        return {
            props: {
                data: data?.motal ?? null
            }
        }
    } catch (error) {
        return {
            props: {
                data: null
            }
        }
    }
}

export default HousePage;