<div
  align="center"
  style="display: flex; justify-content: center; align-items: center; gap: 20px;"
>
  <a href="https://nextjs.org/" target="_blank">
    <img
      src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png"
      width="120"
      alt="Next.js Logo"
    />
  </a>

  <a href="https://react.dev/" target="_blank">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
      width="120"
      alt="React Logo"
    />
  </a>
</div>

# 🏋️ HarFit Web

HarFit Web es la plataforma web de HarFit para gestionar entrenamientos, rutinas y progreso físico.

La aplicación permite:

- Crear y administrar rutinas
- Registrar ejercicios y series
- Monitorear progreso
- Gestionar autenticación y perfil

La idea y experiencia general del producto está inspirada en **Hevy**, tomando como referencia su enfoque de seguimiento de entrenamientos y experiencia de usuario, adaptándolo a la arquitectura y necesidades propias de HarFit.

---

# 📐 Arquitectura

La aplicación está construida con:

- **Next.js 15**
- **React 19**
- **TypeScript**

La arquitectura combina:

- **Atomic Design**
- **Feature/Module Architecture**
- **App Router**
- Separación de responsabilidades
- UI desacoplada de la lógica de negocio

El objetivo principal es mantener una base de código:

- Escalable
- Mantenible
- Modular
- Reutilizable

---

# 📂 Estructura del Proyecto

```bash
src/
 ├── api/               # Configuración API
 │
 ├── app/               # App Router
 │
 ├── components/        # UI Components reutilizables
 │   ├── atoms/
 │   ├── molecules/
 │   ├── organisms/
 │   ├── ui/
 │   └── views/
 │
 ├── context/           # Context Providers
 │
 ├── hooks/             # Custom Hooks globales
 │
 ├── infrastructure/    # Configuración técnica e interfaces
 │
 ├── lib/               # Helpers compartidos
 │
 ├── modules/           # Features del dominio
 │
 ├── types/             # Types globales
 │
 ├── utils/             # Utilities
 │
 └── proxy.ts
```

---

# 🎨 UI — Atomic Design

La UI está organizada siguiendo Atomic Design.

## Atoms

Componentes básicos y reutilizables.

Los atoms:

- No contienen lógica de negocio
- Son altamente reutilizables
- Son independientes del dominio

---

## Molecules

Composición de múltiples atoms.

Las molecules:

- Combinan atoms
- Mantienen responsabilidad única
- Siguen siendo reutilizables
- Representan funcionalidades visuales pequeñas

---

## Organisms

Componentes complejos compuestos por molecules y atoms.

Los organisms:

- Representan secciones completas de UI
- Pueden contener lógica visual
- No deben contener lógica de negocio compleja

---

## Views

Pantallas completas o composiciones de página.

Las views:

- Orquestan organisms
- Representan la UI final
- Consumen hooks y módulos

---

# 🧠 Arquitectura Modular

Cada feature vive dentro de su propio módulo.

```bash
modules/
```

Cada módulo encapsula:

- Lógica de negocio
- Estado
- Servicios
- Validaciones
- Tipos específicos

---

# 📦 Diferencia entre Components y Modules

## components/

Contiene UI reutilizable y desacoplada del dominio.

Reglas:

- No contiene lógica de negocio
- No depende de modules/
- Puede reutilizarse en cualquier feature

---

## modules/

Contiene lógica específica del dominio o feature.

Reglas:

- Encapsula comportamiento del negocio
- Puede consumir components/
- No debe depender de app/

---

# 🏛 Principios de Arquitectura

La arquitectura sigue los siguientes principios:

- Separación de responsabilidades
- Bajo acoplamiento
- Alta cohesión
- Modularidad
- Reutilización
- Escalabilidad
- Mantenibilidad

---

# 🔄 Flujo de la Aplicación

```txt
Page / View
    ↓
Hook
    ↓
Service
    ↓
API
    ↓
Response
    ↓
UI
```

---

# 🧩 Responsabilidades por Carpeta

## app/

Responsable de:

- Routing
- Layouts
- Server Components
- Client Components
- Orquestación de features

No debe contener:

- Lógica de negocio compleja
- Estado global de dominio

---

## components/

Responsable de:

- UI reutilizable
- Diseño visual
- Componentes desacoplados

No debe contener:

- Lógica de negocio
- Fetching de datos

---

## modules/

Responsable de:

- Features del dominio
- Casos de uso
- Estado de negocio
- Validaciones
- Servicios

No debe contener:

- UI global reutilizable

---

## hooks/

Responsable de:

- Reutilización de lógica React
- Hooks compartidos

---

## infrastructure/

Responsable de:

- Configuración técnica
- Contratos
- API clients
- Manejo de errores
- Interfaces compartidas

---

## lib/

Responsable de:

- Helpers reutilizables
- Funciones compartidas
- Configuraciones auxiliares

---

## types/

Responsable de:

- Tipos globales
- Contratos compartidos

---

# 📦 State Management

La aplicación utiliza:

- **Zustand**
- **TanStack React Query**

---

## Zustand

Usado para:

- Estado global
- Sesión de usuario
- Estado persistente del cliente
- UI State

---

## React Query

Usado para:

- Server State
- Fetching
- Cache
- Sincronización con backend
- Invalidación automática

---

# 📏 Reglas de Arquitectura

## Dependencias

```txt
app → modules → infrastructure
        ↓
   components
```

---

## Reglas

- `components/` NO depende de `modules/`
- `modules/` NO depende de `app/`
- `services/` NO contiene lógica UI
- `hooks/` deben ser reutilizables
- `types/` globales deben evitar duplicados
- La UI debe permanecer desacoplada del negocio

---

# 📱 App Router

Ubicación:

```txt
src/app/
```

Responsabilidades:

- Manejo de rutas
- Layouts
- Renderizado híbrido
- Server Components
- Client Components

---

# 🧪 Validaciones

La aplicación utiliza:

- **Zod**
- **React Hook Form**

Beneficios:

- Formularios tipados
- Validación declarativa
- Mejor DX
- Integración con TypeScript

---

# 🚀 Main Tech Stack

| Tecnología      | Uso                 |
| --------------- | ------------------- |
| Next.js 15      | Framework principal |
| React 19        | UI                  |
| TypeScript      | Tipado estático     |
| TailwindCSS     | Styling             |
| Shadcn/UI       | Componentes base    |
| Zustand         | Estado global       |
| React Query     | Server State        |
| React Hook Form | Formularios         |
| Zod             | Validaciones        |
| Axios           | HTTP Client         |

---

# ⚙️ Getting Started

## 1. Instalar dependencias

```bash
npm install
```

---

## 2. Configurar variables de entorno

Crear un archivo `.env`:

```env
NEXT_PUBLIC_API_URL=
```

---

## 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

```txt
http://localhost:3000
```

---

# 📦 Production Build

## Build

```bash
npm run build
```

---

## Start

```bash
npm run start
```

---

# 🧪 Lint

```bash
npm run lint
```

---

# 📄 Naming Conventions

| Elemento   | Convención   |
| ---------- | ------------ |
| Components | PascalCase   |
| Hooks      | useSomething |
| Utils      | camelCase    |
| Types      | PascalCase   |
| Constants  | UPPER_CASE   |
| Files      | kebab-case   |

---

# 🧪 Testing Strategy

Planeado:

- Unit Testing
- Integration Testing
- E2E Testing

---

# 📈 Escalabilidad

La arquitectura está preparada para:

- Nuevas features desacopladas
- Reutilización de UI
- Escalabilidad horizontal
- Testing modular
- Internacionalización
- Integración con nuevas APIs

---

# 📌 Decisiones Técnicas

## Zustand

Elegido por:

- Simplicidad
- Bajo boilerplate
- Excelente DX
- Integración natural con React

---

## React Query

Elegido para:

- Manejo de server state
- Cache automática
- Invalidación eficiente
- Sincronización con backend

---

## Atomic Design

Elegido para:

- Reutilización
- Escalabilidad visual
- Consistencia UI
- Separación de componentes

---

# 🚀 Objetivo

Mantener una arquitectura limpia, escalable y mantenible.

Cada capa tiene una responsabilidad específica y la UI
permanece desacoplada de la lógica de negocio.

---

# 📜 Filosofía

HarFit busca mantener una arquitectura orientada a:

- Escalabilidad
- Mantenibilidad
- Modularidad
- Separación clara de responsabilidades

Cada módulo encapsula su dominio y la UI permanece
independiente de la lógica de negocio.
