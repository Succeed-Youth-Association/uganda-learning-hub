
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Button } from '../components/ui/button';
import { ArrowLeft, BookOpen, Shield } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';

const PrivacyPage = () => {
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
                  <Shield className="h-8 w-8 text-orange-600 mr-3" />
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Privacy Policy
                  </h1>
                </div>
              </div>

              <div className="space-y-6">
                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Information We Collect</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="leading-relaxed">We may collect the following types of information:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Personal information you provide when creating an account</li>
                      <li>Usage data about how you interact with our platform</li>
                      <li>Technical information such as IP address and browser type</li>
                      <li>Educational preferences and resource access patterns</li>
                    </ul>
                  </div>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="leading-relaxed">We use your information to:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Provide and maintain our educational services</li>
                      <li>Improve and personalize your experience</li>
                      <li>Communicate with you about updates and new resources</li>
                      <li>Analyze usage patterns to enhance our platform</li>
                      <li>Ensure the security and integrity of our services</li>
                    </ul>
                  </div>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Information Sharing</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties 
                    without your consent, except as described in this policy. We may share information with 
                    trusted partners who assist us in operating our platform, conducting our business, or 
                    serving our users, provided they agree to keep this information confidential.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction. However, no method of 
                    transmission over the internet or electronic storage is 100% secure, and we cannot 
                    guarantee absolute security.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Cookies and Tracking</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies and similar tracking technologies to enhance your browsing experience, 
                    analyze site traffic, and understand where our visitors are coming from. You can control 
                    cookie settings through your browser preferences, though some features may not function 
                    properly if cookies are disabled.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Your Rights</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="leading-relaxed">You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Access and review your personal information</li>
                      <li>Request corrections to inaccurate information</li>
                      <li>Request deletion of your personal information</li>
                      <li>Opt-out of certain communications</li>
                      <li>Export your data in a portable format</li>
                    </ul>
                  </div>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Children's Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our services are designed for educators and educational professionals. We do not knowingly 
                    collect personal information from children under 13. If you believe we have inadvertently 
                    collected such information, please contact us immediately so we can delete it.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Policy Updates</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our practices 
                    or for other operational, legal, or regulatory reasons. We will notify you of any material 
                    changes by posting the updated policy on our platform and updating the effective date.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact 
                    us through our platform or email us at privacy@freshteacherslibrary.com. We are committed 
                    to addressing your concerns and protecting your privacy.
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

export default PrivacyPage;
