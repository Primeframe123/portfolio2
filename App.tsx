import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { ZooplusCaseStudy } from './components/case-studies/ZooplusCaseStudy';
import { DraxCaseStudy } from './components/case-studies/DraxCaseStudy';
import { YouthBankingCaseStudy } from './components/case-studies/YouthBankingCaseStudy';
import { NymbleCaseStudy } from './components/case-studies/NymbleCaseStudy';

type ViewType = 'portfolio' | 'zooplus' | 'drax' | 'youth-banking' | 'nymble';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('portfolio');
  const [activeSection, setActiveSection] = useState('home');
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const isClickScrolling = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Register section refs
  const setSectionRef = useCallback((sectionId: string) => (element: HTMLElement | null) => {
    sectionsRef.current[sectionId] = element;
    
    // If observer exists and element is new, start observing it
    if (observerRef.current && element) {
      observerRef.current.observe(element);
    }
  }, []);

  // Scroll to section when clicking sidebar
  const scrollToSection = useCallback((sectionId: string) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      isClickScrolling.current = true;
      setActiveSection(sectionId);
      
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Reset flag after scroll completes
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 1200);
    }
  }, []);

  // Navigate to case study
  const navigateToCaseStudy = useCallback((caseStudyId: string) => {
    setCurrentView(caseStudyId as ViewType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Navigate back to portfolio
  const navigateToPortfolio = useCallback(() => {
    setCurrentView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Set up intersection observer for scroll detection (only for portfolio view)
  useEffect(() => {
    if (currentView !== 'portfolio') return;

    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Don't update active section if user clicked navigation
        if (isClickScrolling.current) return;

        // Find which sections are currently intersecting
        const intersectingSections = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => ({
            id: entry.target.getAttribute('data-section'),
            ratio: entry.intersectionRatio,
            boundingRect: entry.boundingClientRect
          }))
          .filter(section => section.id);

        if (intersectingSections.length > 0) {
          // Sort by intersection ratio (highest first)
          intersectingSections.sort((a, b) => b.ratio - a.ratio);
          
          // Get the section with highest visibility
          const mostVisibleSection = intersectingSections[0];
          
          if (mostVisibleSection.id && mostVisibleSection.id !== activeSection) {
            setActiveSection(mostVisibleSection.id);
          }
        }
      },
      {
        root: null, // Use viewport as root instead of main container
        rootMargin: '-20% 0px -20% 0px', // Only consider center 60% of viewport
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
      }
    );

    observerRef.current = observer;

    // Observe all existing sections
    Object.values(sectionsRef.current).forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentView, activeSection]); // Include currentView as dependency

  // Fallback scroll listener for edge cases (only for portfolio view)
  useEffect(() => {
    if (currentView !== 'portfolio') return;

    const handleScroll = () => {
      if (isClickScrolling.current) return;

      // Simple fallback: check which section's top is closest to viewport center
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportCenter = scrollTop + viewportHeight / 2;

      let closestSection = 'home';
      let minDistance = Infinity;

      Object.entries(sectionsRef.current).forEach(([sectionId, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = scrollTop + rect.top;
          const elementCenter = elementTop + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestSection = sectionId;
          }
        }
      });

      if (closestSection !== activeSection) {
        setActiveSection(closestSection);
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [activeSection, currentView]);

  // Render case study views
  if (currentView !== 'portfolio') {
    const caseStudyComponents = {
      'zooplus': ZooplusCaseStudy,
      'drax': DraxCaseStudy,
      'youth-banking': YouthBankingCaseStudy,
      'nymble': NymbleCaseStudy
    };

    const CaseStudyComponent = caseStudyComponents[currentView];
    
    return (
      <div className="min-h-screen bg-background">
        <CaseStudyComponent 
          onBackToPortfolio={navigateToPortfolio}
          onViewCaseStudy={navigateToCaseStudy}
          currentCaseStudyId={currentView}
        />
      </div>
    );
  }

  // Render portfolio view
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={scrollToSection}
      />
      <main 
        ref={mainRef}
        className="flex-1 ml-64 overflow-y-auto scroll-smooth"
      >
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section 
            ref={setSectionRef('home')}
            data-section="home"
            className="min-h-screen flex items-center px-8"
          >
            <HeroSection onViewProjects={() => scrollToSection('projects')} />
          </section>

          {/* About Section */}
          <section 
            ref={setSectionRef('about')}
            data-section="about"
            className="min-h-screen flex items-center px-8"
          >
            <AboutSection />
          </section>

          {/* Projects Section */}
          <section 
            ref={setSectionRef('projects')}
            data-section="projects"
            className="min-h-screen flex items-center px-8"
          >
            <ProjectsSection onViewCaseStudy={navigateToCaseStudy} />
          </section>

          {/* Resume Section */}
          <section 
            ref={setSectionRef('resume')}
            data-section="resume"
            className="min-h-screen flex items-center px-8"
          >
            <ResumeSection />
          </section>

          {/* Contact Section */}
          <section 
            ref={setSectionRef('contact')}
            data-section="contact"
            className="min-h-screen flex items-center px-8"
          >
            <ContactSection />
          </section>
        </div>
      </main>
    </div>
  );
}