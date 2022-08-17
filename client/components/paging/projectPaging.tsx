import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { STEP } from "../../pages/du-an-bat-dong-san";
import { PaginationFilter } from "../../types/interfaces/realEstate";
import styles from './paging.module.scss'
import ReactPaginate from 'react-paginate';

interface PagingProps {
    data: { projects: number }
    paging: PaginationFilter | undefined
}

const ProjectPaging: FunctionComponent<PagingProps> = ({ data, paging }) => {
    const [pageCount, setPageCount] = useState(0)

    const router = useRouter()

    useEffect(() => {
        let groupCount = Math.ceil(data.projects / STEP)
        setPageCount(groupCount)
    }, [data])

    const selectPage = useCallback((page: number) => {
        router.push({
            query: {
                ...router.query,
                page
            }
        })
    }, [paging, router])

    return (
        <div className={styles['paging-area']}>
            <div className="container">
                <div className={styles['paging']}>
                    <ReactPaginate
                        className={styles.paging}
                        pageClassName={styles['paging__number']}
                        activeClassName={styles['paging__number--active']}
                        disabledClassName={styles['paging__prev--disable']}
                        breakLabel="..."
                        nextLabel={
                            <div className={styles['paging__next']}>
                                <FaAngleRight />
                            </div>
                        }
                        onPageChange={({ selected }) => selectPage(selected + 1)}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel={
                            <div className={styles['paging__prev']}>
                                <FaAngleLeft />
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default ProjectPaging;