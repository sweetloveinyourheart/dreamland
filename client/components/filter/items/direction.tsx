import { useRouter } from "next/router";
import { FunctionComponent, useCallback } from "react";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import { directionSpeaker } from "../../../lib/converter";
import { Direction, RealEstateType } from "../../../types/enums/realEstate";
import styles from './items.module.scss'

interface DirectionFilterProps {
    type: RealEstateType | "All" | undefined
    onActive: () => void
}

const DirectionFilter: FunctionComponent<DirectionFilterProps> = ({ type, onActive }) => {
    const router = useRouter()

    const onActiveFilter = useCallback((value: Direction) => {
        if (type = RealEstateType.CanHo) {
            router.push({
                query: {
                    ...router.query,
                    direction: value
                }
            })
        }

    }, [type])

    const renderFilter = () => {
        const arr = Object.values(Direction)
        return arr.map((value, index) => {
            return (
                <div className={styles['selector']} onClick={() => onActiveFilter(value)} key={index}>
                    {/* style={{ color: numberOfRooms === index+1 ? "#14a7fa" : "#222" }} */}
                    <span >{directionSpeaker(value)}</span>
                    <FaChevronRight />
                </div>
            )
        })
    }

    const renderTitle = () => {
        switch (type) {
            case RealEstateType.CanHo:
                return "ban công"

            case RealEstateType.Dat:
                return "đất"

            case RealEstateType.NhaO:
                return "cửa chính"

            case RealEstateType.VanPhong:
                return "cửa chính"

            default:
                return ""
        }
    }

    return (
        <div className={styles['modal']}>
            <div className={styles['modal-header']}>
                <div></div>
                <h4>Chọn hướng {renderTitle()}</h4>
                <button onClick={() => onActive()}>
                    <FaTimes />
                </button>
            </div>
            <div className={styles['modal-content']}>
                <div className={styles['selectors--small']}>
                    {renderFilter()}
                </div>
            </div>
        </div>
    );
}

export default DirectionFilter;