import React from 'react';
import ReactDOM from 'react-dom/client';
import Providers from './lib/Providers/Providers.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </Provider>
  </React.StrictMode>
);
