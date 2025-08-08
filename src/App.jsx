import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Albums from './pages/Albums'
import Album from './pages/albums/Album'
import Shop from './pages/Shop'
import ContactUs from './pages/ContactUs'
import User from './pages/User'
import AdminPanel from './pages/AdminPanel'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import NotFound from './pages/NotFound'
import AuthApi from './services/authApi'
import PhotosApi from './services/photosApi'
import AlbumsApi from './services/albumsApi'
import AddPhoto from './pages/admin/AddPhoto'
import AddAlbum from './pages/admin/AddAlbum'
import AddProduct from './pages/admin/AddProduct'
import ProtectedRoute from './components/ProtectedRoute'
import Photo from './pages/gallery/Photo'
import './App.css'

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const authApi = new AuthApi()
  const photosApi = new PhotosApi()
  const albumsApi = new AlbumsApi()
  const navigate = useNavigate()

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const result = await authApi.checkAuth()
        setIsAuthenticated(result.isAuthenticated)
        setUser(result.user || null)
      } catch (error) {
        console.error('Error verifying authentication:', error)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    verifyAuth()
  }, [])

  const handleLogin = async () => {
    try {
      const result = await authApi.checkAuth()
      setIsAuthenticated(result.isAuthenticated)
      setUser(result.user)
      navigate('/')
    } catch (error) {
      console.error('Error fetching user data after login:', error)
    }
  }

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token')
      setIsAuthenticated(false)
      setUser(null)
      navigate('/')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen w-full">
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="pt-16 w-full min-h-[calc(100vh-4rem)]">
        <Routes>
          <Route path="/" element={<Home photosApi={photosApi} albumsApi={albumsApi} onPhotoClick={(id) => navigate(`/photo/${id}`)}/>} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          
          {/* Photo Routes */}
          <Route path="/gallery" element={<Gallery photosApi={photosApi}/>} />
          <Route path="/photo/:id" element={<Photo photosApi={photosApi} userRole={user?.role}/>} />
          
          {/* Album Routes */}
          <Route path="/albums" element={<Albums albumsApi={albumsApi}/>} />
          <Route path="/album/:id" element={<Album albumsApi={albumsApi} photosApi={photosApi} userRole={user?.role}/>} />
          
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact-us" element={<ContactUs />} />
          
          <Route 
            path="/login" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Login authApi={authApi} onSuccess={handleLogin} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Register authApi={authApi} onSuccess={handleLogin} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/user" 
            element={
              <ProtectedRoute 
                isAuthenticated={isAuthenticated} 
                userRole={user?.role} 
                requiredRole="user"
              >
                <User user={user} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute 
                isAuthenticated={isAuthenticated} 
                userRole={user?.role} 
                requiredRole="admin"
              >
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/add-photo" 
            element={
              <ProtectedRoute 
                isAuthenticated={isAuthenticated} 
                userRole={user?.role} 
                requiredRole="admin"
              >
                <AddPhoto photosApi={photosApi}/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/add-album" 
            element={
              <ProtectedRoute 
                isAuthenticated={isAuthenticated} 
                userRole={user?.role} 
                requiredRole="admin"
              >
                <AddAlbum albumsApi={albumsApi} photosApi={photosApi}/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/add-product" 
            element={
              <ProtectedRoute 
                isAuthenticated={isAuthenticated} 
                userRole={user?.role} 
                requiredRole="admin"
              >
                <AddProduct />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App