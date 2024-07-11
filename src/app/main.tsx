import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { Index } from '../pages/repos/ui/Index/index.tsx'
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Repo } from '../pages/repos/ui/Repo/index.tsx';
import { ApolloProvider } from '@apollo/client';
import { initApolloClient } from '../entities/common/lib/apollo.ts';

const router = createBrowserRouter([
  { path: "/*", element: <Index /> },
  { path: "/repo/:name/:owner", element: <Repo /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <ApolloProvider client={initApolloClient()}>
      <RouterProvider router={router} />
      </ApolloProvider>
  </React.StrictMode>,
);

