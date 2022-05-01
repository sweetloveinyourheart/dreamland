import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { FaGripHorizontal } from "react-icons/fa";
import Filter from "../components/filter/filter";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Items from "../components/items/items";
import Paging from "../components/paging/paging";
import styles from '../styles/pages/muaban.module.scss'

const RealEstatePurchasingPage: NextPage = () => {
    const [isVerticalDisplay, setVerticalDisplay] = useState(true)

    return (
        <>
            <Head>
                <title>Mua bán bất động sản</title>
                <meta name="name" content="Chợ Tốt - Website Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt" />
                <meta name="description" content="Cập nhật giá cả mua bán bất động sản Toàn quốc mới nhất tháng 04/2022. Thông tin bất động sản rõ ràng. Sắp xếp theo nhu cầu dễ chọn lựa" />
            </Head>
            <Header />
            <main style={{ backgroundColor: "#f4f4f4", padding: '64px 0' }}>
                <Filter />
                <div className="container">
                    <div className={styles['type-selector']}>
                        <div className={styles['selector-item']}>
                            <div className={styles['selector-item__image']}>
                                <div><Image width={36} height={36} alt="" src={'/categories/office-building.png'} /></div>
                            </div>
                            <p>Căn hộ, Chung cư</p>
                        </div>
                        <div className={styles['selector-item']}>
                            <div className={styles['selector-item__image']}>
                                <div><Image width={36} height={36} alt="" src={'/categories/home.png'} /></div>
                            </div>
                            <p>Nhà ở</p>
                        </div>
                        <div className={styles['selector-item']}>
                            <div className={styles['selector-item__image']}>
                                <div><Image width={36} height={36} alt="" src={'/categories/area.png'} /></div>
                            </div>
                            <p>Đất đai</p>
                        </div>
                        <div className={styles['selector-item']}>
                            <div className={styles['selector-item__image']}>
                                <div> <Image width={36} height={36} alt="" src={'/categories/enterprise.png'} /></div>
                            </div>
                            <p>Văn phòng, Mặt bằng</p>
                        </div>
                        <div className={styles['selector-item']}>
                            <div className={styles['selector-item__image']}>
                                <div><Image width={36} height={36} alt="" src={'/categories/house.png'} /></div>
                            </div>
                            <p>Nhà trọ</p>
                        </div>
                    </div>
                    <div className={styles['filter-area']}>
                        <div className={styles['filter']}>
                            <div className={`${styles['filter__item']} ${styles['filter__item--active']}`}>Tất cả</div>
                            <div className={styles['filter__item']}>Cá nhân</div>
                            <div className={styles['filter__item']}>Môi giới</div>
                        </div>
                        <div className={styles['display']}>
                            <button onClick={() => setVerticalDisplay(s => !s)}><FaGripHorizontal /></button>
                        </div>
                    </div>
                    <div className={styles['items-area']}>
                        <Items vertical={isVerticalDisplay}/>
                    </div>
                </div>
                <Paging />
            </main>
            <Footer />
        </>
    )
}

export default RealEstatePurchasingPage