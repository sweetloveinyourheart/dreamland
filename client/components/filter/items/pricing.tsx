import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import styles from './items.module.scss'
import InputRange, { Range } from 'react-input-range';
import { moneyConverter } from "../../../lib/converter";

interface PricingFilterProps {
    config: {
        min: number
        max: number
    }
    price?: {
        min?: number
        max?: number
    }
    onActive: () => void
}

const PricingFilter: FunctionComponent<PricingFilterProps> = ({ onActive, price, config }) => {
    const [pricing, setPricing] = useState<Range>({
        min: config.min,
        max: config.max / 2
    })
    const router = useRouter()

    useEffect(() => {
        if(price) {
            setPricing({
                min: price.min ?? 0,
                max: price.max ?? 5000000000
            })
        }
    }, [price])

    const onActiveFilter = useCallback(() => {
        let currentQuery = router.query
        router.push({
            query: {
                ...currentQuery,
                price: `${pricing.min}-${pricing.max}`
            }
        })
        onActive()
    }, [router, pricing])

    const onDisableFilter = useCallback(() => {
        let currentQuery = router.query
        delete currentQuery.price
        router.push({
            query: { ...currentQuery }
        })
        onActive()
    }, [router])

    return (
        <div className={styles['modal']}>
            <div className={styles['modal-header']}>
                <div> <button onClick={() => onDisableFilter()}> <FaFilter/> Huỷ</button> </div>
                <h4>Chọn Khoảng giá</h4>
                <button onClick={() => onActive()}>
                    <FaTimes />
                </button>
            </div>
            <div className={styles['modal-content']}>
                <div className={styles['content-area']}>
                    <InputRange
                        maxValue={config.max}
                        minValue={config.min}
                        value={pricing}
                        formatLabel={value => `${moneyConverter(value)}`}
                        onChange={value => setPricing(value as Range)}
                    />

                </div>
                <div className={styles['button-area']}>
                    <button onClick={() => onActiveFilter()}> Áp dụng khoảng giá </button>
                </div>
            </div>
        </div>
    );
}

export default PricingFilter;