import { useEffect, useState } from 'react';
import { Container, Box, Typography, Chip, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(res.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar las categorías');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return (
    <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4">Categorías</Typography>
        <Typography variant="body2" color="text.secondary">Selecciona una categoría para explorar productos.</Typography>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
      )}

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {categories.map((c) => (
          <Chip
            key={c}
            label={c}
            clickable
            onClick={() => navigate(`/products?category=${encodeURIComponent(c)}`)}
            color="primary"
          />
        ))}
      </Box>
    </Container>
  );
}

export default Categories;
