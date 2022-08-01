// material-ui
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Berry" width="100" />
         *
         */
        <img src='https://res.cloudinary.com/dienkhoiland/image/upload/v1656328913/logo/logo_nfdfc7.png' alt='' width={300} height={50}/>
    );
};

export default Logo;
