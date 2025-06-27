// Performance optimization utilities for lazy loading

interface PreloadConfig {
  routes: Array<() => Promise<any>>;
  delay?: number;
  priority?: 'high' | 'medium' | 'low';
}

interface PerformanceMetrics {
  loadTime: number;
  bundleSize?: number;
  route: string;
  timestamp: number;
}

class PerformanceOptimizer {
  private preloadedRoutes = new Set<string>();
  private performanceMetrics: PerformanceMetrics[] = [];
  private isIdle = false;

  constructor() {
    this.setupIdleCallback();
  }

  private setupIdleCallback() {
    // Use requestIdleCallback if available, otherwise use setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.isIdle = true;
      });
    } else {
      setTimeout(() => {
        this.isIdle = true;
      }, 1000);
    }
  }

  /**
   * Preload critical routes for better UX
   */
  preloadRoutes(config: PreloadConfig): void {
    const { routes, delay = 1000, priority = 'medium' } = config;

    const preloadFunction = () => {
      routes.forEach((importFn, index) => {
        const routeKey = `route-${index}`;
        
        if (!this.preloadedRoutes.has(routeKey)) {
          this.preloadedRoutes.add(routeKey);
          
          // Add staggered loading for better performance
          setTimeout(() => {
            importFn()
              .then(() => {
                this.recordMetric({
                  loadTime: performance.now(),
                  route: routeKey,
                  timestamp: Date.now(),
                });
              })
              .catch((error) => {
                console.warn(`Failed to preload route ${routeKey}:`, error);
              });
          }, index * 100); // Stagger by 100ms
        }
      });
    };

    if (priority === 'high') {
      preloadFunction();
    } else if (priority === 'medium') {
      setTimeout(preloadFunction, delay);
    } else {
      // Low priority - wait for idle time
      if (this.isIdle) {
        preloadFunction();
      } else {
        setTimeout(preloadFunction, delay * 2);
      }
    }
  }

  /**
   * Record performance metrics
   */
  recordMetric(metric: PerformanceMetrics): void {
    this.performanceMetrics.push(metric);
    
    // Keep only last 50 metrics
    if (this.performanceMetrics.length > 50) {
      this.performanceMetrics = this.performanceMetrics.slice(-50);
    }
  }

  /**
   * Get performance analytics
   */
  getAnalytics() {
    const avgLoadTime = this.performanceMetrics.reduce((sum, metric) => sum + metric.loadTime, 0) / this.performanceMetrics.length;
    
    return {
      totalRoutes: this.preloadedRoutes.size,
      averageLoadTime: avgLoadTime,
      totalMetrics: this.performanceMetrics.length,
      recentMetrics: this.performanceMetrics.slice(-10),
    };
  }

  /**
   * Clear performance data
   */
  clearMetrics(): void {
    this.performanceMetrics = [];
    this.preloadedRoutes.clear();
  }

  /**
   * Check if route is already preloaded
   */
  isRoutePreloaded(routeKey: string): boolean {
    return this.preloadedRoutes.has(routeKey);
  }

  /**
   * Optimize images for better performance
   */
  optimizeImageLoading(): void {
    // Intersection Observer for lazy image loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      // Observe all images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Debounce function for performance optimization
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  /**
   * Throttle function for performance optimization
   */
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}

// Export singleton instance
export const performanceOptimizer = new PerformanceOptimizer();

// Export utility functions
export const preloadCriticalRoutes = () => {
  const criticalRoutes = [
    () => import('@/pages/home'),
    () => import('@/pages/referrals'),
    () => import('@/pages/about'),
  ];

  performanceOptimizer.preloadRoutes({
    routes: criticalRoutes,
    priority: 'high',
  });
};

export const preloadSecondaryRoutes = () => {
  const secondaryRoutes = [
    () => import('@/pages/getDemo'),
    () => import('@/pages/freeTools'),
    () => import('@/pages/ugcLanding'),
  ];

  performanceOptimizer.preloadRoutes({
    routes: secondaryRoutes,
    priority: 'medium',
    delay: 2000,
  });
};

export const preloadTertiaryRoutes = () => {
  const tertiaryRoutes = [
    () => import('@/pages/privacyPolicy'),
    () => import('@/pages/termsAndConditions'),
    () => import('@/pages/notFound'),
  ];

  performanceOptimizer.preloadRoutes({
    routes: tertiaryRoutes,
    priority: 'low',
    delay: 5000,
  });
};

// Performance monitoring
export const startPerformanceMonitoring = () => {
  if ('performance' in window) {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      // This would require the web-vitals library
      console.log('Performance monitoring enabled');
    }
  }
};

// Bundle size estimation (for development)
export const estimateBundleSize = (componentName: string): number => {
  // This is a rough estimation - in production, you'd use webpack-bundle-analyzer
  const sizeMap: Record<string, number> = {
    'HomePage': 45,
    'Referrals': 38,
    'AboutPage': 25,
    'GetDemo': 32,
    'FreeTools': 28,
    'UGCLanding': 35,
    'PrivacyPolicy': 15,
    'TermsAndConditions': 18,
    'NotFound': 12,
  };

  return sizeMap[componentName] || 20; // Default 20KB
};
