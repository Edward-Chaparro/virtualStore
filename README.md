## Virtual Store
Una aplicación moderna de e-commerce desarrollada con React, TypeScript y Material UI. Incluye un sistema completo de gestión de productos (CRUD), catálogo interactivo, categorías, ofertas, formulario para contacto y carrito de compras funcional.

# Características

## Gestión de Productos (CRUD)

Crear nuevos productos
Editar productos existentes
Eliminar productos con confirmación
Tabla interactiva con paginación
Vista previa de imágenes

## Categorías

Filtro por categorías de cada producto
Búsqueda de productos

## Ofertas

Muestra los productos en promoción con sus respectivas imágenes

## Contacto

Muestra formulario para que el usuario pueda contactar con la empresa

## Carrito de Compras

Agregar/eliminar productos
Agregar/reducir cantidades
Cálculo automático del total
Finalizar compra

## Interfaz de Usuario

Diseño moderno y profesional con Material UI
Totalmente responsive (mobile, tablet, desktop)
Navegación por pestañas
Diálogos y notificaciones elegantes
Animaciones suaves y transiciones
Menú superior con contador de carrito

# Tecnologías

## Frontend

React 18 - Biblioteca de UI
TypeScript - Tipado estático
Vite - Build tool ultrarrápido
Material UI (MUI) - Componentes de interfaz
MUI DataGrid - Tablas avanzadas
Context API - Gestión de estado global

## API

FakeStore API - API REST de productos para desarrollo

## Requisitos Previos

Node.js 18 o superior
npm

# Instalación

## 1. Clonar el repositorio

git clone https://github.com/Edward-Chaparro/virtualStore.git
cd virtualStore

## 2. Instalar dependencias

npm install

# Estructura del proyecto
src/
├── components/          # Componentes de React
│   ├── MainMenu.tsx           # Menú de navegación principal
│   ├── ProductCatalog.tsx     # Catálogo de productos
│   ├── ManageProducto.tsx     # Administración de productos
│   ├── ProductFilters.tsx     # Búsqueda y filtros
│   ├── CartDrawer.tsx         # Panel lateral del carrito
│   ├── ConfirmDialog.tsx      # Diálogo de confirmación
│   └── InfoDialog.tsx         # Diálogo informativo
├── context/             # Context API
│   └── CartContext.tsx        # Estado global del carrito
├── pages/               # Páginas de navegación
│    └── Home.tsx             # Página principal
│    └── Products.tsx         # Lista de productos
│    └── Categories.tsx       # Filtro por categorías
│    └── Offers.tsx           # Promoción de productos
│    └── Contact.tsx          # Formulario de contacto
├── types/               # Tipos de TypeScript
│   └── Product.ts             # Interface de productos
├── App.tsx              # Componente principal
└── main.tsx             # Punto de entrada

# Flujo de Trabajo con Git

## Este proyecto utiliza un flujo de trabajo con ramas:

main - Código estable en producción
dev - Desarrollo activo
feature/* - Nuevas características

# Autor
## Edward Chaparro
GitHub: @Edward-Chaparro
Proyecto: Virtual Store
