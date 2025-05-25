
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Button } from '../components/ui/button';
import { ArrowLeft, BookOpen, AlertTriangle } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';

const DisclaimerPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 w-full flex">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden min-w-0">
          <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b p-2 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SidebarTrigger />
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-orange-600" />
                <h1 className="text-lg font-bold text-foreground hidden sm:block">
                  Fresh Teacher's Library
                </h1>
                <h1 className="text-sm font-bold text-foreground sm:hidden">
                Fresh Teacher's Library
                </h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
          <div className="p-4 lg:p-8 min-w-0">
            <div className="max-w-4xl mx-auto min-w-0">
              <div className="mb-8">
                <Link to="/">
                  <Button variant="outline" className="mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Library
                  </Button>
                </Link>
                <div className="flex items-center mb-6">
                  <AlertTriangle className="h-8 w-8 text-orange-600 mr-3" />
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Disclaimer
                  </h1>
                </div>
              </div>

              <div className="space-y-6">
                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Educational Use Only</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The resources provided by Fresh Teacher's Library are intended solely for educational 
                    purposes. These materials are designed to support teaching and learning within the 
                    Uganda curriculum framework and should be used as supplementary educational aids.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Accuracy of Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    While we strive to ensure the accuracy and currency of all educational materials, 
                    Fresh Teacher's Library makes no warranties or representations regarding the completeness, 
                    accuracy, or reliability of the content. Users are encouraged to verify information 
                    and adapt materials to their specific teaching contexts.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Curriculum Alignment</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our resources are developed with the intention of aligning with the Uganda curriculum. 
                    However, curriculum requirements may change, and teachers are responsible for ensuring 
                    that materials meet current curriculum standards and learning objectives for their 
                    specific teaching situations.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Fresh Teacher's Library shall not be liable for any direct, indirect, incidental, 
                    consequential, or punitive damages arising from the use of our educational resources. 
                    Users assume full responsibility for the implementation and adaptation of materials 
                    in their educational settings.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Intellectual Property</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All content provided through Fresh Teacher's Library is for educational use only. 
                    Users may not reproduce, distribute, or sell any materials without explicit permission. 
                    Respect for intellectual property rights is essential for maintaining the quality 
                    and availability of educational resources.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Updates and Changes</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This disclaimer may be updated periodically to reflect changes in our services or 
                    legal requirements. Users are encouraged to review this disclaimer regularly to 
                    stay informed of any changes that may affect their use of our educational resources.
                  </p>
                </section>
              </div>
            </div>
          </div>
          <Footer />
        </main>
        <ScrollToTop />
      </div>
    </SidebarProvider>
  );
};

export default DisclaimerPage;
