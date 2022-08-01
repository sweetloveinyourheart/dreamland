import { FunctionComponent } from "react";
import { Container } from "../../UI/gridSystem";
import styles from './banner.module.scss'

interface MainBannerProps {
    banner: {
        imgUrl: string
        directLink: string | null
    } | null
}

const MainBanner: FunctionComponent<MainBannerProps> = ({ banner }) => {

    const onClickBanner = () => {
        if (banner?.directLink) {
            window.open(banner.directLink, '_blank')
        }
    }

    return (
        <section className={styles.banner}>
            <Container>
                <div 
                    className={styles['banner-bg']} 
                    style={{ backgroundImage: banner?.imgUrl ? `url(${banner?.imgUrl})` : 'url(/banner/landmark81banner.jpg)' }}
                    onClick={onClickBanner}
                ></div>
            </Container>
        </section>
    );
}

export default MainBanner;