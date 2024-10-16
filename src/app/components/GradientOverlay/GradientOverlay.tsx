interface GradientOverlayProps {
  position: 'top' | 'bottom';
  isVisible: boolean;
}

const GradientOverlay = ({ position, isVisible }: GradientOverlayProps) => {
  const positionClasses = () => {
    if (position === 'top') {
      return 'top-56 bg-gradient-to-b  md:top-60 ';
    }
    if (position === 'bottom') {
      return 'bottom-0  bg-gradient-to-t';
    }
    return null;
  };

  const gradientClasses = `fixed left-0 right-0 z-gradient h-16 from-white to-transparent p-10 transition-opacity duration-500 ease-in-out dark:from-neutral-900`;

  return (
    <div
      className={`${gradientClasses} ${positionClasses()} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

export default GradientOverlay;
