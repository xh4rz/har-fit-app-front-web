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

**HarFit Web** es una plataforma diseñada para gestionar entrenamientos, rutinas y el progreso físico de los usuarios.

La aplicación permite:

- Crear y administrar rutinas de entrenamiento.
- Registrar ejercicios y series.
- Gestionar el perfil de usuario.
- Monitorear el progreso físico.

La experiencia general del producto está inspirada en **Hevy**, tomando como referencia su enfoque de seguimiento de entrenamientos y experiencia de usuario, mientras se implementa una arquitectura y lógica propias para HarFit.

---

## 🔐 Demo Access

Para facilitar la evaluación de la aplicación, puedes utilizar las siguientes credenciales de demostración:

| Rol              | Email              | Contraseña |
| ---------------- | ------------------ | ---------- |
| 👑 Administrador | `harold@gmail.com` | `-Abc123`  |
| 👤 Usuario       | `olga@gmail.com`   | `-Abc123`  |

> ⚠️ Estas credenciales están destinadas únicamente a fines de demostración y evaluación del proyecto.

---

## 🛠️ Tech Stack

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

# 📐 Arquitectura

HarFit Web combina **Atomic Design** para la organización de la interfaz con una **arquitectura modular orientada a features**, buscando mantener una clara separación de responsabilidades entre la UI, la lógica de negocio y la infraestructura.

La arquitectura está diseñada para mantener el proyecto:

- Escalable.
- Mantenible.
- Modular.
- Reutilizable.
- Desacoplado.

## 📂 Estructura del Proyecto

```bash
src/
├── api/                # Configuración y clientes HTTP
├── app/                # Next.js App Router
│
├── components/         # Componentes de UI reutilizables
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── ui/
│   └── views/
│
├── context/            # Context Providers
├── hooks/              # Custom Hooks compartidos
├── infrastructure/     # Configuración técnica e interfaces
├── lib/                # Helpers y configuraciones compartidas
├── modules/            # Features y lógica del dominio
├── types/              # Tipos globales
├── utils/              # Utilidades
│
└── proxy.ts
```

## 🎨 Organización de la UI

La interfaz sigue el enfoque de **Atomic Design**:

- **Atoms:** Componentes básicos, independientes y altamente reutilizables.
- **Molecules:** Composición de múltiples atoms para crear pequeñas funcionalidades visuales.
- **Organisms:** Componentes más complejos que representan secciones completas de la interfaz.
- **Views:** Composiciones de mayor nivel que representan pantallas o secciones principales.

La UI se mantiene desacoplada de la lógica de negocio para facilitar su reutilización y mantenimiento.

## 🧠 Arquitectura Modular

Las funcionalidades del dominio se organizan dentro de `modules/`.

Cada módulo puede encapsular responsabilidades relacionadas con una feature, como:

- Lógica de negocio.
- Estado.
- Servicios.
- Validaciones.
- Tipos específicos.

Esto permite que cada feature evolucione de forma más independiente y reduce el acoplamiento entre funcionalidades.

## 📦 Responsabilidades y Dependencias

```txt
app
 ↓
modules
 ↓
infrastructure

components
 ↕
UI reutilizable
```

Principales reglas de la arquitectura:

- `components/` no depende de `modules/`.
- `modules/` no depende de `app/`.
- Los servicios no contienen lógica de UI.
- La lógica de negocio permanece separada de los componentes visuales.
- Los hooks compartidos deben ser reutilizables.
- Los tipos globales deben evitar duplicaciones innecesarias.

## 🔄 Flujo de la Aplicación

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

Este flujo busca mantener una separación clara entre la interfaz, la lógica de la aplicación y la comunicación con el backend.

---

# 📦 State Management

La aplicación utiliza dos herramientas principales para el manejo del estado:

- **Zustand**
- **TanStack React Query**

## Zustand

Utilizado principalmente para:

- Estado global.
- Sesión del usuario.
- Estado persistente del cliente.
- Estado relacionado con la interfaz.

## TanStack React Query

Utilizado para:

- Server State.
- Fetching de datos.
- Caché.
- Sincronización con el backend.
- Invalidación de datos.

---

# 🧪 Formularios y Validaciones

La aplicación utiliza:

- **React Hook Form**
- **Zod**

Beneficios:

- Formularios tipados.
- Validación declarativa.
- Integración con TypeScript.
- Mejor experiencia de desarrollo.
- Separación entre la lógica de formularios y la interfaz.

---

# ⚙️ Getting Started

## 1. Clonar el proyecto

```bash
git clone https://github.com/xh4rz/har-fit-app-front-web
cd har-fit-app-front-web
```

## 2. Instalar dependencias

```bash
pnpm install
```

## 3. Configurar variables de entorno

Crear un archivo `.env`:

```env
NEXT_PUBLIC_API_URL=
```

## 4. Iniciar el servidor de desarrollo

```bash
pnpm run dev
```

La aplicación estará disponible en:

```txt
http://localhost:3000
```

---

# 🚀 Production Build

## Build

```bash
pnpm run build
```

## Start

```bash
pnpm run start
```

---

# 🧪 Lint

```bash
pnpm run lint
```

---

# 📏 Naming Conventions

| Elemento   | Convención   |
| ---------- | ------------ |
| Components | PascalCase   |
| Hooks      | useSomething |
| Functions  | camelCase    |
| Types      | PascalCase   |
| Constants  | UPPER_CASE   |
| Files      | kebab-case   |

---

# 🧪 Testing Strategy

Actualmente, la arquitectura está preparada para incorporar:

- Unit Testing.
- Integration Testing.
- End-to-End Testing.

---

# 📈 Escalabilidad

La arquitectura está diseñada para facilitar:

- Incorporación de nuevas features.
- Reutilización de componentes.
- Testing modular.
- Integración con nuevas APIs.
- Internacionalización.
- Evolución independiente de los módulos.

---

# 🚀 Objetivo

HarFit Web busca mantener una arquitectura **limpia, escalable y mantenible**, donde cada capa tenga una responsabilidad clara.

La aplicación está diseñada para permitir que nuevas funcionalidades puedan incorporarse sin afectar innecesariamente las existentes, manteniendo una separación entre la **interfaz**, la **lógica de negocio** y la **infraestructura**.
