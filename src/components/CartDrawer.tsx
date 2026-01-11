import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  const handleCheckout = () => {
    alert(`Total a pagar: $${getCartTotal().toFixed(2)}\n\n¡Gracias por tu compra!`);
    clearCart();
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Carrito de Compras
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              Tu carrito está vacío
            </Typography>
          </Box>
        ) : (
          <>
            <List sx={{ flexGrow: 1, overflow: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
              {cartItems.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{ px: 0, py: 2 }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeFromCart(item.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={item.image} variant="rounded" sx={{ width: 60, height: 60 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {item.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                          ${item.price.toFixed(2)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <TextField
                            size="small"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                updateQuantity(item.id, value);
                              }
                            }}
                            slotProps={{
                              input: {
                                style: { textAlign: 'center', width: '40px' },
                              },
                              htmlInput: {
                                min: 1,
                              },
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    }
                    sx={{ ml: 2, mr: 4 }}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            {/* Total */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1">${getCartTotal().toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Total:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="primary">
                  ${getCartTotal().toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<ShoppingCartCheckoutIcon />}
                onClick={handleCheckout}
              >
                Finalizar Compra
              </Button>

              <Button
                variant="outlined"
                fullWidth
                size="small"
                color="error"
                sx={{ mt: 1 }}
                onClick={clearCart}
              >
                Vaciar Carrito
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}

export default CartDrawer;