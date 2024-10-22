import React from 'react';
import ReactDOM from 'react-dom/client';
import Providers from './lib/Providers/Providers.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
// import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Providers>
        <RouterProvider router={router} />
      </Providers>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
