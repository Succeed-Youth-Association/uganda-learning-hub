
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Button } from '../components/ui/button';
import { ArrowLeft, BookOpen, Users, Target, Award } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 w-full flex">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden min-w-0">
          <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b p-2 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SidebarTrigger />
              <div className="flex items-center space-x-2">
                
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
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  About Fresh Teacher's Library
                </h1>
              </div>

              <div className="space-y-8">
                <section className="bg-card rounded-lg p-6 border">
                  <div className="flex items-center mb-4">
                    <Target className="h-6 w-6 text-orange-600 mr-3" />
                    <h2 className="text-2xl font-semibold text-foreground">Our Mission</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Fresh Teacher's Library is dedicated to empowering educators across Uganda by providing 
                    comprehensive, curriculum-aligned educational resources. We strive to make quality teaching 
                    materials accessible to all teachers, from nursery to senior six, supporting educational 
                    excellence throughout the country.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-orange-600 mr-3" />
                    <h2 className="text-2xl font-semibold text-foreground">Who We Serve</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Our platform serves teachers, administrators, and educational professionals working within 
                    the Uganda curriculum framework. Whether you're teaching at nursery level, primary school, 
                    or secondary school, we provide the resources you need to deliver effective and engaging lessons.
                  </p>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <div className="flex items-center mb-4">
                    <Award className="h-6 w-6 text-orange-600 mr-3" />
                    <h2 className="text-2xl font-semibold text-foreground">What We Offer</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      Our comprehensive library includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Detailed lesson notes for all subjects and class levels</li>
                      <li>Comprehensive schemes of work for curriculum planning</li>
                      <li>Past examination papers with marking guides</li>
                      <li>Holiday packages for continuous learning</li>
                      <li>Digital textbooks and reference materials</li>
                    </ul>
                    <p className="leading-relaxed">
                      All resources are carefully curated to align with the Uganda curriculum standards, 
                      ensuring that teachers have access to accurate, relevant, and up-to-date materials.
                    </p>
                  </div>
                </section>

                <section className="bg-card rounded-lg p-6 border">
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-6 w-6 text-orange-600 mr-3" />
                    <h2 className="text-2xl font-semibold text-foreground">Our Commitment</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    We are committed to continuously updating and expanding our resource collection to meet 
                    the evolving needs of Uganda's education system. Our team works tirelessly to ensure 
                    that every teacher has access to the tools they need to inspire and educate the next 
                    generation of learners.
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

export default AboutPage;
