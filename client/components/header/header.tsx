import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, FunctionComponent, useState } from "react";
import { FaBars, FaBuilding, FaHandHoldingUsd, FaHome, FaSearch, FaTruckMonster } from "react-icons/fa";
import { Col, Container, Row } from "../../UI/gridSystem";
import styles from './header.module.scss'

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
    const [search, setSearch] = useState({
        field: '',
        category: 'mua-ban'
    })
    const [isMobileNavActive, setMobileNavActive] = useState(false)

    const router = useRouter()

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/${search.category}/bat-dong-san?search=${search.field}`)
    }

    return (
        <header className={styles['header']}>
            <Container>
                {/* <div className={styles['header-row--center'] + " " + styles['header-row']}> */}
                <Row>
                    <Col xl={2}>
                        <div className={styles['logo-area']}>
                            <div className={styles['logo']} onClick={() => router.push("/home")}>
                                <Image
                                    src={"https://res.cloudinary.com/dienkhoiland/image/upload/v1656328913/logo/logo-am-ban_rwgbmu.png"}
                                    alt="#"
                                    width={275}
                                    height={50}
                                />
                            </div>
                            <div className={styles['toggle']}>
                                <button onClick={() => setMobileNavActive(s => !s)}>
                                    <FaBars />
                                </button>
                            </div>
                        </div>
                    </Col>
                    <Col xl={5}>
                        <form className={styles['search']} onSubmit={onSubmit}>
                            <select>
                                <option onClick={() => setSearch(s => ({ ...s, category: 'mua-ban' }))}>
                                    Mua Bán
                                </option>
                                <option onClick={() => setSearch(s => ({ ...s, category: 'cho-thue' }))}>
                                    Cho Thuê
                                </option>
                            </select>
                            <input type="text" value={search.field} onChange={e => setSearch(s => ({ ...s, field: e.target.value }))} />
                            <button type="submit">
                                <FaSearch />
                            </button>
                        </form>
                    </Col>
                    <Col xl={5}>
                        <nav className={`${styles['nav-menu']} ${isMobileNavActive ? styles['nav-menu--active'] : ''}`}>
                            <ul>
                                <li onClick={() => router.push("/")}>
                                    <FaHome />
                                    <span> Trang chủ </span>
                                </li>
                                <li onClick={() => router.push("/mua-ban/bat-dong-san")}>
                                    <FaBuilding />
                                    <span> Mua bán </span>
                                </li>
                                <li onClick={() => router.push("/cho-thue/bat-dong-san")}>
                                    <FaHandHoldingUsd />
                                    <span> Cho thuê </span>
                                </li>
                                <li onClick={() => router.push("/du-an-bat-dong-san")}>
                                    <FaTruckMonster />
                                    <span> Dự án </span>
                                </li>
                            </ul>
                        </nav>
                    </Col>

                    {/* <div className={styles['user']}>
                        <FaUserCircle />
                        <span>Đăng nhập</span>
                    </div> */}
                </Row>
                {/* </div> */}
            </Container>
        </header>
    );
}

export default Header;