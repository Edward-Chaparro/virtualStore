import { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import InfoDialog from '../components/InfoDialog';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular envío
    setDialogOpen(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Contacto</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        ¿Tienes preguntas? Envíanos un mensaje y te contestaremos pronto.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Mensaje" value={message} onChange={(e) => setMessage(e.target.value)} multiline rows={4} required />
        <Button type="submit" variant="contained">Enviar</Button>
      </Box>

      <InfoDialog
        open={dialogOpen}
        title="Mensaje enviado"
        message="Gracias por contactarnos. Te responderemos lo antes posible."
        type="success"
        onClose={() => setDialogOpen(false)}
      />
    </Container>
  );
}

export default Contact;
