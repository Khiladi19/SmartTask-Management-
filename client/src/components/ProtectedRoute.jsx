import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children, requiredRole }) {
  const { token } = useSelector(state => state.auth);

  if (!token) return <Navigate to="/login" />;
  // if (requiredRole && user.role !== requiredRole) return <Navigate to="/dashboard" />;

  return children;
}

export default ProtectedRoute;
