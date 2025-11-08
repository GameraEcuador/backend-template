# 🚀 Backend con Node.js y TypeScript

Este repositorio contiene una plantilla básica para un backend en Node.js usando TypeScript. El README ha sido limpiado y organizado para que puedas arrancar rápido.

## Contenido

- `src/` — código fuente en TypeScript
- `tsconfig.json` — configuración de TypeScript
- `package.json` — scripts y dependencias

## 📦 Requisitos

- Node.js 16+ (recomendado 18+ LTS)
- npm (o yarn/pnpm)

## Instalación

Abre una terminal en la raíz del proyecto y ejecuta:

```cmd
npm install
```

## Scripts útiles

Los scripts que suelen estar en `package.json` (ajusta si tu `package.json` difiere):

- `npm run dev` — Ejecuta la app en modo desarrollo (p. ej. `tsx` o `ts-node` / watcher)
- `npm run build` — Compila TypeScript a JavaScript (`tsc`)
- `npm start` — Ejecuta la versión compilada desde `dist/`

Ejemplos (Windows - cmd.exe):

```cmd
npm run dev
npm run build
npm start
```

## Configuración recomendada de TypeScript

A continuación tienes una configuración recomendada mínima para `tsconfig.json` en proyectos backend (ajusta `module` según tus necesidades):

```jsonc
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Notas:

- Si usas ESM (imports nativos y `"type": "module"` en `package.json`), considera `"module": "nodenext"` o `"module": "es2020"` y `"moduleResolution": "nodenext"`.
- Si mantienes CommonJS, `"module": "commonjs"` y `"moduleResolution": "node16"` (o `"node"`) suelen funcionar bien.

### Sobre la advertencia de TypeScript (deprecations)

Si ves mensajes como:

> Option 'moduleResolution=node10' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

Significa que una opción de `moduleResolution` antigua (por ejemplo `node10`) está en desuso. Soluciones:

1. Actualiza `tsconfig.json` para usar una opción moderna: `node16`, `nodenext` o `bundler` (esta última requiere `module` compatible).
2. Si necesitas silenciar la advertencia temporalmente, añade en `compilerOptions`:

```jsonc
"ignoreDeprecations": "6.0"
```

Pero lo ideal es migrar la configuración según la versión de Node y si usas ESM o CommonJS.

## Variables de entorno

Usa un archivo `.env` (no lo subas al repositorio) o configura las variables en tu entorno. Ejemplo común:

```
PORT=3000
NODE_ENV=development
```

## Estructura sugerida

```
├─ src/
│  ├─ index.ts        # punto de entrada
│  ├─ routes/         # rutas / controladores
│  └─ lib/            # utilidades
├─ dist/              # compilado (generado)
├─ package.json
└─ tsconfig.json
```

## Contribuir

Si quieres mejorar esta plantilla:

1. Haz fork y crea una rama descriptiva.
2. Añade tests y documentación.
3. Abre un pull request con una descripción clara.

## Licencia

Agrega aquí la licencia del proyecto (por ejemplo MIT) o deja una nota si es privada.

---

Si quieres, puedo también:

- Ajustar el README para que refleje exactamente los scripts de tu `package.json` (puedo leerlo ahora).
- Añadir ejemplos concretos (Express, Fastify, autenticación, pruebas).

Dime qué prefieres y lo adapto.
