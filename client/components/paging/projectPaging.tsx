import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { STEP } from "../../pages/du-an-bat-dong-san";
import { PaginationFilter } from "../../types/interfaces/realEstate";
import styles from './paging.module.scss'

interface PagingProps {
    data: { projects: number }
    paging: PaginationFilter | undefined
}

const ProjectPaging: FunctionComponent<PagingProps> = ({ data, paging }) => {
    const [items, setItems] = useState<number>(STEP)

    const router = useRouter()

    useEffect(() => {
        setItems(data.projects)
    }, [data])

    const selectPage = useCallback((page: number) => {
        router.push({
            query: {
                ...router.query,
                page
            }
        })
    }, [paging, router])

    const renderItems = () => {
        const groupCount = Math.ceil(items / STEP)

        const arr = new Array(groupCount).fill("")
        return arr.map((elm, id) => {
            return (
                <div
                    className={
                        styles['paging__number'] +
                        (Math.ceil((paging?.cursor ?? 0) / STEP) === id
                            ? ` ${styles['paging__number--active']}`
                            : ""
                        )
                    }
                    key={id}
                    onClick={() => selectPage(id + 1)}
                >
                    <span>{id + 1}</span>
                </div>
            )
        })
    }

    return (
        <div className={styles['paging-area']}>
            <div className="container">
                <div className={styles['paging']}>
                    <div className={styles['paging__prev'] + ` ${styles['paging__prev--disable']}`}>
                        <FaAngleLeft />
                    </div>
                    {renderItems()}
                    <div className={styles['paging__next']}>
                        <FaAngleRight />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectPaging;