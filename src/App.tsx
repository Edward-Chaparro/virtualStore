import { Box } from '@mui/material';
import MainMenu from './components/MainMenu';
import ProductCRUD from './components/ManageProduct';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import Categories from './pages/Categories';
import Offers from './pages/Offers';
import Contact from './pages/Contact';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <MainMenu />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/admin" element={<ProductCRUD />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="*"
              element={
                <Box sx={{ mt: 4, p: 4 }}>
                  <h2>Página no encontrada</h2>
                </Box>
              }
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;