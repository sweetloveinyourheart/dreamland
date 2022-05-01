import { FunctionComponent } from "react";
import styles from './banner.module.scss'

interface MainBannerProps {

}

const MainBanner: FunctionComponent<MainBannerProps> = () => {
    return (
        <section className={styles.banner}>
            <div className="container">
                <div className={styles['banner-bg']} style={{ backgroundImage: 'url(/logo/banner.jpg)' }}></div>
            </div>
        </section>
    );
}

export default MainBanner;