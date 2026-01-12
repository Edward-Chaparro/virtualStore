import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  InputAdornment,
  Paper,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  sortBy: string;
  onSortChange: (value: string) => void;
  productCount: number;
}

function ProductFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  sortBy,
  onSortChange,
  productCount,
}: ProductFiltersProps) {
  const handleCategoryChange = (event: SelectChangeEvent) => {
    onCategoryChange(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <FilterListIcon color="primary" />
        <Box sx={{ flexGrow: 1 }}>
          <Chip 
            label={`${productCount} productos encontrados`} 
            color="primary" 
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
        }}
      >
        {/* Búsqueda */}
        <TextField
          fullWidth
          label="Buscar productos"
          placeholder="Buscar por nombre o descripción..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Filtro por categoría */}
        <FormControl sx={{ minWidth: { xs: '100%', md: 200 } }}>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={selectedCategory}
            label="Categoría"
            onChange={handleCategoryChange}
          >
            <MenuItem value="all">Todas las categorías</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Ordenar por */}
        <FormControl sx={{ minWidth: { xs: '100%', md: 180 } }}>
          <InputLabel>Ordenar por</InputLabel>
          <Select value={sortBy} label="Ordenar por" onChange={handleSortChange}>
            <MenuItem value="default">Por defecto</MenuItem>
            <MenuItem value="price-asc">Precio: Menor a Mayor</MenuItem>
            <MenuItem value="price-desc">Precio: Mayor a Menor</MenuItem>
            <MenuItem value="name-asc">Nombre: A-Z</MenuItem>
            <MenuItem value="name-desc">Nombre: Z-A</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}

export default ProductFilters;