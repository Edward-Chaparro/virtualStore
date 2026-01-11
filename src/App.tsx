import { Box } from '@mui/material';
import MainMenu from './components/MainMenu';
import ManageProduct from './components/ManageProduct';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MainMenu />
      <ManageProduct />
    </Box>
  );
}

export default App;