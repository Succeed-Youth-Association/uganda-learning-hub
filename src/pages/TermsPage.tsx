
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Button } from '../components/ui/button';
import { ArrowLeft, BookOpen, FileText } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';

const TermsPage = () => {
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
                  Fresh Teacher's
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
                  <FileText className="h-8 w-8 text-orange-600 mr-3" />
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Terms of Service
                  </h1>
                </div>
              </div>

              <div className="space-y-6">
                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using Fresh Teacher's Library, you agree to be bound by these Terms of Service. 
                    If you do not agree with any part of these terms, you may not access or use our services.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Use of Educational Resources</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="leading-relaxed">You agree to use our educational resources only for legitimate educational purposes, including:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Teaching and instruction in educational institutions</li>
                      <li>Personal professional development as an educator</li>
                      <li>Educational research and curriculum development</li>
                    </ul>
                  </div>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Prohibited Uses</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="leading-relaxed">You agree not to:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Reproduce, distribute, or sell any materials for commercial purposes</li>
                      <li>Remove copyright notices or attribution from any resources</li>
                      <li>Use the platform to distribute malicious software or content</li>
                      <li>Attempt to gain unauthorized access to our systems</li>
                      <li>Violate any applicable laws or regulations</li>
                    </ul>
                  </div>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">User Accounts</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you create an account with us, you are responsible for maintaining the confidentiality 
                    of your account information and for all activities that occur under your account. You agree 
                    to notify us immediately of any unauthorized use of your account.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Intellectual Property Rights</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All content and materials available through Fresh Teacher's Library are protected by copyright 
                    and other intellectual property laws. We grant you a limited, non-exclusive, non-transferable 
                    license to access and use our educational resources for permitted educational purposes only.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Service Availability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We strive to maintain continuous service availability but cannot guarantee uninterrupted access. 
                    We reserve the right to modify, suspend, or discontinue any part of our services at any time 
                    without prior notice.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Termination</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may terminate or suspend your access to our services immediately, without prior notice, 
                    if you breach these Terms of Service or engage in any conduct that we determine to be 
                    inappropriate or harmful to our platform or other users.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Changes to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these Terms of Service at any time. We will notify users of 
                    any material changes by posting the updated terms on our platform. Your continued use of 
                    our services after such changes constitutes acceptance of the new terms.
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

export default TermsPage;
