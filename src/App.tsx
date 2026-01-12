import { Box } from '@mui/material';
import MainMenu from './components/MainMenu';
import ProductCRUD from './components/ManageProduct';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
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
            <Route
              path="/categories"
              element={
                <Box sx={{ mt: 4, p: 4 }}>
                  <h2>Categorías</h2>
                  <p>Página en construcción.</p>
                </Box>
              }
            />
            <Route
              path="/offers"
              element={
                <Box sx={{ mt: 4, p: 4 }}>
                  <h2>Ofertas</h2>
                  <p>Página en construcción.</p>
                </Box>
              }
            />
            <Route
              path="/contact"
              element={
                <Box sx={{ mt: 4, p: 4 }}>
                  <h2>Contacto</h2>
                  <p>Página en construcción.</p>
                </Box>
              }
            />
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