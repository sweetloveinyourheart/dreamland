import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import { RealEstateCategory, RealEstateType } from "../../../types/enums/realEstate";
import styles from './items.module.scss'


interface TypeFilterProps {
    category?: RealEstateCategory
    type?: RealEstateType | string
    onActive: () => void
}

const TypeFilter: FunctionComponent<TypeFilterProps> = ({ type, onActive, category }) => {

    const router = useRouter()

    const onTypeFilter = (selectedType: RealEstateType | "All") => {
        let currentQuery = router.query

        if(selectedType === "All") {
            delete currentQuery.type
            router.push({
                query: {
                    category: currentQuery.category
                }
            })
            return;
        }

        router.push({
            query: {
                category: currentQuery.category,
                type: selectedType
            }
        })
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
                    <div className={styles['selector']} onClick={() => onTypeFilter("All")}>
                        <span style={{ color: type === undefined ? "#14a7fa" : "#222" }}>Tất cả</span>
                        <FaChevronRight />
                    </div>
                    <div className={styles['selector']} onClick={() => onTypeFilter(RealEstateType.CanHo)}>
                        <span style={{ color: type === RealEstateType.CanHo ? "#14a7fa" : "#222" }}>Căn hộ/Chung cư</span>
                        <FaChevronRight />
                    </div>
                    <div className={styles['selector']} onClick={() => onTypeFilter(RealEstateType.NhaO)}>
                        <span style={{ color: type === RealEstateType.NhaO ? "#14a7fa" : "#222" }}>Nhà ở</span>
                        <FaChevronRight />
                    </div>
                    <div className={styles['selector']} onClick={() => onTypeFilter(RealEstateType.Dat)}>
                        <span style={{ color: type === RealEstateType.Dat ? "#14a7fa" : "#222" }}>Đất</span>
                        <FaChevronRight />
                    </div>
                    <div className={styles['selector']} onClick={() => onTypeFilter(RealEstateType.VanPhong)}>
                        <span style={{ color: type === RealEstateType.VanPhong ? "#14a7fa" : "#222" }}>Văn phòng/Mặt bằng kinh doanh</span>
                        <FaChevronRight />
                    </div>
                    {category === RealEstateCategory.ChoThue
                        && (
                            <div className={styles['selector']} onClick={() => onTypeFilter(RealEstateType.PhongTro)}>
                                <span style={{ color: type === RealEstateType.PhongTro ? "#14a7fa" : "#222" }}>Phòng trọ</span>
                                <FaChevronRight />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default TypeFilter;