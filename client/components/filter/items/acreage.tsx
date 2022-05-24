import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import InputRange, { Range } from "react-input-range";
import styles from './items.module.scss'

interface AcreageFilterProps {
    acreage?: {
        min?: number
        max?: number
    } 
    onActive: () => void
}
 
const AcreageFilter: FunctionComponent<AcreageFilterProps> = ({ onActive, acreage }) => {
    const [acreageState, setAcreageState] = useState<Range>({
        min: 10,
        max: 500
    })
    const router = useRouter()

    useEffect(() => {
        if(acreage) {
            setAcreageState({
                min: acreage.min ?? 10,
                max: acreage.max ?? 1000
            })
        }
    }, [acreage])

    const onActiveFilter = useCallback(() => {
        let currentQuery = router.query
        router.push({
            query: {
                ...currentQuery,
                acreage: `${acreageState.min}-${acreageState.max}`
            }
        })
        onActive()
    }, [router, acreageState])

    const onDisableFilter = useCallback(() => {
        let currentQuery = router.query
        delete currentQuery.acreage
        router.push({
            query: { ...currentQuery }
        })
        onActive()
    }, [router])
    
    return (  
        <div className={styles['modal']}>
            <div className={styles['modal-header']}>
                <div> <button onClick={() => onDisableFilter()}> <FaFilter/> Huỷ</button> </div>
                <h4>Diện tích</h4>
                <button onClick={() => onActive()}>
                    <FaTimes />
                </button>
            </div>
            <div className={styles['modal-content']}>
                <div className={styles['content-area']}>
                    <InputRange
                        maxValue={1000}
                        minValue={0}
                        value={acreageState}
                        formatLabel={value => `${value} m²`}
                        onChange={value => setAcreageState(value as Range)}
                    />

                </div>
                <div className={styles['button-area']}>
                    <button onClick={() => onActiveFilter()}> Áp dụng diện tích </button>
                </div>
            </div>
        </div>
    );
}
 
export default AcreageFilter;