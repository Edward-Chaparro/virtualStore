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
  Avatar,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Product } from '../types/Product';
import axios from 'axios';
import ConfirmDialog from './ConfirmDialog';
import InfoDialog from './InfoDialog';

const API_URL = 'https://fakestoreapi.com/products';

function ManageProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [successDialog, setSuccessDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({ open: false, title: '', message: '' });
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
      const response = await axios.get(API_URL);
      setProducts(response.data);
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
        // Actualizar producto (simulado) con axios
        const response = await axios.put(`${API_URL}/${editingProduct.id}`, formData);
        if (response.status < 200 || response.status >= 300) throw new Error('Error al actualizar');

        // Actualizar localmente
        setProducts(products.map(p => 
          p.id === editingProduct.id 
            ? { ...editingProduct, ...formData } 
            : p
        ));

        setSuccessDialog({
          open: true,
          title: 'Producto actualizado',
          message: 'El producto se ha actualizado correctamente (simulado).',
        });
      } else {
        // Crear nuevo producto (simulado) con axios
        const response = await axios.post(API_URL, formData);
        if (response.status < 200 || response.status >= 300) throw new Error('Error al crear');
        const newProduct = response.data;

        // Agregar localmente
        setProducts([...products, { ...formData, id: newProduct.id }]);

        setSuccessDialog({
          open: true,
          title: 'Producto creado',
          message: 'El producto se ha creado correctamente (simulado).',
        });
      }
      handleClose();
    } catch (err) {
      setError('Error al guardar el producto');
      console.error(err);
    }
  };

  const handleDeleteClick = (id: number) => {
    setConfirmDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (confirmDelete === null) return;
    
    try {
      const response = await axios.delete(`${API_URL}/${confirmDelete}`);
      if (response.status < 200 || response.status >= 300) throw new Error('Error al eliminar');

      // Eliminar localmente
      setProducts(products.filter(p => p.id !== confirmDelete));

      setSuccessDialog({
        open: true,
        title: 'Producto eliminado',
        message: 'El producto se ha eliminado correctamente (simulado).',
      });

      setConfirmDelete(null);
    } catch (err) {
      setError('Error al eliminar el producto');
      console.error(err);
      setConfirmDelete(null);
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
            onClick={() => handleDeleteClick(params.row.id)}
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
        <InfoDialog
          open={true}
          title="Error"
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}
      
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h2">
              Gestión de Productos
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

        {/* Diálogo de confirmación de eliminar producto */}
        <ConfirmDialog
          open={confirmDelete !== null}
          title="Eliminar producto"
          message="¿Deseas eliminar este producto?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDelete(null)}
          confirmText="Eliminar"
          confirmColor="error"
        />
    </Container>
  );
}

export default ManageProduct;