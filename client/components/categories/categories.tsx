import Image from "next/image";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import styles from './categories.module.scss'

interface MainCategoriesProps {

}

const MainCategories: FunctionComponent<MainCategoriesProps> = () => {

    const router = useRouter()

    return (
        <section className={styles['categories']}>
            <div className={"container"}>
                <div className={styles['categories-area']}>
                    <h4> Danh mục bất động sản </h4>
                    <div className={styles['categories-list']}>
                        <div className={styles["category"]} onClick={() => router.push("/mua-ban-bat-dong-san")}>
                            <div className={styles['category__image']}>
                                <Image
                                    src={"/categories/buildings.png"}
                                    width={40}
                                    height={40}
                                    alt=""
                                />
                            </div>
                            <div className={styles['category__content']}>
                                <h5> Mua Bán </h5>
                                <span>{Intl.NumberFormat().format(66825)} tin mua bán</span>
                            </div>
                        </div>
                        <div className={styles["category"]}>
                            <div className={styles['category__image']}>
                                <Image
                                    src={"/categories/creditor.png"}
                                    width={40}
                                    height={40}
                                    alt=""
                                />
                            </div>
                            <div className={styles['category__content']}>
                                <h5> Cho thuê </h5>
                                <span>{Intl.NumberFormat().format(66825)} tin cho thuê</span>
                            </div>
                        </div>
                        <div className={styles["category"]} onClick={() => router.push("/du-an-bat-dong-san")}>
                            <div className={styles['category__image']}>
                                <Image
                                    src={"/categories/construction.png"}
                                    width={40}
                                    height={40}
                                    alt=""
                                />
                            </div>
                            <div className={styles['category__content']}>
                                <h5> Dự án </h5>
                                <span>{Intl.NumberFormat().format(66825)} dự án</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </section>
    );
}

export default MainCategories;