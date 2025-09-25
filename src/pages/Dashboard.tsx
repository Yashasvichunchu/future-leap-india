import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Dashboard as DashboardComponent } from '@/components/dashboard/Dashboard'
import Navbar from '@/components/Navbar'

const Dashboard = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <DashboardComponent />
      </div>
    </div>
  )
}

export default Dashboard