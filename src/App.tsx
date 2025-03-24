import './App.css';
import './index.css';
import { useRoutes } from 'react-router-dom';
import Welcome from './components/Welcome';
import AdminLayout from './layout/admin';
import Dashboard from './components/admin/Dashboard';
import ElementInformation from './components/docs/ElementInfomation';
import DocsLayout from './layout/docs';
import ListHeroes from './components/admin/ListHeroes';
import Summoner from './components/client/Summoner';

function App() {
  const routes = useRoutes([
    {
      path:'/admin',element:<AdminLayout/>, children:[
        {path:'', element:<Dashboard/>},
        {path:'heroes', element:<ListHeroes/>}
      ]
    },
    {
      path:'',element:<AdminLayout/>,children:[
        {path:'summon',element:<Summoner/>},
        {
          path:'', element:<Welcome/>
        }
      ]
    },
    {
      path:'/docs',element:<DocsLayout/>,children:[
        {
          path:'element', element:<ElementInformation/>
        }
      ]
    }
  ])
  return routes
}

export default App;
