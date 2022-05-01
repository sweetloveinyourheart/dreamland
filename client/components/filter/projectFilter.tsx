import { FunctionComponent, useState } from "react";
import { FaChevronDown, FaChevronRight, FaMapMarkerAlt, FaSearch, FaTimes } from "react-icons/fa";
import styles from './filter.module.scss'
import Modal from 'react-modal';
import { customStyles } from "./filter";

interface ProjectFilterProps {

}

Modal.setAppElement('#__next');

const ProjectFilter: FunctionComponent<ProjectFilterProps> = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

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
                    <button onClick={() => setIsOpen(true)}>
                        <p><FaMapMarkerAlt /> Toàn quốc </p>
                        <FaChevronDown />
                    </button>
                </div>
                <div className={styles['filter-item']}>
                    <button>
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

export default ProjectFilter;