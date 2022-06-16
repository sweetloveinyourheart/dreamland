import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { RealEstateCategory } from "../../types/enums/realEstate";
import styles from './links.module.scss'

interface PageLinksProps {
    title: string,
    category: RealEstateCategory
}

const PageLinks: FunctionComponent<PageLinksProps> = ({ title, category }) => {

    const router = useRouter()
    
    return (
        <div className={styles['link']}>
            <ol>
                <li>
                    <span onClick={() => router.push('/home')}>Trang chủ</span> <FaAngleDoubleRight />
                </li>
                <li>
                    <span
                        onClick={() => router.push(`/${category === RealEstateCategory.MuaBan ? "mua-ban" : "cho-thue"}/bat-dong-san`)}
                    >
                        {category === RealEstateCategory.MuaBan ? "Mua Bán" : "Cho Thuê"}
                    </span>
                    <FaAngleDoubleRight />
                </li>
                <li><span>{title}</span></li>
            </ol>
            <button onClick={() => router.back()}> Về danh sách </button>
        </div>
    );
}

export default PageLinks;