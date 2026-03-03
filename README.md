# Sistema de Gestión de Reservas de Citas Médicas

Propuesta de Arquitectura de Software — Prueba de concepto con **Arquitectura Hexagonal** (Ports and Adapters).

## Descripción

Sistema de reservas de citas médicas que permite crear, listar, consultar y cancelar reservas. Implementado como demostración de la arquitectura hexagonal para un proyecto académico.

## Arquitectura

```
src/
├── domain/           # Núcleo - Lógica de negocio pura
│   ├── entities/     # Entidades del dominio
│   └── ports/        # Interfaces (puertos)
├── application/      # Casos de uso
│   └── services/
├── infrastructure/   # Adaptadores externos
│   ├── adapters/     # Implementación de puertos
│   └── http/         # API REST (Express)
└── index.js          # Punto de entrada
```

## Requisitos

- Node.js 18+

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

- **Interfaz web:** http://localhost:3000 — Formulario para crear reservas y listar/cancelar existentes

## API

### Crear una reserva
```
POST /api/reservas
Content-Type: application/json

{
  "pacienteId": "P001",
  "pacienteNombre": "Juan Pérez",
  "medicoId": "M001",
  "fecha": "2025-03-01",
  "hora": "10:00",
  "motivo": "Consulta general"
}
```

### Listar reservas
```
GET /api/reservas
```

### Obtener reserva por ID
```
GET /api/reservas/:id
```

### Cancelar reserva
```
DELETE /api/reservas/:id
```

## Licencia

MIT
