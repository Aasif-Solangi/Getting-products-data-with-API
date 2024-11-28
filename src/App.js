import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import DrawerAppBar from './Components/Layout/Layout';
import { Productdata } from './Components/Productdata/ProductCard';
import SignIn from './Components/outh/Signin/SignIn';
import SignUp from './Components/outh/Signup/SignUp';
import Errorpage from './Components/ErrorPage/Errorpage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';



function App() {
  const router = createBrowserRouter([
    {
     path:"/",element :  < DrawerAppBar/>,errorElement:<Errorpage/>,
    },
   
    {
     path:"/SignIn",element : <SignIn/>,
    },
    {
     path:"/SignUp",element :   < SignUp/>,
    }
  ])
  return (
    <div className="App">
    
     
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
