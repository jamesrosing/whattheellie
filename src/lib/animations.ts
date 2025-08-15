export const animationClasses = {
  fadeIn: "animate-fade-in",
  fadeInUp: "animate-fade-in-up",
  slideInRight: "animate-slide-in-right",
  scaleIn: "animate-scale-in",
  pulse: "animate-pulse",
  
  // Hover effects
  hoverScale: "hover:scale-105 transition-transform duration-200",
  hoverScaleSm: "hover:scale-102 transition-transform duration-200",
  hoverGlow: "hover:shadow-lg transition-shadow duration-200",
  hoverLift: "hover:-translate-y-1 transition-transform duration-200",
  
  // Combined effects
  cardHover: "hover:scale-105 hover:shadow-lg transition-all duration-300",
  linkHover: "hover:text-primary transition-colors duration-200",
  buttonHover: "hover:bg-accent hover:text-accent-foreground transition-all duration-200",
} as const;

export const animationDelays = {
  stagger: (index: number, delay: number = 100) => ({
    animationDelay: `${index * delay}ms`,
    animationFillMode: "backwards" as const,
  }),
  
  staggerGrid: (index: number, columns: number = 2, delay: number = 100) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const totalDelay = (row + col) * delay;
    return {
      animationDelay: `${totalDelay}ms`,
      animationFillMode: "backwards" as const,
    };
  },
};

// Intersection Observer hook for scroll animations
export const useScrollAnimation = (threshold = 0.1) => {
  if (typeof window === 'undefined') return { ref: null, isVisible: false };
  
  const ref = typeof document !== 'undefined' ? null : null;
  const isVisible = false;
  
  // This would be implemented as a proper React hook in a separate file
  // For now, returning placeholder values
  return { ref, isVisible };
};