import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, isAuthenticated, userRole, requiredRole }) => {
  // If not authenticated and route requires authentication
  if (requiredRole && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // If authenticated but doesn't have required role
  if (requiredRole && isAuthenticated && userRole !== requiredRole && requiredRole !== 'user') {
    // For admin routes, redirect to home if not admin
    if (requiredRole === 'admin' && userRole !== 'admin') {
      return <Navigate to="/" replace />
    }
  }

  // If authenticated user tries to access auth pages
  if (isAuthenticated && (window.location.pathname === '/login' || window.location.pathname === '/register')) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute