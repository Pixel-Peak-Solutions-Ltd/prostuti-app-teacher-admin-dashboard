import React from 'react';
import ReactDOM from 'react-dom/client';
import Providers from './lib/Providers/Providers.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router.tsx';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* redux toolkit provider */}
    <Provider store={store}>
      {/* redux persist provider */}
      <PersistGate loading={null} persistor={persistor}>
        {/* mui theme provider */}
        <Providers>
          {/* react router provider */}
          <RouterProvider router={router} />
        </Providers>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
