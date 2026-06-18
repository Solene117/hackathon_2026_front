import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type HorizontalSliderProps = {
  children: ReactNode;
  /** Affiche un dégradé sur les bords pour suggérer le scroll */
  showEdgeFade?: boolean;
  /** Affiche des indicateurs de pagination */
  showDots?: boolean;
  /** Classe Tailwind pour le dégradé de bord (ex: from-white) */
  fadeFromClassName?: string;
  className?: string;
  trackClassName?: string;
  gapClassName?: string;
};

export default function HorizontalSlider({
  children,
  showEdgeFade = true,
  showDots = true,
  fadeFromClassName = "from-app-bg",
  className = "",
  trackClassName = "",
  gapClassName = "gap-3",
}: HorizontalSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const slides = Array.isArray(children) ? children : [children];
  const slideCount = slides.filter(Boolean).length;

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);

    if (slideCount <= 1) {
      setActiveIndex(0);
      return;
    }

    const slideElements = Array.from(track.children) as HTMLElement[];
    if (slideElements.length === 0) return;

    const center = scrollLeft + clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slideElements.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(center - slideCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, [slideCount]);

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, slideCount]);

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.children[index] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <div className={`relative ${className}`}>
      {showEdgeFade && canScrollLeft && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r ${fadeFromClassName} to-transparent`}
        />
      )}
      {showEdgeFade && canScrollRight && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l ${fadeFromClassName} to-transparent`}
        />
      )}

      <div
        ref={trackRef}
        className={`scrollbar-hide flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-1 ${gapClassName} ${trackClassName}`}
      >
        {children}
      </div>

      {showDots && slideCount > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Afficher l'élément ${index + 1}`}
              onClick={() => scrollToIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-5 bg-michelin-green"
                  : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
