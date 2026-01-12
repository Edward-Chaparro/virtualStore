import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h3" gutterBottom>
          Bienvenido a Virtual Store
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Encuentra los mejores productos al alcance de un clic.
        </Typography>
        <Button variant="contained" component={Link} to="/products">
          Explorar productos
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
