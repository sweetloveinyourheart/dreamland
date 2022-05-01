import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { FaGripHorizontal } from "react-icons/fa";
import ProjectFilter from "../components/filter/projectFilter";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Paging from "../components/paging/paging";
import Projects from "../components/projects/projects";
import styles from '../styles/pages/duan.module.scss'

const RealEstateProjectPage: NextPage = () => {
    const [isVerticalDisplay, setVerticalDisplay] = useState(true)

    return (
        <>
            <Head>
                <title>Dự án bất động sản</title>
            </Head>
            <Header />
            <main style={{ backgroundColor: "#f4f4f4", padding: '64px 0' }}>
                <div className="container">
                    <div className={styles['filter-area']}>
                        <ProjectFilter />
                    </div>
                    <div className={styles['project-area']}>
                        <h4>
                            <p>Dự án tại Quận 3 Thành Phố Hồ Chí Minh</p>
                            <button onClick={() => setVerticalDisplay(s => !s)}><FaGripHorizontal /></button>
                        </h4>
                        <Projects vertical={isVerticalDisplay}/>
                    </div>
                    <Paging />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default RealEstateProjectPage