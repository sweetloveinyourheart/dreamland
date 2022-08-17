import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { RealEstatePaging } from "../../graphql/queries/paging";
import { STEP } from "../../pages/[category]/bat-dong-san";
import { RealEstateType } from "../../types/enums/realEstate";
import { PaginationFilter } from "../../types/interfaces/realEstate";
import styles from './paging.module.scss'
import ReactPaginate from 'react-paginate';

interface PagingProps {
    type: RealEstateType | "All" | undefined
    data: RealEstatePaging
    paging: PaginationFilter | undefined
}

const Paging: FunctionComponent<PagingProps> = ({ type, data, paging }) => {
    const [pageCount, setPageCount] = useState(0)

    const router = useRouter()

    useEffect(() => {
        let groupCount = 0
        switch (type) {
            case RealEstateType.CanHo:
                groupCount = Math.ceil(data.apartments / STEP)
                return setPageCount(groupCount)

            case RealEstateType.NhaO:
                groupCount = Math.ceil(data.houses / STEP)
                return setPageCount(groupCount)

            case RealEstateType.Dat:
                groupCount = Math.ceil(data.lands / STEP)
                return setPageCount(groupCount)

            case RealEstateType.VanPhong:
                groupCount = Math.ceil(data.businessPremises / STEP)
                return setPageCount(groupCount)

            case RealEstateType.PhongTro:
                groupCount = Math.ceil(data.motals / STEP)
                return setPageCount(groupCount)

            default:
                const items = [data.apartments, data.businessPremises, data.houses, data.lands, data.motals]
                const step = Math.max(...items)
                groupCount = Math.ceil(step / STEP)
                return setPageCount(groupCount)
        }

    }, [type, data])

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

export default Paging;