import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';
// style + assets
import 'assets/scss/style.scss';
import AddressProvider from 'contexts/address';
import GraphQLProvider from 'contexts/graphql';
import AuthProvider from 'contexts/auth';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <GraphQLProvider>
                <AuthProvider>
                    <AddressProvider>
                        <App />
                    </AddressProvider>
                </AuthProvider>
            </GraphQLProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
