import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { GET_STATS } from "../../graphql/queries/homePage";
import { Container } from "../../UI/gridSystem";
import styles from './categories.module.scss'

interface MainCategoriesProps {

}

const MainCategories: FunctionComponent<MainCategoriesProps> = () => {
    const [sellingPosts, setSellingPosts] = useState<number>(0)
    const [rentingPosts, setRentingPosts] = useState<number>(0)
    const [projects, setProjects] = useState<number>(0)

    const { data, error } = useQuery(GET_STATS)

    useEffect(() => {
        if(data && !error) {
            setSellingPosts(
                data.sellingPosts.apartments + 
                data.sellingPosts.houses + 
                data.sellingPosts.lands +
                data.sellingPosts.businessPremises
            )
            setRentingPosts(
                data.rentingPosts.apartments + 
                data.rentingPosts.houses + 
                data.rentingPosts.lands +
                data.rentingPosts.businessPremises
            )
            setProjects(data.projects.projects)
        }
    }, [data, error])

    const router = useRouter()

    return (
        <section className={styles['categories']}>
            <Container>
                <div className={styles['categories-area']}>
                    <h4> Danh mục bất động sản </h4>
                    <div className={styles['categories-list']}>
                        <div className={styles["category"]} onClick={() => router.push("/mua-ban/bat-dong-san")}>
                            <div className={styles['category__image']}>
                                <Image
                                    src={"https://res.cloudinary.com/dienkhoiland/image/upload/v1656328593/icons/buildings_y7bf9u.png"}
                                    width={40}
                                    height={40}
                                    alt=""
                                />
                            </div>
                            <div className={styles['category__content']}>
                                <h5> Mua Bán </h5>
                                <span>{Intl.NumberFormat().format(sellingPosts)} tin mua bán</span>
                            </div>
                        </div>
                        <div className={styles["category"]} onClick={() => router.push("/cho-thue/bat-dong-san")}>
                            <div className={styles['category__image']}>
                                <Image
                                    src={"https://res.cloudinary.com/dienkhoiland/image/upload/v1656328593/icons/creditor_m4e5oa.png"}
                                    width={40}
                                    height={40}
                                    alt=""
                                />
                            </div>
                            <div className={styles['category__content']}>
                                <h5> Cho thuê </h5>
                                <span>{Intl.NumberFormat().format(rentingPosts)} tin cho thuê</span>
                            </div>
                        </div>
                        <div className={styles["category"]} onClick={() => router.push("/du-an-bat-dong-san")}>
                            <div className={styles['category__image']}>
                                <Image
                                    src={"https://res.cloudinary.com/dienkhoiland/image/upload/v1656328593/icons/construction_yb5t5k.png"}
                                    width={40}
                                    height={40}
                                    alt=""
                                />
                            </div>
                            <div className={styles['category__content']}>
                                <h5> Dự án </h5>
                                <span>{Intl.NumberFormat().format(projects)} dự án</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <div></div>
        </section>
    );
}

export default MainCategories;