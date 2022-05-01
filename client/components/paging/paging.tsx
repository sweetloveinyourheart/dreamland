import { FunctionComponent } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from './paging.module.scss'

interface PagingProps {

}

const Paging: FunctionComponent<PagingProps> = () => {
    return (
        <div className={styles['paging-area']}>
            <div className="container">
                <div className={styles['paging']}>
                    <div className={styles['paging__prev'] + ` ${styles['paging__prev--disable']}`}>
                        <FaAngleLeft />
                    </div>
                    <div className={styles['paging__number'] + ` ${styles['paging__number--active']}`}>
                        <span>1</span>
                    </div>
                    <div className={styles['paging__number']}>
                        <span>2</span>
                    </div>
                    <div className={styles['paging__next']}>
                        <FaAngleRight />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Paging;