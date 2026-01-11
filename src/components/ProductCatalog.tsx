import { useState, useEffect } from 'react';
import {
  Container,
  Grid as Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Box,
  Chip,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';

const API_URL = 'https://fakestoreapi.com/products';

function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al cargar productos');
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Catálogo de Productos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explora nuestra colección de productos
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  objectFit: 'contain',
                  p: 2,
                  backgroundColor: '#f5f5f5',
                }}
                image={product.image}
                alt={product.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip
                  label={product.category}
                  size="small"
                  sx={{ mb: 1 }}
                  color="primary"
                  variant="outlined"
                />
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    minHeight: '3em',
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => handleAddToCart(product)}
                  >
                    Agregar
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductCatalog;