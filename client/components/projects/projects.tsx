import Image from "next/image";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { moneyConverter } from "../../lib/converter";
import { ProjectInterface } from "../../types/interfaces/project";
import styles from './projects.module.scss'

interface ProjectsProps {
    vertical?: boolean
    data: ProjectInterface[]
}

const Projects: FunctionComponent<ProjectsProps> = ({ vertical, data }) => {

    const router = useRouter()

    const renderData = (): JSX.Element | JSX.Element[] => {
        if (data.length === 0) return <div > Loading ... </div>

        return data.map((el, index) => {
            return (
                <div className={styles['col']} key={index}>
                    <div className={styles['item'] + (vertical ? ` ${styles['item--vertical']}` : "")}>
                        <div className={styles['item-image']} onClick={() => router.push(`/du-an/${el.directLink}`)}>
                            <div className={styles['item-image__main']}>
                                <Image
                                    width={380}
                                    height={302}
                                    src={el.media.images[0]}
                                    alt="#"
                                />
                            </div>
                            <div className={styles['item-image__group']}>
                                {el.media?.images[1] && <div className={styles['group-img']} style={{ backgroundImage: `url(${el.media?.images[1]})` }}></div>}
                                {el.media?.images[2] && <div className={styles['group-img']} style={{ backgroundImage: `url(${el.media?.images[2]})` }}></div>}
                            </div>
                        </div>
                        <div className={styles['item-desc']}>
                            <div className={styles['item-detail']} onClick={() => router.push(`/du-an/${el.directLink}`)}>
                                <div className={styles['item-detail__name']}>
                                    {el.projectName}
                                </div>
                                <div className={styles['item-detail__address']}>
                                    <FaMapMarkedAlt />
                                    {el.address.district}, {el.address.province}
                                </div>
                                <div className={styles['item-detail__price']}>{moneyConverter(el.information?.purchaseInfo ?? 0)}</div>
                            </div>
                            {vertical
                                && (
                                    <div className={styles['actions']}>
                                        <button onClick={() => router.push(`du-an/${el.directLink}`)}>Xem thông tin dự án</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className={styles['projects'] + (vertical ? ` ${styles['projects--vertical']}` : "")}>
            {renderData()}
        </div>
    );
}

export default Projects;