import { useRouter } from "next/router";
import { FunctionComponent, useCallback } from "react";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import { houseTypeSpeaker, landTypeSpeaker, premisesTypeSpeaker } from "../../../lib/converter";
import { ApartmentType, BusinessPremisesType, HouseType, LandType, RealEstateType } from "../../../types/enums/realEstate";
import styles from './items.module.scss'

interface SpecialFilterProps {
    type: RealEstateType | "All" | undefined
    specialType: ApartmentType | HouseType | LandType | BusinessPremisesType
    onActive: () => void
}

const SpecialFilter: FunctionComponent<SpecialFilterProps> = ({ type, specialType, onActive }) => {

    const router = useRouter()

    const onActiveFilter = useCallback((value: any) => {
        router.push({
            query: {
                ...router.query,
                special: value
            }
        })
    }, [router])

    const renderSpecialType = () => {
        switch (type) {
            case RealEstateType.CanHo:
                return Object.values(ApartmentType).map((value, id) => {
                    return (
                        <div className={styles['selectors--small']} key={id}>
                            <div className={styles['selector']} onClick={() => onActiveFilter(value)}>
                                <span style={{ color: specialType === value ? "#14a7fa" : "#222" }}>{value}</span>
                                <FaChevronRight />
                            </div>
                        </div>
                    )
                })

            case RealEstateType.NhaO:
                return Object.values(HouseType).map((value, id) => {
                    return (
                        <div className={styles['selectors--small']} key={id}>
                            <div className={styles['selector']} onClick={() => onActiveFilter(value)}>
                                <span style={{ color: specialType === value ? "#14a7fa" : "#222" }}>{houseTypeSpeaker(value)}</span>
                                <FaChevronRight />
                            </div>
                        </div>
                    )
                })

            case RealEstateType.Dat:
                return Object.values(LandType).map((value, id) => {
                    return (
                        <div className={styles['selectors--small']} key={id}>
                            <div className={styles['selector']} onClick={() => onActiveFilter(value)}>
                                <span style={{ color: specialType === value ? "#14a7fa" : "#222" }}>{landTypeSpeaker(value)}</span>
                                <FaChevronRight />
                            </div>
                        </div>
                    )
                })

            case RealEstateType.VanPhong:
                return Object.values(BusinessPremisesType).map((value, id) => {
                    return (
                        <div className={styles['selectors--small']} key={id}>
                            <div className={styles['selector']} onClick={() => onActiveFilter(value)}>
                                <span style={{ color: specialType === value ? "#14a7fa" : "#222" }}>{premisesTypeSpeaker(value)}</span>
                                <FaChevronRight />
                            </div>
                        </div>
                    )
                })

            default:
                return <></>
        }
    }

    return (
        <div className={styles['modal']}>
            <div className={styles['modal-header']}>
                <div></div>
                <h4>Chọn loại hình</h4>
                <button onClick={() => onActive()}>
                    <FaTimes />
                </button>
            </div>
            <div className={styles['modal-content']}>
                <div className={styles['selectors--small']}>
                    {renderSpecialType()}
                </div>
            </div>
        </div>
    );
}

export default SpecialFilter;