import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
import App from './components/App';
// import store from './slices/index.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

// import { EightBaseApolloClient } from '@8base/apollo-client';

// import { ApolloProvider } from 'react-apollo-hooks';

// const URI = 'https://api.8base.com/cjvuk51i0000701s0hvvcbnxg';

// const apolloClient = new EightBaseApolloClient({
//   uri: URI,
//   withAuth: false
// });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
	{/* <Provider store={store}> */}
	<AuthProvider >
	{/* <ApolloProvider client={apolloClient}> */}
       <Routes>
        <Route path='/*' element={<App />} />
        </Routes>
	{/* /	</ApolloProvider> */}
    </AuthProvider>
	{/* </Provider> */}
	</BrowserRouter>
);




