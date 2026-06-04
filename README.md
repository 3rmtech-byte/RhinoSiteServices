# 🚛 RhinoSiteServices — Field Operations App (Full Offline + Online)

RhinoSiteServices es una aplicación **full‑stack** diseñada para operadores de campo que entregan baños portátiles, trailas de basura y servicios similares.  
Funciona **100% offline y 100% online**, con sincronización inteligente, mapas offline, PWA, IndexedDB y backend API.

Este repositorio incluye:

- 🟦 **Backend** (Node.js + Express + PostgreSQL)
- 🟩 **Frontend PWA** (IndexedDB + Leaflet + QR Scanner + Sync Engine)
- 🐳 **Docker Compose** para levantar todo con un solo comando
- 🔄 **Sincronización offline/online**
- 📸 **Subida de fotos**
- 🗺️ **Mapas offline**
- 📱 **Modo PWA instalable**

---

## 🚀 Características principales

### ✔ Funciona sin internet (offline-first)
- Guarda trabajos, unidades, fotos y escaneos en IndexedDB
- Sincroniza automáticamente cuando vuelve la señal
- Service Worker para uso offline total

### ✔ Backend API completo
- CRUD de trabajos
- CRUD de unidades
- Escaneo QR
- Subida de fotos (multer)
- Sync push/pull
- Recursos offline

### ✔ Frontend PWA
- SPA con router
- IndexedDB para almacenamiento local
- Leaflet para mapas
- QR scanner integrado
- UI ligera y rápida

### ✔ Docker listo para producción
- PostgreSQL
- Backend Express
- Frontend Nginx

---

## 📦 Estructura del proyecto

