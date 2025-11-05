/**
 * Mobile Performance Optimization Utilities
 * 
 * This module provides utilities for optimizing mobile performance
 * based on device detection and network conditions.
 */

/**
 * Check if the user is on a mobile device (client-side only)
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Check if the user has a slow connection (client-side only)
 */
export function isSlowConnection(): boolean {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return false;
  }
  
  const connection = (navigator as any).connection;
  
  // Check for 2G or slow-2g
  if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
    return true;
  }
  
  // Check for save-data preference
  if (connection.saveData) {
    return true;
  }
  
  return false;
}

/**
 * Get optimized image loading strategy based on device and connection
 */
export function getImageLoadingStrategy(): 'eager' | 'lazy' {
  if (typeof window === 'undefined') return 'lazy';
  
  // If mobile or slow connection, be more aggressive with lazy loading
  if (isMobileDevice() || isSlowConnection()) {
    return 'lazy';
  }
  
  return 'eager';
}

/**
 * Get optimized image sizes for responsive images
 */
export function getResponsiveImageSizes(context: 'hero' | 'card' | 'thumbnail' | 'full'): string {
  switch (context) {
    case 'hero':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px';
    case 'card':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    case 'thumbnail':
      return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 256px';
    case 'full':
      return '100vw';
    default:
      return '100vw';
  }
}

/**
 * Preload critical resources based on priority
 */
export function preloadCriticalResources() {
  if (typeof document === 'undefined') return;
  
  const criticalImages = [
    '/shopify-partner-badge.jpeg',
    '/optizen-logo.png',
  ];
  
  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

