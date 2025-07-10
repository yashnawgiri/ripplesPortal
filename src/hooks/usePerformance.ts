import { useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  performanceOptimizer,
  estimateBundleSize,
} from "@/utils/performance.ts";

interface UsePerformanceOptions {
  enablePreloading?: boolean;
  enableMonitoring?: boolean;
  preloadDelay?: number;
}

export const usePerformance = (options: UsePerformanceOptions = {}) => {
  const {
    enablePreloading = true,
    enableMonitoring = true,
    preloadDelay = 1000,
  } = options;

  const location = useLocation();
  const performanceData = useRef<{
    routeLoadTimes: Record<string, number>;
    totalLoadTime: number;
    bundleSizes: Record<string, number>;
  }>({
    routeLoadTimes: {},
    totalLoadTime: 0,
    bundleSizes: {},
  });

  const startTime = useRef<number>(0);

  // Start performance monitoring for current route
  const startRouteMonitoring = useCallback(
    (routeName: string) => {
      if (enableMonitoring) {
        startTime.current = performance.now();
        console.log(`🚀 Starting performance monitoring for: ${routeName}`);
      }
    },
    [enableMonitoring]
  );

  // End performance monitoring and record metrics
  const endRouteMonitoring = useCallback(
    (routeName: string) => {
      if (enableMonitoring && startTime.current > 0) {
        const loadTime = performance.now() - startTime.current;
        const bundleSize = estimateBundleSize(routeName);

        performanceData.current.routeLoadTimes[routeName] = loadTime;
        performanceData.current.bundleSizes[routeName] = bundleSize;
        performanceData.current.totalLoadTime += loadTime;

        performanceOptimizer.recordMetric({
          loadTime,
          bundleSize,
          route: routeName,
          timestamp: Date.now(),
        });

        console.log(`✅ Route loaded: ${routeName}`, {
          loadTime: `${loadTime.toFixed(2)}ms`,
          bundleSize: `${bundleSize}KB`,
        });

        startTime.current = 0;
      }
    },
    [enableMonitoring]
  );

  // Preload specific route
  const preloadRoute = useCallback(
    (importFn: () => Promise<any>, routeName: string) => {
      if (
        enablePreloading &&
        !performanceOptimizer.isRoutePreloaded(routeName)
      ) {
        setTimeout(() => {
          importFn()
            .then(() => {
              console.log(`📦 Preloaded route: ${routeName}`);
            })
            .catch((error) => {
              console.warn(`❌ Failed to preload route ${routeName}:`, error);
            });
        }, preloadDelay);
      }
    },
    [enablePreloading, preloadDelay]
  );

  // Preload multiple routes with priority
  const preloadRoutes = useCallback(
    (
      routes: Array<{
        importFn: () => Promise<any>;
        name: string;
        priority?: "high" | "medium" | "low";
      }>
    ) => {
      if (!enablePreloading) return;

      const highPriority = routes.filter((r) => r.priority === "high");
      const mediumPriority = routes.filter(
        (r) => r.priority === "medium" || !r.priority
      );
      const lowPriority = routes.filter((r) => r.priority === "low");

      // Load high priority routes immediately
      highPriority.forEach((route) => {
        preloadRoute(route.importFn, route.name);
      });

      // Load medium priority routes after delay
      setTimeout(() => {
        mediumPriority.forEach((route) => {
          preloadRoute(route.importFn, route.name);
        });
      }, preloadDelay * 2);

      // Load low priority routes when idle
      setTimeout(() => {
        lowPriority.forEach((route) => {
          preloadRoute(route.importFn, route.name);
        });
      }, preloadDelay * 4);
    },
    [enablePreloading, preloadRoute, preloadDelay]
  );

  // Get performance analytics
  const getPerformanceAnalytics = useCallback(() => {
    const analytics = performanceOptimizer.getAnalytics();
    return {
      ...analytics,
      routeSpecificData: performanceData.current,
      averageRouteLoadTime:
        Object.values(performanceData.current.routeLoadTimes).reduce(
          (sum, time) => sum + time,
          0
        ) / Object.keys(performanceData.current.routeLoadTimes).length || 0,
      totalBundleSize: Object.values(
        performanceData.current.bundleSizes
      ).reduce((sum, size) => sum + size, 0),
    };
  }, []);

  // Monitor route changes
  useEffect(() => {
    const routeName = location.pathname.split("/")[1] || "home";
    startRouteMonitoring(routeName);

    // End monitoring after a short delay to allow component to render
    const timer = setTimeout(() => {
      endRouteMonitoring(routeName);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, startRouteMonitoring, endRouteMonitoring]);

  // Initialize performance monitoring
  useEffect(() => {
    if (enableMonitoring) {
      // Monitor Core Web Vitals if available
      if ("performance" in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === "navigation") {
              const navEntry = entry as PerformanceNavigationTiming;
              performanceData.current.totalLoadTime =
                navEntry.loadEventEnd - navEntry.loadEventStart;
            }
          }
        });

        try {
          observer.observe({ entryTypes: ["navigation"] });
        } catch (e) {
          console.warn("PerformanceObserver not supported");
        }
      }
    }
  }, [enableMonitoring]);

  return {
    startRouteMonitoring,
    endRouteMonitoring,
    preloadRoute,
    preloadRoutes,
    getPerformanceAnalytics,
    isRoutePreloaded:
      performanceOptimizer.isRoutePreloaded.bind(performanceOptimizer),
    performanceData: performanceData.current,
  };
};

// Hook for route-specific performance monitoring
export const useRoutePerformance = (routeName: string) => {
  const { startRouteMonitoring, endRouteMonitoring } = usePerformance();

  useEffect(() => {
    startRouteMonitoring(routeName);

    return () => {
      endRouteMonitoring(routeName);
    };
  }, [routeName, startRouteMonitoring, endRouteMonitoring]);
};

// Hook for preloading specific routes
export const useRoutePreloading = (
  routes: Array<{
    importFn: () => Promise<any>;
    name: string;
    priority?: "high" | "medium" | "low";
  }>
) => {
  const { preloadRoutes } = usePerformance();

  useEffect(() => {
    preloadRoutes(routes);
  }, [routes, preloadRoutes]);
};
