<div align="center">

# 🌸 Mis Recordatorios

**Una PWA de recordatorios con notificaciones push reales — funciona aunque el teléfono esté bloqueado.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat-square&logo=pwa)

</div>

---

## ✨ Features

- **Notificaciones push reales** — llegan aunque la app esté cerrada o la pantalla bloqueada
- **Instalable como app nativa** en Android e iOS sin pasar por ninguna tienda
- **Funciona offline** — caché de assets y fuentes via Service Worker + Workbox
- **Categorías y prioridades** — Universidad, Personal, Salud, Finanzas, Social
- **Repetición de recordatorios** — diaria, semanal o mensual
- **Estadísticas en tiempo real** — próximos, vencidos y completados
- **Alarma sonora** via Web Audio API cuando la app está en primer plano

---

## 🛠️ Stack

| Capa | Tecnología |
|---|---|
| Frontend | React 19 + Vite 8 |
| Estilos | CSS puro con variables custom (sin librerías) |
| Base de datos | Supabase (PostgreSQL) |
| Push notifications | Web Push API + VAPID + Workbox |
| Backend / Cron | Vercel Serverless Functions + Vercel Cron |
| PWA | vite-plugin-pwa + Service Worker custom |
| Deploy | Vercel |

---

## 🏗️ Arquitectura

```
src/
├── components/
│   ├── banners/        # NotifBanner
│   ├── layout/         # Header
│   ├── modals/         # ReminderModal
│   ├── reminders/      # ReminderCard, ReminderList
│   └── ui/             # StatsRow, Filters, Toast, EmptyState
├── constants/          # CATEGORIES, PRIORITY, EMOJI_MAP
├── hooks/
│   ├── useReminders.js       # CRUD con Supabase
│   ├── useReminderForm.js    # Estado del formulario
│   ├── useAlarm.js           # Web Audio API
│   ├── useToasts.js          # Notificaciones in-app
│   ├── useNotifications.js   # Permisos del navegador
│   └── usePushSubscription.js # Registro de dispositivo
├── lib/
│   └── supabase.js     # Cliente de Supabase
├── styles/
│   └── app.css         # Estilos globales
├── utils/
│   ├── audio.js        # playAlarm
│   ├── formatters.js   # formatDateTime, isOverdue
│   └── storage.js      # generateId
└── sw.js               # Service Worker (precache + push handler)

api/
└── cron.js             # Vercel Cron — dispara pushes cada minuto
```

---

## 🔔 Cómo funcionan las notificaciones push

```
1. Usuario abre la app y acepta notificaciones
2. usePushSubscription registra el dispositivo en Supabase (push_subscriptions)
3. Usuario crea un recordatorio → se guarda en Supabase (reminders)
4. Vercel Cron ejecuta /api/cron cada minuto
5. El cron revisa si hay recordatorios dentro de la ventana ±60s
6. Si hay alguno → envía push via VAPID a todos los dispositivos registrados
7. El Service Worker recibe el push y muestra la notificación nativa del OS
```

---

## 🚀 Setup local

### 1. Clona el repo

```bash
git clone https://github.com/TU_USUARIO/records.git
cd records
npm install --legacy-peer-deps
```

### 2. Configura Supabase

Crea un proyecto en [supabase.com](https://supabase.com) y ejecuta en el SQL Editor:

```sql
create table reminders (
  id text primary key,
  title text not null,
  description text,
  date text not null,
  time text not null,
  category text not null default 'personal',
  priority text not null default 'medium',
  repeat text not null default 'none',
  done boolean not null default false,
  triggered boolean not null default false,
  reminder_at bigint,
  created_at bigint not null
);

create table push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamp with time zone default now()
);
```

### 3. Genera VAPID keys

Genera tus keys en [vapidkeys.com](https://vapidkeys.com).

### 4. Crea el `.env`

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
VITE_VAPID_PUBLIC_KEY=tu_vapid_public_key

SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
VAPID_PRIVATE_KEY=tu_vapid_private_key
VAPID_EMAIL=mailto:tu@email.com
CRON_SECRET=una_cadena_aleatoria_larga
```

### 5. Corre en local

```bash
npm i -g vercel
vercel dev
```

> El Service Worker y las notificaciones push requieren HTTPS — solo funcionan completamente en producción.

---

## 📦 Deploy en Vercel

1. Importa el repo en [vercel.com](https://vercel.com)
2. Agrega las 7 variables de entorno en **Settings → Environment Variables**
3. Deploy — el Cron Job se activa automáticamente cada minuto

---

## 📱 Instalar como app

**Android:** abre el link en Chrome → menú → *Agregar a pantalla de inicio*

**iOS:** abre el link en Safari → compartir → *Agregar a pantalla de inicio* (requiere iOS 16.4+)

---

<div align="center">

Hecho con 🌸 por [David Norato](https://github.com/dnrre)

</div>
