# Sistema de Gestión de Reservas de Citas Médicas

Propuesta de Arquitectura de Software — Prueba de concepto con **Arquitectura Hexagonal** (Ports and Adapters).

---

## Contexto de la Problemática

En consultorios médicos, clínicas pequeñas y centros de salud de atención primaria es frecuente observar una gestión de citas basada en métodos manuales: agendas en papel, llamadas telefónicas o mensajes por WhatsApp. Esta situación genera múltiples inconvenientes:

- **Pérdida de citas**: Los registros en papel se extravían o se dañan, provocando que los pacientes no tengan confirmación de su turno.
- **Sobrecarga administrativa**: El personal dedica tiempo considerable a coordinar horarios entre médicos y pacientes.
- **Falta de visibilidad**: Ni los pacientes ni los médicos tienen una visión clara de la disponibilidad en tiempo real.
- **Escalabilidad limitada**: A medida que crece la demanda, el sistema manual colapsa y no permite incorporar nuevos canales (web, aplicación móvil) sin rehacer todo el proceso.

Se requiere un sistema de software que permita registrar y consultar reservas de forma centralizada, mantener la integridad de los datos y facilitar la evolución futura (integración con bases de datos, notificaciones, aplicación móvil). La solución debe ser **mantenible**, **escalable** e **independiente** de las tecnologías concretas.

---

## Arquitectura: Hexagonal (Ports and Adapters)

### Descripción

La **Arquitectura Hexagonal** (propuesta por Alistair Cockburn) organiza el sistema en torno a un **núcleo de dominio** que contiene la lógica de negocio pura, rodeado por **puertos** (interfaces) que definen cómo el sistema interactúa con el exterior, y **adaptadores** que implementan esas interfaces para tecnologías concretas.

### Estructura del proyecto

```
src/
├── domain/           # Núcleo - Entidades y reglas de negocio
│   ├── entities/     # Reserva (entidad con lógica: cancelar, esValida)
│   └── ports/        # ReservaRepository (interfaz de persistencia)
├── application/      # Casos de uso
│   └── services/     # ReservaService (crear, listar, obtener, cancelar)
├── infrastructure/   # Adaptadores
│   ├── adapters/     # ReservaRepositoryInMemory (implementación en memoria)
│   └── http/         # Rutas Express (adaptador de entrada)
└── index.js          # Composición e inyección de dependencias
```

### ¿Por qué elegimos esta arquitectura?

| Atributo de calidad | Justificación |
|---------------------|---------------|
| **Mantenibilidad** | La lógica de negocio está aislada en el dominio. Cambios en la base de datos, la API o la interfaz no requieren modificar el núcleo. |
| **Testabilidad** | Los casos de uso pueden probarse con adaptadores falsos (mocks) en memoria, sin depender de bases de datos ni servicios externos. |
| **Escalabilidad** | Es posible añadir nuevos adaptadores (GraphQL, cola de mensajes, notificaciones) sin alterar el dominio. |
| **Independencia de frameworks** | El dominio no depende de Express, MySQL ni ninguna tecnología externa. Se puede migrar o sustituir sin reescribir la lógica. |
| **Flexibilidad** | El cambio de persistencia (de memoria a MySQL o PostgreSQL) se realiza mediante un nuevo adaptador que implementa el mismo puerto. |

### Comparación con otras opciones

- **Arquitectura en capas**: Más rígida; la capa de presentación suele depender de la de datos. La hexagonal invierte las dependencias: el dominio depende de interfaces, no de implementaciones.
- **Microservicios**: Adecuada para sistemas distribuidos; la hexagonal puede aplicarse en cada microservicio. Para una prueba de concepto de un solo servicio, la hexagonal es más simple y suficiente.
- **MVC**: Centrada en la interfaz de usuario. La hexagonal separa claramente el dominio de la capa de presentación y permite múltiples interfaces (REST, GraphQL, CLI).

---

## Instrucciones de ejecución

### Requisitos

- Node.js 18+

### Instalación

```bash
npm install
```

### Ejecución

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
