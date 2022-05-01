import Image from "next/image";
import { FunctionComponent } from "react";
import { FaClock, FaShieldAlt } from "react-icons/fa";
import styles from './items.module.scss'

interface ItemsProps {
    vertical?: boolean
    guard?: boolean
}

const Items: FunctionComponent<ItemsProps> = ({ guard, vertical }) => {
    return (
        <div className={styles['items'] + (vertical ? ` ${styles['items--vertical']}` : "")}>
            <div className={styles['col']}>
                <div className={styles['item'] + (vertical ? ` ${styles['item--vertical']}` : "")}>
                    <div className={styles['item__image']}>
                        <Image
                            width={200}
                            height={200}
                            alt=""
                            src={'/img/items1.jpg'}
                        />
                    </div>
                    <div className={styles['item-desc']}>
                        <div className={styles['item-desc__name']}>
                            {guard && <span><FaShieldAlt /> Đối Tác</span>}
                            Bán nhà mặt tiền Kinh doanh đa ngành nghề Bình Tân
                        </div>
                        <div className={styles['item-desc__acreage']}>60 m² - 5 PN</div>
                        <div className={styles['item-desc__price']}>3.55 tỷ</div>
                        <div className={styles['item-detail'] + (vertical ? ` ${styles['item-detail--vertical']}` : "")}>
                            <div className={styles['item-detail__timestamp']}>
                                <FaClock />
                                &nbsp;
                                <p>1 ngày</p>
                            </div>
                            <div className={styles['item-detail__address']}>TP. Hồ Chí Minh</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['col']}>
                <div className={styles['item'] + (vertical ? ` ${styles['item--vertical']}` : "")}>
                    <div className={styles['item__image']}>
                        <Image
                            width={200}
                            height={200}
                            alt=""
                            src={'/img/items2.jpg'}
                        />
                    </div>
                    <div className={styles['item-desc']}>
                        <div className={styles['item-desc__name']}>
                            {guard && <span><FaShieldAlt /> Đối Tác</span>}
                            Bán nhà mặt tiền Kinh doanh đa ngành nghề Bình Tân
                        </div>
                        <div className={styles['item-desc__acreage']}>60 m² - 5 PN</div>
                        <div className={styles['item-desc__price']}>3.55 tỷ</div>
                        <div className={styles['item-detail'] + (vertical ? ` ${styles['item-detail--vertical']}` : "")}>
                            <div className={styles['item-detail__timestamp']}>
                                <FaClock />
                                &nbsp;
                                <p>1 ngày</p>
                            </div>
                            <div className={styles['item-detail__address']}>TP. Hồ Chí Minh</div>

                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['col']}>
                <div className={styles['item'] + (vertical ? ` ${styles['item--vertical']}` : "")}>
                    <div className={styles['item__image']}>
                        <Image
                            width={200}
                            height={200}
                            alt=""
                            src={'/img/items1.jpg'}
                        />
                    </div>
                    <div className={styles['item-desc']}>
                        <div className={styles['item-desc__name']}>
                            {guard && <span><FaShieldAlt /> Đối Tác</span>}
                            Bán nhà mặt tiền Kinh doanh đa ngành nghề Bình Tân
                        </div>
                        <div className={styles['item-desc__acreage']}>60 m² - 5 PN</div>
                        <div className={styles['item-desc__price']}>3.55 tỷ</div>
                        <div className={styles['item-detail'] + (vertical ? ` ${styles['item-detail--vertical']}` : "")}>
                            <div className={styles['item-detail__timestamp']}>
                                <FaClock />
                                &nbsp;
                                <p>1 ngày</p>
                            </div>
                            <div className={styles['item-detail__address']}>TP. Hồ Chí Minh</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['col']}>
                <div className={styles['item'] + (vertical ? ` ${styles['item--vertical']}` : "")}>
                    <div className={styles['item__image']}>
                        <Image
                            width={200}
                            height={200}
                            alt=""
                            src={'/img/items2.jpg'}
                        />
                    </div>
                    <div className={styles['item-desc']}>
                        <div className={styles['item-desc__name']}>
                            {guard && <span><FaShieldAlt /> Đối Tác</span>}
                            Bán nhà mặt tiền Kinh doanh đa ngành nghề Bình Tân
                        </div>
                        <div className={styles['item-desc__acreage']}>60 m² - 5 PN</div>
                        <div className={styles['item-desc__price']}>3.55 tỷ</div>
                        <div className={styles['item-detail'] + (vertical ? ` ${styles['item-detail--vertical']}` : "")}>
                            <div className={styles['item-detail__timestamp']}>
                                <FaClock />
                                &nbsp;
                                <p>1 ngày</p>
                            </div>
                            <div className={styles['item-detail__address']}>TP. Hồ Chí Minh</div>

                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['col']}>
                <div className={styles['item'] + (vertical ? ` ${styles['item--vertical']}` : "")}>
                    <div className={styles['item__image']}>
                        <Image
                            width={200}
                            height={200}
                            alt=""
                            src={'/img/items1.jpg'}
                        />
                    </div>
                    <div className={styles['item-desc']}>
                        <div className={styles['item-desc__name']}>
                            {guard && <span><FaShieldAlt /> Đối Tác</span>}
                            Bán nhà mặt tiền Kinh doanh đa ngành nghề Bình Tân
                        </div>
                        <div className={styles['item-desc__acreage']}>60 m² - 5 PN</div>
                        <div className={styles['item-desc__price']}>3.55 tỷ</div>
                        <div className={styles['item-detail'] + (vertical ? ` ${styles['item-detail--vertical']}` : "")}>
                            <div className={styles['item-detail__timestamp']}>
                                <FaClock />
                                &nbsp;
                                <p>1 ngày</p>
                            </div>
                            <div className={styles['item-detail__address']}>TP. Hồ Chí Minh</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Items;