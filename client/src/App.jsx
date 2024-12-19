import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Layout from './layouts/Layout';
import Productspage from './pages/Productspage';
import ProductPage from './pages/ProductPage';
import CheckOutPage from './pages/CheckoutPage';
import LoginForm from './components/LoginForm';

const router = createBrowserRouter(createRoutesFromElements(
<Route path='/' element={<Layout/>}>
   <Route index element={<Homepage />} />
   <Route path='/products' element={<Productspage />} />
   <Route path='/trending' element={<Productspage />} />
   <Route path='/sale' element={<Productspage />} />
   <Route path='/category/:id' element={<Productspage />} />
   <Route path='/products/:productId' element={<ProductPage />} />
   <Route path='/checkout' element={<CheckOutPage />} />
   <Route path='/login' element={<LoginForm />} />

   </Route>)
);
const App = () => {

      return (
      <>
      <RouterProvider router={router}/>
      </>

      );
}
export default App;
