import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children, requireCompany = true }: { children: React.ReactNode; requireCompany?: boolean }) {
  const { isAuthenticated, company } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireCompany && !company) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}
