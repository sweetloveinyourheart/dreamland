import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { Helmet } from "react-helmet";
import { LocalizationProvider } from '@mui/lab';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StyledEngineProvider injectFirst>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Trang quản trị - Điền Khôi Land</title>
                    <link rel="icon" href="https://res.cloudinary.com/dienkhoiland/image/upload/v1656394563/logo/LOGO-DIEN-KHOI_amhn6i.ico" />
                </Helmet>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </LocalizationProvider>
    );
};

export default App;
