import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './firebaseConfig.jsx'
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registration from './Pages/Registration.jsx'
import Login from './Pages/Login.jsx'
import Home from './Home/Home.jsx'
import { store } from './store'
import { Provider } from 'react-redux'


const router = createBrowserRouter([
  {
    path: "/registration",
    element: <Registration></Registration>
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/",
    element: <Home></Home>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router} />

    </Provider>
  </React.StrictMode>,
)
