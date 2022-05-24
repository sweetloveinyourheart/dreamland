import { FunctionComponent, useCallback, useState } from "react";
import { FaChevronDown, FaChevronRight, FaMapMarkerAlt, FaSearch, FaTimes } from "react-icons/fa";
import styles from './filter.module.scss'
import Modal from 'react-modal';
import { customStyles } from "./filter";
import { FilterState } from "../../lib/guardFilter";
import AddressFilter from "./items/address";
import PricingFilter from "./items/pricing";

interface ProjectFilterProps {
    filter: any
}

Modal.setAppElement('#__next');

const ProjectFilter: FunctionComponent<ProjectFilterProps> = ({ filter }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<FilterState>(FilterState.Address)

    const onActiveModal = useCallback((selected?: FilterState) => {
        setIsOpen(s => !s)
        if (selected) setModalType(selected)
    }, [modalIsOpen, modalType])

    const renderModalByType = () => {
        switch (modalType) {
            case FilterState.Address:
                return <AddressFilter onActive={onActiveModal} />

            case FilterState.Pricing:
                return <PricingFilter config={{min: 0, max: 300000000}} price={filter?.price} onActive={onActiveModal} />


            default:
                return <AddressFilter onActive={onActiveModal} />

        }
    }

    return (
        <div className={styles['filter']}>
            <div className={styles['filter-row']}>
                <div className={styles['filter-item']}>
                    <div className={styles['search']}>
                        <input placeholder="Nhập tên dự án" />
                        <button className={styles['search__btn']}>
                            <FaSearch />
                        </button>
                    </div>
                </div>
                <div className={styles['filter-item']}>
                    <button onClick={() => onActiveModal(FilterState.Address)}>
                        <p><FaMapMarkerAlt /> Toàn quốc </p>
                        <FaChevronDown />
                    </button>
                </div>
                <div className={styles['filter-item']}>
                    <button onClick={() => onActiveModal(FilterState.Pricing)}>
                        <p>Khoảng giá </p>
                        <FaChevronDown />
                    </button>
                </div>
                <div className={styles['filter-item']}>
                    <button>
                        <p>Năm bàn giao </p>
                        <FaChevronDown />
                    </button>
                </div>
            </div>
            <div className={styles['filter-modal']}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setIsOpen(false)}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    {renderModalByType()}
                </Modal>
            </div>
        </div>
    );
}

export default ProjectFilter;