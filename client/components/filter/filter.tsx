import { FunctionComponent, useCallback, useState } from "react";
import { FaBuilding, FaChevronDown, FaChevronRight, FaFilter, FaHandHoldingUsd, FaMapMarkerAlt, FaPlus, FaTimes } from "react-icons/fa";
import styles from './filter.module.scss'
import Modal from 'react-modal';

interface FilterProps { }

export const customStyles = {
    overlay: {
        zIndex: 11,
    },

    content: {
        top: '20%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        border: '1px solid #dcdcdc',
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        borderRadius: "12px"

    },
};

Modal.setAppElement('#__next');

const Filter: FunctionComponent<FilterProps> = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    return (
        <div className={styles['filter']}>
            <div className="container">
                <div className={styles['filter-row']}>
                    <div className={styles['filter-item']}>
                        <button onClick={() => setIsOpen(true)}>
                            <p><FaMapMarkerAlt /> Toàn quốc </p>
                            <FaChevronDown />
                        </button>
                    </div>
                    <div className={styles['filter-item']}>
                        <button>
                            <p><FaBuilding /> Mua bán </p>
                            <FaChevronDown />
                        </button>
                    </div>
                    <div className={styles['filter-item']}>
                        <button>
                            <p>Loại BĐS </p>
                            <FaChevronDown />
                        </button>
                    </div>
                    <div className={styles['filter-item']}>
                        <button className={styles['btn--disable']}>
                            <p>Giá </p>
                            <FaPlus />
                        </button>
                    </div>
                    <div className={styles['filter-item']}>
                        <button className={styles['btn--disable']}>
                            <p>Dự án</p>
                            <FaPlus />
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className={styles['modal']}>
                    <div className={styles['modal-header']}>
                        <h4><FaMapMarkerAlt />&nbsp; Chọn khu vực</h4>
                        <button onClick={() => setIsOpen(false)}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className={styles['modal-content']}>
                        <div className={styles['selectors']}>
                            <div className={styles['selector']}>
                                <span>Toàn quốc</span>
                                <FaChevronRight />
                            </div>
                            <div className={styles['selector']}>
                                <span>TP. Hồ Chí Minh</span>
                                <FaChevronRight />
                            </div>
                            <div className={styles['selector']}>
                                <span>Hà Nội</span>
                                <FaChevronRight />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Filter;