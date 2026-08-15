import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AppShell from './layouts/AppShell'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import MembershipPage from './pages/MembershipPage'
import NutritionPage from './pages/NutritionPage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'
import RoutinesPage from './pages/RoutinesPage'
import SupplementsPage from './pages/SupplementsPage'
import TutorialPage from './pages/TutorialPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/rutinas" element={<RoutinesPage />} />
          <Route path="/nutricion" element={<NutritionPage />} />
          <Route path="/suplementos" element={<SupplementsPage />} />
          <Route path="/membresia" element={<MembershipPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
