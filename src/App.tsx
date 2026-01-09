import { Box, Container, Typography } from '@mui/material';
import MainMenu from './components/MainMenu';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MainMenu />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Bienvenido a Virtual Store
        </Typography>
        <Typography variant="body1">
          Esta es tu tienda virtual con Material UI y TypeScript
        </Typography>
      </Container>
    </Box>
  );
}

export default App;