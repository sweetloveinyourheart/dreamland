import { FunctionComponent } from "react";
import { Container } from "../../UI/gridSystem";
import styles from './banner.module.scss'

interface MainBannerProps {

}

const MainBanner: FunctionComponent<MainBannerProps> = () => {
    return (
        <section className={styles.banner}>
            <Container>
                <div className={styles['banner-bg']} style={{ backgroundImage: 'url(/banner/landmark81banner.jpg)' }}></div>
            </Container>
        </section>
    );
}

export default MainBanner;