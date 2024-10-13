import React from 'react';
import ReactDOM from 'react-dom/client';
import Providers from './lib/Providers/Providers.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
