import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '@/components/organisms/Header'
import BottomNav from '@/components/organisms/BottomNav'
import Sidebar from '@/components/organisms/Sidebar'

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuToggle={toggleMobileMenu} 
        isMobileMenuOpen={isMobileMenuOpen} 
      />
      
      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
            <div className="fixed left-0 top-0 w-64 h-full bg-white transform transition-transform duration-300 ease-in-out">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold gradient-text">Pulse Connect</h2>
              </div>
              <Sidebar onNavigate={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 pb-16 lg:pb-0">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  )
}

export default Layout