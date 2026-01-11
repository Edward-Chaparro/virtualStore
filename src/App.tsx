import { Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import MainMenu from './components/MainMenu';
import ProductCRUD from './components/ManageProduct';
import ProductCatalog from './components/ProductCatalog';
import { CartProvider } from './context/CartContext';

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <CartProvider>
      <Box sx={{ flexGrow: 1 }}>
        <MainMenu />
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Tabs value={currentTab} onChange={handleTabChange} centered>
            <Tab label="Catálogo" />
            <Tab label="Administración" />
          </Tabs>
        </Box>

        {currentTab === 0 && <ProductCatalog />}
        {currentTab === 1 && <ProductCRUD />}
      </Box>
    </CartProvider>
  );
}

export default App;