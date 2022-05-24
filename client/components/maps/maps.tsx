import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Modal from 'react-modal';
import styles from "./maps.module.scss"
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { FaTimesCircle } from "react-icons/fa";
import {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import { AddressInterface } from "../../types/interfaces/realEstate";

interface MapsProps {
    show: boolean
    handleShow: (state: boolean) => void
    address: AddressInterface
}

Modal.setAppElement('#__next');

const customStyles = {
    overlay: {
        zIndex: 11,
        backgroundColor: "rgba(0, 0, 0, 0.24)"
    },

    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        borderRadius: "12px"

    },
};

const mapsApiKey = process.env.MAPS_API_KEY

const Maps: FunctionComponent<MapsProps> = ({ show, handleShow, address }) => {
    const [mapsConfig, setMapsConfig] = useState({
        center: {
            lat: 21.027763,
            lng: 105.834160
        },
        zoom: 1
    })
    const [map, setMap] = useState(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: mapsApiKey || ""
    })

    useEffect(() => {
        if (window.google?.maps)
            (async () => {
                const addressValue = (address.showHouseNumber && address.houseNumber ? address.houseNumber : "") 
                    + address.street 
                    + address.ward 
                    + address.district 
                    + address.province

                const results = await getGeocode({ address: addressValue });
                const { lat, lng } = await getLatLng(results[0]);

                setMapsConfig(s => ({
                    ...s,
                    center: {
                        lat,
                        lng
                    }
                }))
            })() 
    }, [map])

    const onLoad = useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds(mapsConfig.center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    return (
        <Modal
            isOpen={show}
            onRequestClose={() => handleShow(false)}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className={styles['maps']}>
                <div className={styles['maps-header']}>
                    <span></span>
                    <h1> Bản đồ </h1>
                    <button onClick={() => handleShow(false)}>
                        <FaTimesCircle />
                    </button>
                </div>
                <div className={styles['maps-display']}>
                    {(mapsApiKey && isLoaded)
                        && (
                            <GoogleMap
                                mapContainerStyle={{
                                    width: "100%",
                                    height: "100%"
                                }}
                                center={mapsConfig.center}
                                zoom={mapsConfig.zoom}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                            >
                                <Marker
                                    icon={{
                                        url: 'https://insulationpads.co.uk/wp-content/uploads/2017/10/Home.png',
                                        scaledSize: new window.google.maps.Size(40, 40),
                                    }}
                                    position={mapsConfig.center}
                                />
                            </GoogleMap>
                        )
                    }
                </div>
            </div>
        </Modal>
    );
}

export default Maps;