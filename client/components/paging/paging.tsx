import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { RealEstatePaging } from "../../graphql/queries/paging";
import { STEP } from "../../pages/[category]/bat-dong-san";
import { RealEstateType } from "../../types/enums/realEstate";
import { PaginationFilter } from "../../types/interfaces/realEstate";
import styles from './paging.module.scss'

interface PagingProps {
    type: RealEstateType | "All" | undefined
    data: RealEstatePaging
    paging: PaginationFilter | undefined
}

const Paging: FunctionComponent<PagingProps> = ({ type, data, paging }) => {
    const [items, setItems] = useState<number>(STEP)

    const router = useRouter()

    useEffect(() => {
        switch (type) {
            case RealEstateType.CanHo:
                return setItems(data.apartments)

            case RealEstateType.NhaO:
                return setItems(data.houses)

            case RealEstateType.Dat:
                return setItems(data.lands)

            case RealEstateType.VanPhong:
                return setItems(data.businessPremises)

            case RealEstateType.PhongTro:
                return setItems(data.motals)

            default:
                const items = [data.apartments, data.businessPremises, data.houses, data.lands, data.motals]
                const step = Math.max(...items)
                return setItems(step)
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
                    {/* <div className={styles['paging__number'] + ` ${styles['paging__number--active']}`}>
                        <span>1</span>
                    </div> */}
                    {renderItems()}
                    <div className={styles['paging__next']}>
                        <FaAngleRight />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Paging;