import { useState, useEffect } from 'react';
import { performanceOptimizer } from '@/utils/performance';

interface PerformanceMonitorProps {
  show?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const PerformanceMonitor = ({ 
  show = process.env.NODE_ENV === 'development',
  position = 'top-right' 
}: PerformanceMonitorProps) => {
  const [metrics, setMetrics] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (!isVisible) return;

    const updateMetrics = () => {
      const analytics = performanceOptimizer.getAnalytics();
      setMetrics(analytics);
    };

    // Update metrics every 2 seconds
    const interval = setInterval(updateMetrics, 2000);
    updateMetrics(); // Initial update

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <div className="bg-black/90 text-white rounded-lg p-4 shadow-2xl border border-gray-700 min-w-[300px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-green-400">
            🚀 Performance Monitor
          </h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>

        {metrics && (
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-300">Preloaded Routes:</span>
              <span className="text-green-400 font-mono">
                {metrics.totalRoutes}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Avg Load Time:</span>
              <span className="text-yellow-400 font-mono">
                {metrics.averageLoadTime ? `${metrics.averageLoadTime.toFixed(2)}ms` : 'N/A'}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Total Metrics:</span>
              <span className="text-blue-400 font-mono">
                {metrics.totalMetrics}
              </span>
            </div>

            {metrics.recentMetrics && metrics.recentMetrics.length > 0 && (
              <div className="mt-3 pt-2 border-t border-gray-700">
                <div className="text-gray-300 mb-1">Recent Routes:</div>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {metrics.recentMetrics.slice(-3).map((metric: any, index: number) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-gray-400 truncate">
                        {metric.route}
                      </span>
                      <span className="text-green-400 font-mono">
                        {metric.loadTime.toFixed(0)}ms
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-3 pt-2 border-t border-gray-700">
              <button
                onClick={() => performanceOptimizer.clearMetrics()}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-2 rounded"
              >
                Clear Metrics
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceMonitor; 