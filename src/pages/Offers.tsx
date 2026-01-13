import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import axios from 'axios';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../context/CartContext';
import { Product } from '../types/Product';

function Offers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://fakestoreapi.com/products');
        // Simple heuristic: ofertas = productos con precio < 50
        const offers = (res.data || []).filter((p: Product) => p.price < 50);
        setProducts(offers);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar las ofertas');
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (loading) return (
    <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4">Ofertas</Typography>
        <Typography variant="body2" color="text.secondary">Productos con precio reducido.</Typography>
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia component="img" image={product.image} alt={product.title} sx={{ height: 200, objectFit: 'contain', p: 2, backgroundColor: '#f5f5f5' }} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom noWrap>{product.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} noWrap>{product.description}</Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>${product.price.toFixed(2)}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" startIcon={<AddShoppingCartIcon />} onClick={() => addToCart(product)}>
                  Agregar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Offers;
