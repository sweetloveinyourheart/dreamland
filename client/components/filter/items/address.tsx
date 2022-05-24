import { Dispatch, FunctionComponent, useCallback, useEffect, useState } from "react";
import styles from './items.module.scss'
import { FaAngleLeft, FaChevronRight, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import { District, Provinces, useAddress, Ward } from "../../../contexts/address";

interface AddressFilterProps {
    onActive: () => void
}

const AddressFilter: FunctionComponent<AddressFilterProps> = ({ onActive }) => {
    const [selectedProvince, setSelectedProvince] = useState<Provinces | undefined>()
    const [selectedDistrict, setSelectedDistrict] = useState<District | undefined>()
    const [selectedWard, setSelectedWard] = useState<Ward | undefined>()
    const [currentFilterQuery, setCurrentFilterQuery] = useState<any>()

    let router = useRouter()
    const { provinces } = useAddress()

    useEffect(() => {
        let currentQuery =  router.query
        delete currentQuery?.ward
        delete currentQuery?.district
        delete currentQuery?.province
        setCurrentFilterQuery(router.query)
    }, [])

    useEffect(() => {
        if (currentFilterQuery) {
            const queryParams: any = {}
            selectedWard?.code && (queryParams.ward = String(selectedWard.code))
            selectedDistrict?.code && (queryParams.district = String(selectedDistrict.code))
            selectedProvince?.code && (queryParams.province = String(selectedProvince.code))

            router.push({
                query: {
                    ...currentFilterQuery,
                    ...queryParams
                }
            })
        }

        if (selectedWard) {
            onActive()
        }
    }, [selectedProvince, selectedDistrict, selectedWard, currentFilterQuery])

    const onRePick = useCallback(() => {
        if (selectedWard) {
            return setSelectedWard(undefined)
        }
        if (selectedDistrict) {
            return setSelectedDistrict(undefined)
        }
        return setSelectedProvince(undefined)
    }, [selectedProvince, selectedDistrict, selectedWard])

    const renderData = () => {
        if (selectedDistrict) {
            return selectedDistrict.wards.map((elm: any, id: number) => {
                return (
                    <div className={styles['selector']} key={id} onClick={() => { setSelectedWard(elm) }}>
                        <span>{elm.name}</span>
                        <FaChevronRight />
                    </div>
                )
            })
        }

        if (selectedProvince) {
            return selectedProvince.districts.map((elm: any, id: number) => {
                return (
                    <div className={styles['selector']} key={id} onClick={() => { setSelectedDistrict(elm) }}>
                        <span>{elm.name}</span>
                        <FaChevronRight />
                    </div>
                )
            })
        }


        return provinces.map((elm: any, id: number) => {
            return (
                <div className={styles['selector']} key={id} onClick={() => { setSelectedProvince(elm) }}>
                    <span>{elm.name}</span>
                    <FaChevronRight />
                </div>
            )
        })
    }

    return (
        <div className={styles['modal']}>
            <div className={styles['modal-header']}>
                {selectedDistrict || selectedProvince
                    ? (
                        <button onClick={() => onRePick()}>
                            <FaAngleLeft />
                        </button>
                    )
                    : <div></div>
                }
                <h4><FaMapMarkerAlt />&nbsp; Chọn khu vực</h4>
                <button onClick={() => onActive()}>
                    <FaTimes />
                </button>
            </div>
            <div className={styles['modal-content']}>
                <div className={styles['selectors']}>
                    <div className={styles['selector']}>
                        <span>Toàn quốc</span>
                        <FaChevronRight />
                    </div>
                    {renderData()}
                </div>
            </div>
        </div>
    );
}

export default AddressFilter;