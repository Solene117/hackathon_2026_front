import { createPortal } from "react-dom";
import { useEffect, useState, type ReactNode } from "react";

type ModalPortalProps = {
  children: ReactNode;
  lockScroll?: boolean;
};

/**
 * Rendu des modales dans document.body pour éviter que backdrop-blur / transform
 * sur les ancêtres ne casse position: fixed (modale coincée en haut).
 */
export default function ModalPortal({
  children,
  lockScroll = true,
}: ModalPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!lockScroll || !mounted) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [lockScroll, mounted]);

  if (!mounted) return null;

  return createPortal(children, document.body);
}
