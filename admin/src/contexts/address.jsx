import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AddressContext = createContext({})

export function useAddress() { return useContext(AddressContext) }

const AddressProvider = ({ children }) => {
    const [provinces, setProvinces] = useState([])

    useEffect(() => {
        (async () => {
            const res = await fetch('https://provinces.open-api.vn/api/?depth=3')
            const result = await res.json()           
            setProvinces(result)
        })()
    }, [])

    const getAddress = useCallback((provinceCode, districtCode, wardCode) => {
            let address = {};
            provinces.find(province => {
                if (province.code === provinceCode) {
                    address.province = province.name
                    province.districts.find(district => {
                        if (district.code === districtCode) {
                            address.district = district.name
                            district.wards.find(ward => {
                                if (ward.code === wardCode) {
                                    address.ward = ward.name
                                    return ward
                                }
                            })
                            return district
                        }
                    })
                    return province
                }
            })
            return address
        }, [provinces])

    const memoedValue = useMemo(() => ({
        provinces,
        getAddress
    }), [provinces])

    return (
        <AddressContext.Provider value={memoedValue}>
            {children}
        </AddressContext.Provider>
    );
}

export default AddressProvider;