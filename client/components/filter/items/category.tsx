import { useRouter } from "next/router";
import {  FunctionComponent } from "react";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import { RealEstateCategory } from "../../../types/enums/realEstate";
import styles from './items.module.scss'


interface CategoryFilterProps {
    category: RealEstateCategory
    onActive: () => void
}

const CategoryFilter: FunctionComponent<CategoryFilterProps> = ({ category, onActive } ) => {

    const router = useRouter()

    const onCategoryFilter = (category: string) => {
        router.push(`/${category}/bat-dong-san`)
        onActive()
    }

    return (
        <div className={styles['modal']}>
            <div className={styles['modal-header']}>
                <div></div>
                <h4>Chọn loại bất động sản</h4>
                <button onClick={() => onActive()}>
                    <FaTimes />
                </button>
            </div>
            <div className={styles['modal-content']}>
                <div className={styles['selectors--small']}>
                    <div className={styles['selector']} onClick={() => onCategoryFilter('mua-ban')}>
                        <span style={{ color: category === RealEstateCategory.MuaBan ? "#14a7fa" : "#222"}}>Mua Bán</span>
                        <FaChevronRight />
                    </div>
                    <div className={styles['selector']}  onClick={() => onCategoryFilter('cho-thue')}>
                        <span style={{ color: category === RealEstateCategory.ChoThue ? "#14a7fa" : "#222"}}>Cho Thuê</span>
                        <FaChevronRight />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryFilter;