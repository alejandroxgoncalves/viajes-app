# 📱 App de Viajes – Registro y Organización de Viajes Colaborativos

Esta es una aplicación móvil desarrollada con **React Native**, **Expo Router** y **Supabase** como backend, pensada para ayudarte a organizar **viajes grupales**, registrando:

- 🧭 Destinos
- 👥 Integrantes
- 💰 Costos compartidos

---

## 🚀 Tecnologías utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router](https://expo.dev/router)
- [Supabase](https://supabase.com/)
- JavaScript 

---

## ⚙️ Instalación y ejecución

1. Cloná el repositorio:

git clone https://github.com/alejandroxgoncalves/viajes-app.git
cd viajes-app


2.Instalá las dependencias:

npm install
3. Iniciá la app:

npx expo start



📂 Estructura del proyecto

app/: contiene todas las pantallas principales organizadas por secciones (viajes, costos, integrantes, destinos).
components/: componentes reutilizables y específicos por módulo.
api/: funciones que se conectan con Supabase.
lib/supabase.js: instancia y configuración del cliente Supabase.
constants/, hooks/, scripts/: módulos de soporte.


🛠️ Funcionalidades principales

Crear, editar y eliminar viajes.
Agregar destinos a cada viaje.
Gestionar una lista de integrantes.
Registrar costos compartidos entre los participantes.
Navegación por pestañas y formularios personalizados.
