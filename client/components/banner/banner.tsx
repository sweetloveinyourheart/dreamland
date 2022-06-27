import { FunctionComponent } from "react";
import { Container } from "../../UI/gridSystem";
import styles from './banner.module.scss'

interface MainBannerProps {
    banner: string | null
}

const MainBanner: FunctionComponent<MainBannerProps> = ({ banner }) => {
    return (
        <section className={styles.banner}>
            <Container>
                <div className={styles['banner-bg']} style={{ backgroundImage: banner ? `url(${banner})` : 'url(/banner/landmark81banner.jpg)' }}></div>
            </Container>
        </section>
    );
}

export default MainBanner;