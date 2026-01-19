# MDRRMO Pio Duran Dashboard - Full Stack Application

A comprehensive disaster management system for MDRRMO Pio Duran with **full offline support** for critical features.

## 🚀 Quick Start

```bash
# Install all dependencies from root
yarn install:all

# Check service status
yarn status

# View logs
yarn logs:backend    # or yarn logs:frontend

# Test backend
yarn test:backend
```

**📚 See [ROOT_SCRIPTS.md](./ROOT_SCRIPTS.md) for all available commands**

## 🌟 Features

### Core Modules
1. **📦 Supply Inventory Management** - Track supplies and equipment
2. **👥 Contact Directory** - Manage emergency contacts
3. **📅 Calendar Management** - Schedule events and tasks
4. **📄 Document Management** - Access documents (Offline Supported ✅)
5. **📸 Photo Documentation** - Browse photo gallery
6. **🗺️ Maps** - View various map types (Offline Supported ✅)

### 🔌 Offline Capabilities
- **Documents Module**: Full offline access to cached documents
- **Maps Module**: View administrative, topographic, hazards, and other maps offline
- **Auto-sync**: Automatically syncs data when connection is restored
- **View-only Mode**: All cached data can be viewed offline
- **Service Worker**: Caches static assets for faster loading

### 🔄 Data Synchronization
- Automatic background sync when online
- Manual sync option available
- Real-time online/offline status indicator
- Cached data fallback when offline

## 🏗️ Architecture

### Backend (FastAPI + MongoDB)
- **Framework**: FastAPI
- **Database**: MongoDB (for caching)
- **APIs**:
  - Google Sheets API integration (proxied through backend)
  - Google Drive API integration (proxied through backend)
  - Caching layer for offline support
  - Sync endpoints for data updates

### Frontend (React)
- **Framework**: React 19
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **Offline Storage**: IndexedDB
- **PWA**: Service Worker for offline functionality

## 📁 Project Structure

```
/app
├── backend/
│   ├── server.py              # FastAPI server with all endpoints
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables (Google API keys)
│
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Dashboard.js
│   │   │   ├── SupplyInventory.js
│   │   │   ├── ContactDirectory.js
│   │   │   ├── CalendarManagement.js
│   │   │   ├── DocumentManagement.js (Offline ✅)
│   │   │   ├── PhotoDocumentation.js
│   │   │   ├── MapsViewer.js (Offline ✅)
│   │   │   ├── StatusBar.js
│   │   │   └── Toast.js
│   │   ├── context/
│   │   │   └── AppContext.js   # Global state management
│   │   ├── utils/
│   │   │   ├── api.js          # API client
│   │   │   └── indexedDB.js    # IndexedDB utilities
│   │   ├── App.js              # Main app with routing
│   │   └── App.css             # Styles and animations
│   ├── public/
│   │   └── service-worker.js   # PWA service worker
│   └── .env                     # Frontend environment variables
```

## 🚀 API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Google Sheets
- `GET /api/sheets/{sheet_name}` - Fetch sheet data (supply, event, contact)
- `GET /api/cache/sheets/{sheet_name}` - Get cached sheet data

### Google Drive
- `GET /api/drive/folder/{folder_id}` - Fetch folder contents
- `GET /api/cache/drive/folder/{folder_id}` - Get cached folder data

### Sync
- `POST /api/sync/all` - Sync all data (sheets + drive folders)
- `GET /api/cache/status` - Get cache status and last sync times

## 🔐 Configuration

### Backend (.env)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
GOOGLE_API_KEY=your_google_api_key
GOOGLE_SHEET_ID=your_google_sheet_id
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=your_backend_url
```

## 🗂️ Google Drive Folder IDs

The application uses the following Google Drive folders:

- **Documents Root**: `15_xiFeXu_vdIe2CYrjGaRCAho2OqhGvo`
- **Photos Root**: `1O1WlCjMvZ5lVcrOIGNMlBY4ZuQ-zEarg`
- **Panorama**: `1tsbcsTEfg5RLHLJLYXR41avy9SrajsqM`
- **Administrative Maps**: `1Wh2wSQuyzHiz25Vbr4ICETj18RRUEpvi`
- **Topographic Maps**: `1Y01dJR_YJdixvsi_B9Xs7nQaXD31_Yn2`
- **Hazards Maps**: `16xy_oUAr6sWb3JE9eNrxYJdAMDRKGYLn`
- **DENR-MGB Maps**: `1yQmtrKfKiMOFA933W0emzeGoexMpUDGM`
- **Other Maps**: `1MI1aO_-gQwsRbSJsfHY2FI4AOz9Jney1`

## 📊 Google Sheets

The application fetches data from three sheets:
- **supply** - Supply inventory data
- **event** - Calendar events and tasks
- **contact** - Contact directory

## 🌐 How Offline Mode Works

1. **First Visit (Online)**:
   - Application loads fresh data from Google APIs
   - Data is cached in MongoDB (backend) and IndexedDB (frontend)
   - Service Worker caches static assets

2. **Subsequent Visits (Offline)**:
   - Service Worker serves cached static assets
   - Application attempts to fetch fresh data
   - If offline, falls back to cached data in IndexedDB
   - Status bar shows "Offline - Using Cached Data"

3. **Coming Back Online**:
   - Status bar updates to "Online"
   - Automatic sync initiated
   - Fresh data fetched and cached
   - User notified of successful sync

## 🎯 User Experience Features

- **Status Indicator**: Always-visible online/offline status bar
- **Auto-sync**: Automatic synchronization when connection restored
- **Manual Sync**: Button to manually trigger data sync
- **Toast Notifications**: User-friendly notifications for actions
- **Loading States**: Clear loading indicators
- **Cached Data Badges**: Visual indication when viewing cached data
- **Responsive Design**: Works on all device sizes
- **Print Support**: Optimized printing for tables

## 🔧 Development

### Root-Level Scripts ✨
All commands can now be run from the `/app` root directory using yarn scripts:

```bash
# Installation
yarn install:all          # Install all dependencies
yarn install:backend      # Install Python dependencies only
yarn install:frontend     # Install Node.js dependencies only

# Service Management
yarn status              # Check service status
yarn restart:all         # Restart all services
yarn restart:backend     # Restart backend only
yarn restart:frontend    # Restart frontend only

# Logs
yarn logs:backend        # View backend logs
yarn logs:frontend       # View frontend logs

# Testing
yarn test:backend        # Test backend health

# Build & Cleanup
yarn build               # Build frontend for production
yarn clean:cache         # Clean frontend cache
yarn clean:all           # Clean everything
```

**📚 For complete documentation, see [ROOT_SCRIPTS.md](./ROOT_SCRIPTS.md)**

### Running Locally (Traditional Method)
The application is already running via supervisord:

```bash
# Check status
sudo supervisorctl status

# Restart services
sudo supervisorctl restart all

# View logs
tail -f /var/log/supervisor/backend.*.log
tail -f /var/log/supervisor/frontend.*.log
```

### Testing API Endpoints

```bash
# Health check
curl http://localhost:8001/api/health

# Fetch sheet data
curl http://localhost:8001/api/sheets/supply

# Fetch Drive folder
curl http://localhost:8001/api/drive/folder/15_xiFeXu_vdIe2CYrjGaRCAho2OqhGvo

# Sync all data
curl -X POST http://localhost:8001/api/sync/all

# Check cache status
curl http://localhost:8001/api/cache/status
```

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth animations and transitions
- Glassmorphism effects
- Responsive grid layouts
- Hover effects on cards
- Custom scrollbars
- Loading skeletons
- Status badges

## 📱 Progressive Web App (PWA)

The application can be installed as a PWA:
- Works offline
- Can be installed on mobile devices
- Fast loading with cached assets
- Background sync capability

## 🔒 Security

- Google API key secured in backend
- CORS configured properly
- No sensitive data exposed to frontend
- Secure HTTPS connections for API calls

## 🚧 Future Enhancements

- User authentication
- Edit capabilities for offline data
- Conflict resolution for synced data
- Push notifications
- Advanced filtering and sorting
- Export to PDF/Excel
- Data visualization dashboards

## 📝 Notes

- **View-Only Mode**: In offline mode, all data is read-only
- **Cache Duration**: Cached data persists until browser cache is cleared
- **Auto-Sync**: Triggers automatically when connection is restored
- **Browser Compatibility**: Works best in modern browsers (Chrome, Firefox, Safari, Edge)

## 🆘 Support

For issues or questions:
1. Check browser console for errors
2. Verify API keys are correct
3. Ensure MongoDB is running
4. Check network connectivity
5. Clear browser cache and try again

---

Built with ❤️ for MDRRMO Pio Duran
# mdrrmo-dashboard
# htt
# drrmdash
# drrmdash
# drrmdash
# mdrrmodashboard
