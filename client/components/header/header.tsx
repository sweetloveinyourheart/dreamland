import Image from "next/image";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { FaBuilding, FaHandHoldingUsd, FaHome, FaSearch, FaTruckMonster, FaUserCircle } from "react-icons/fa";
import styles from './header.module.scss'

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {

    const router = useRouter()

    return (
        <header className={styles['header']}>
            <div className="container-fluid">
                <div className={styles['header-row--center'] + " " + styles['header-row']}>
                    <div className={styles['logo']} onClick={() => router.push("/")}>
                        <Image
                            src={"/logo/nha_white_logo.png"}
                            alt="#"
                            width={82}
                            height={35}
                        />
                    </div>
                    <form className={styles['search']}>
                        <select>
                            <option value=""> Mua bán </option>
                            <option value=""> Cho thuê </option>
                        </select>
                        <input type="text" />
                        <button>
                            <FaSearch />
                        </button>
                    </form>
                    <nav className={styles['nav-menu']}>
                        <ul>
                            <li onClick={() => router.push("/")}>
                                <FaHome />
                                <span> Trang chủ </span>
                            </li>
                            <li onClick={() => router.push("/mua-ban-bat-dong-san")}>
                                <FaBuilding />
                                <span> Mua bán </span>
                            </li>
                            <li>
                                <FaHandHoldingUsd />
                                <span> Cho thuê </span>
                            </li>
                            <li onClick={() => router.push("/du-an-bat-dong-san")}>
                                <FaTruckMonster />
                                <span> Dự án </span>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles['user']}>
                        <FaUserCircle />
                        <span>Đăng nhập</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;