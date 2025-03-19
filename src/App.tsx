import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import { useRoutes } from 'react-router-dom';
import Welcome from './components/Welcome';
import AdminLayout from './layout/admin';
import Dashboard from './components/admin/Dashboard';
import ElementInformation from './components/docs/ElementInfomation';

function App() {
  const routes = useRoutes([
    {
      path:'', element:<Welcome/>
    },
    {
      path:'/admin',element:<AdminLayout/>, children:[
        {path:'', element:<Dashboard/>},
      ]
    },
    {
      path:'/docs',element:<ElementInformation/>
    }
  ])
  return routes
}

export default App;
