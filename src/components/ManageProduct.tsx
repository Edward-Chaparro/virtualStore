import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Paper,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Avatar,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Product } from '../types/Product';

const API_URL = 'https://fakestoreapi.com/products';

function ManageProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    title: '',
    description: '',
    price: 0,
    category: '',
    image: '',
  });

  // Cargar productos al montar el componente
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
      setError('No se pudieron cargar los productos de FakeStoreAPI');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        description: '',
        price: 0,
        category: '',
        image: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
    setSuccess(null);
  };

  const handleChange = (field: keyof Omit<Product, 'id'>) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'price' 
      ? parseFloat(event.target.value) || 0 
      : event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      if (editingProduct) {
        // Actualizar producto (simulado)
        const response = await fetch(`${API_URL}/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Error al actualizar');
        
        // Actualizar localmente (FakeAPI no persiste los cambios)
        setProducts(products.map(p => 
          p.id === editingProduct.id 
            ? { ...editingProduct, ...formData } 
            : p
        ));
        setSuccess('✅ Producto actualizado (simulado - FakeStoreAPI no persiste cambios)');
      } else {
        // Crear nuevo producto (simulado)
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Error al crear');
        const newProduct = await response.json();
        
        // Agregar localmente
        setProducts([...products, { ...formData, id: newProduct.id }]);
        setSuccess('✅ Producto creado (simulado - FakeStoreAPI no persiste cambios)');
      }
      handleClose();
    } catch (err) {
      setError('Error al guardar el producto');
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar');
      
      // Eliminar localmente (FakeAPI no persiste)
      setProducts(products.filter(p => p.id !== id));
      setSuccess('✅ Producto eliminado (simulado - FakeStoreAPI no persiste cambios)');
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Error al eliminar el producto');
      console.error(err);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'image',
      headerName: 'Imagen',
      width: 80,
      renderCell: (params) => (
        <Avatar src={params.value as string} variant="rounded" />
      ),
      sortable: false,
    },
    { field: 'title', headerName: 'Título', width: 250 },
    { 
      field: 'description', 
      headerName: 'Descripción', 
      width: 300,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap' 
        }}>
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'price', 
      headerName: 'Precio', 
      width: 100, 
      valueFormatter: (value) => `$${Number(value).toFixed(2)}` 
    },
    { field: 'category', headerName: 'Categoría', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => handleOpen(params.row as Product)}
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}
      
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h2">
              Gestión de Productos
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Usando FakeStoreAPI - Los cambios son simulados y no se persisten
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          >
            Nuevo Producto
          </Button>
        </Box>

        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={products}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>

      {/* Dialog para crear/editar */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Título"
              value={formData.title}
              onChange={handleChange('title')}
              fullWidth
              required
            />
            <TextField
              label="Descripción"
              value={formData.description}
              onChange={handleChange('description')}
              fullWidth
              multiline
              rows={3}
              required
            />
            <TextField
              label="Precio"
              type="number"
              value={formData.price}
              onChange={handleChange('price')}
              fullWidth
              required
              inputProps={{ step: '0.01', min: '0' }}
            />
            <TextField
              label="Categoría"
              value={formData.category}
              onChange={handleChange('category')}
              fullWidth
              required
              placeholder="electronics, jewelery, men's clothing, women's clothing"
            />
            <TextField
              label="URL de la Imagen"
              value={formData.image}
              onChange={handleChange('image')}
              fullWidth
              required
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {formData.image && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar 
                  src={formData.image} 
                  variant="rounded" 
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            {editingProduct ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ManageProduct;