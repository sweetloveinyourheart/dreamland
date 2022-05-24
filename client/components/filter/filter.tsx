import { FunctionComponent, useCallback, useState } from "react";
import { FaCheck, FaChevronDown, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import styles from './filter.module.scss'
import Modal from 'react-modal';
import { RealEstateType } from "../../types/enums/realEstate";
import AddressFilter from "./items/address";
import { categorySpeaker, realEstateTypeSpeaker } from "../../lib/converter";
import CategoryFilter from "./items/category";
import TypeFilter from "./items/type";
import PricingFilter from "./items/pricing";
import ProjectFilter from "./items/project";
import AcreageFilter from "./items/acreage";
import { FilterState, GuardFilter } from "../../lib/guardFilter";
import SpecialFilter from "./items/special";
import BedroomFilter from "./items/rooms";
import DirectionFilter from "./items/direction";

interface FilterProps {
    type: RealEstateType | "All" | undefined
    filter: any
}

export const customStyles = {
    overlay: {
        zIndex: 11,
    },

    content: {
        bottom: 'auto',
        left: '50%',
        right: 'auto',
        top: '20%',
        marginRight: '-50%',
        transform: 'translate(-50%, -20%)',
        padding: 0,
        border: '1px solid #dcdcdc',
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        borderRadius: "12px"

    },
};

Modal.setAppElement('#__next');

const Filter: FunctionComponent<FilterProps> = ({ filter, type }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<FilterState>(FilterState.Address)

    const onActiveModal = useCallback((selected?: FilterState) => {
        setIsOpen(s => !s)
        if (selected) setModalType(selected)
    }, [modalIsOpen, modalType])

    const addressDisplay = (): string => {
        if (!filter?.address?.province) return "Toàn quốc"
        if (filter?.address?.ward) return filter.address.ward
        if (filter?.address?.district) return filter.address.district
        return filter?.address?.province
    }

    const renderModalByType = () => {
        switch (modalType) {
            case FilterState.Address:
                return <AddressFilter onActive={onActiveModal} />

            case FilterState.Category:
                return <CategoryFilter category={filter?.category} onActive={onActiveModal} />

            case FilterState.Type:
                return <TypeFilter category={filter?.category} type={type} onActive={onActiveModal} />

            case FilterState.Pricing:
                return <PricingFilter config={{min: 0, max: 30000000000}} price={filter?.price} onActive={onActiveModal} />

            case FilterState.Project:
                return <ProjectFilter project={filter?.project} onActive={onActiveModal} />

            case FilterState.Acreage:
                return <AcreageFilter acreage={filter?.acreage} onActive={onActiveModal} />

            case FilterState.SpecialType:
                return <SpecialFilter type={type} specialType={filter?.specialType} onActive={onActiveModal} />

            case FilterState.NumberOfBedrooms:
                return <BedroomFilter numberOfRooms={filter?.numberOfBedrooms} onActive={onActiveModal} />

            case FilterState.Direction:
                return <DirectionFilter type={type} onActive={onActiveModal} />

            default:
                return <AddressFilter onActive={onActiveModal} />

        }
    }

    return (
        <div className={styles['filter']}>
            <div className="container">
                <div className={styles['filter-row']}>
                    <div className={styles['filter-item']}>
                        <button onClick={() => onActiveModal(FilterState.Address)}>
                            <p><FaMapMarkerAlt /> {addressDisplay()} </p>
                            <FaChevronDown />
                        </button>
                    </div>
                    <div className={styles['filter-item']}>
                        <button onClick={() => onActiveModal(FilterState.Category)}>
                            <p>{categorySpeaker(filter?.category)} </p>
                            <FaChevronDown />
                        </button>
                    </div>
                    <div className={styles['filter-item']}>
                        <button onClick={() => onActiveModal(FilterState.Type)}>
                            <p>{realEstateTypeSpeaker(type)} </p>
                            <FaChevronDown />
                        </button>
                    </div>
                    <div className={styles['filter-item']}>
                        <button className={filter?.price ? "" : styles['btn--disable']} onClick={() => onActiveModal(FilterState.Pricing)}>
                            <p>Giá </p>
                            {filter?.price ? <FaCheck /> : <FaPlus />}
                        </button>
                    </div>
                    <div className={styles['filter-item']}>
                        <button className={filter?.project ? "" : styles['btn--disable']} onClick={() => onActiveModal(FilterState.Project)}>
                            <p>Dự án</p>
                            <FaPlus />
                        </button>
                    </div>
                    {(GuardFilter(FilterState.Acreage, type))
                        && (
                            <div className={styles['filter-item']}>
                                <button className={filter?.acreage ? "" : styles['btn--disable']} onClick={() => onActiveModal(FilterState.Acreage)}>
                                    <p>Diện tích </p>
                                    {filter?.acreage ? <FaCheck /> : <FaPlus />}
                                </button>
                            </div>
                        )
                    }
                    {GuardFilter(FilterState.SpecialType, type)
                        && (
                            <div className={styles['filter-item']}>
                                <button className={filter?.specialType ? "" : styles['btn--disable']} onClick={() => onActiveModal(FilterState.SpecialType)}>
                                    <p>Loại hình </p>
                                    {filter?.specialType ? <FaCheck /> : <FaPlus />}
                                </button>
                            </div>
                        )
                    }
                    {GuardFilter(FilterState.NumberOfBedrooms, type)
                        && (
                            <div className={styles['filter-item']}>
                                <button className={filter?.numberOfBedrooms ? "" : styles['btn--disable']} onClick={() => onActiveModal(FilterState.NumberOfBedrooms)}>
                                    <p> Số phòng ngủ </p>
                                    {filter?.numberOfBedrooms ? <FaCheck /> : <FaPlus />}
                                </button>
                            </div>
                        )
                    }
                    {GuardFilter(FilterState.Direction, type)
                        && (
                            <div className={styles['filter-item']}>
                                <button
                                    className={(filter?.balconyDirection || filter?.doorDirection) ? "" : styles['btn--disable']}
                                    onClick={() => onActiveModal(FilterState.Direction)}
                                >
                                    <p> Hướng </p>
                                    {(filter?.balconyDirection || filter?.doorDirection) ? <FaCheck /> : <FaPlus />}
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {renderModalByType()}
            </Modal>
        </div>
    );
}

export default Filter;