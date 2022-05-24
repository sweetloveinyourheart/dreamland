import { useRouter } from "next/router";
import { FunctionComponent, useCallback } from "react";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import styles from './items.module.scss'


interface BedroomFilterProps {
    numberOfRooms?: number
    onActive: () => void
}

const BedroomFilter: FunctionComponent<BedroomFilterProps> = ({ onActive, numberOfRooms }) => {

    const router = useRouter()

    const onActiveFilter = useCallback((id: number) => {
        const currentQuery = router.query

        router.push({
            query: {
                ...currentQuery,
                rooms: id
            }
        })
    }, [router])

    const renderFilter = () => {
        const arr = new Array(10).fill('')
        return arr.map((value, index) => {
            return (
                <div className={styles['selector']} onClick={() => onActiveFilter(index + 1)} key={index}>
                    <span style={{ color: numberOfRooms === index+1 ? "#14a7fa" : "#222" }}>{index + 1} phòng</span>
                    <FaChevronRight />
                </div>
            )
        })
    }

    return (
        <div className={styles['modal']}>
            <div className={styles['modal-header']}>
                <div></div>
                <h4>Chọn số phòng ngủ</h4>
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

export default BedroomFilter;