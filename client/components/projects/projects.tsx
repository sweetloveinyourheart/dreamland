import Image from "next/image";
import { FunctionComponent } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import styles from './projects.module.scss'

interface ProjectsProps {
    vertical?: boolean
}

const Projects: FunctionComponent<ProjectsProps> = ({ vertical }) => {
    return (
        <div className={styles['projects'] + (vertical ? ` ${styles['projects--vertical']}` : "")}>
            <div className={styles['col']}>
                <div className={styles['item'] + (vertical ? ` ${styles['item--vertical']}` : "")}>
                    <div className={styles['item-image']}>
                        <div className={styles['item-image__main']}>
                            <Image
                                width={380}
                                height={302}
                                src={'/img/HamubayPhanThiet.jpg'}
                                alt="#"
                            />
                        </div>
                        <div className={styles['item-image__group']}>
                            <div className={styles['group-img']} style={{ backgroundImage: 'url(/logo/banner.jpg)' }}></div>
                            <div className={styles['group-img']} style={{ backgroundImage: 'url(/img/VinhomesSmartCity.jpg)' }}></div>
                        </div>
                    </div>
                    <div className={styles['item-desc']}>
                        <div className={styles['item-detail']}>
                            <div className={styles['item-detail__name']}>
                                Vinhomes Grand Park
                            </div>
                            <div className={styles['item-detail__address']}>
                                <FaMapMarkedAlt />
                                Quận 9 - Thành phố Thủ Đức, Tp Hồ Chí Minh
                            </div>
                            <div className={styles['item-detail__price']}>14.7 - 44.4 triệu/m²</div>
                        </div>
                        {vertical
                            && (
                                <div className={styles['actions']}>
                                    <button>Xem tin mua bán</button>
                                    <button>Xem tin cho thuê</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={styles['col']}>
                <div className={styles['item'] + (vertical ? ` ${styles['item--vertical']}` : "")}>
                    <div className={styles['item-image']}>
                        <div className={styles['item-image__main']}>
                            <Image
                                width={380}
                                height={302}
                                src={'/img/HamubayPhanThiet.jpg'}
                                alt="#"
                            />
                        </div>
                        <div className={styles['item-image__group']}>
                            <div className={styles['group-img']} style={{ backgroundImage: 'url(/logo/banner.jpg)' }}></div>
                            <div className={styles['group-img']} style={{ backgroundImage: 'url(/img/VinhomesSmartCity.jpg)' }}></div>
                        </div>
                    </div>
                    <div className={styles['item-desc']}>
                        <div className={styles['item-detail']}>
                            <div className={styles['item-detail__name']}>
                                Vinhomes Grand Park
                            </div>
                            <div className={styles['item-detail__address']}>
                                <FaMapMarkedAlt />
                                Quận 9 - Thành phố Thủ Đức, Tp Hồ Chí Minh
                            </div>
                            <div className={styles['item-detail__price']}>14.7 - 44.4 triệu/m²</div>
                        </div>
                        {vertical
                            && (
                                <div className={styles['actions']}>
                                    <button>Xem tin mua bán</button>
                                    <button>Xem tin cho thuê</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={styles['col']}>
                <div className={styles['item'] + (vertical ? ` ${styles['item--vertical']}` : "")}>
                    <div className={styles['item-image']}>
                        <div className={styles['item-image__main']}>
                            <Image
                                width={380}
                                height={302}
                                src={'/img/HamubayPhanThiet.jpg'}
                                alt="#"
                            />
                        </div>
                        <div className={styles['item-image__group']}>
                            <div className={styles['group-img']} style={{ backgroundImage: 'url(/logo/banner.jpg)' }}></div>
                            <div className={styles['group-img']} style={{ backgroundImage: 'url(/img/VinhomesSmartCity.jpg)' }}></div>
                        </div>
                    </div>
                    <div className={styles['item-desc']}>
                        <div className={styles['item-detail']}>
                            <div className={styles['item-detail__name']}>
                                Vinhomes Grand Park
                            </div>
                            <div className={styles['item-detail__address']}>
                                <FaMapMarkedAlt />
                                Quận 9 - Thành phố Thủ Đức, Tp Hồ Chí Minh
                            </div>
                            <div className={styles['item-detail__price']}>14.7 - 44.4 triệu/m²</div>
                        </div>
                        {vertical
                            && (
                                <div className={styles['actions']}>
                                    <button>Xem tin mua bán</button>
                                    <button>Xem tin cho thuê</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={styles['col']}>
                <div className={styles['item'] + (vertical ? ` ${styles['item--vertical']}` : "")}>
                    <div className={styles['item-image']}>
                        <div className={styles['item-image__main']}>
                            <Image
                                width={380}
                                height={302}
                                src={'/img/HamubayPhanThiet.jpg'}
                                alt="#"
                            />
                        </div>
                        <div className={styles['item-image__group']}>
                            <div className={styles['group-img']} style={{ backgroundImage: 'url(/logo/banner.jpg)' }}></div>
                            <div className={styles['group-img']} style={{ backgroundImage: 'url(/img/VinhomesSmartCity.jpg)' }}></div>
                        </div>
                    </div>
                    <div className={styles['item-desc']}>
                        <div className={styles['item-detail']}>
                            <div className={styles['item-detail__name']}>
                                Vinhomes Grand Park
                            </div>
                            <div className={styles['item-detail__address']}>
                                <FaMapMarkedAlt />
                                Quận 9 - Thành phố Thủ Đức, Tp Hồ Chí Minh
                            </div>
                            <div className={styles['item-detail__price']}>14.7 - 44.4 triệu/m²</div>
                        </div>
                        {vertical
                            && (
                                <div className={styles['actions']}>
                                    <button>Xem tin mua bán</button>
                                    <button>Xem tin cho thuê</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;