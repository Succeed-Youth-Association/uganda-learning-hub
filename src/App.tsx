
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { ThemeProvider } from './providers/ThemeProvider'
import Index from './pages/Index'
import ClassPage from './pages/ClassPage'
import ResourcePage from './pages/ResourcePage'
import AboutPage from './pages/AboutPage'
import DisclaimerPage from './pages/DisclaimerPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'
import ScrollOnRouteChange from './components/ScrollOnRouteChange'
import NewUploadsPage from './pages/NewUploadsPage'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <ScrollOnRouteChange />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/class/:classId" element={<ClassPage />} />
            <Route path="/class/:classId/resources/:resourceType" element={<ResourcePage />} />
            <Route path="/class/:classId/resources/:resourceType/new-uploads" element={<NewUploadsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
