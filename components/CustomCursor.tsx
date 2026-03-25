
import React, { useEffect, useRef, useCallback } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: 0, y: 0 });

  const updateCursor = useCallback(() => {
    if (cursorRef.current) {
      const offset = isHoveringRef.current ? 20 : 16;
      cursorRef.current.style.transform = `translate3d(${posRef.current.x - offset}px, ${posRef.current.y - offset}px, 0) scale(${isHoveringRef.current ? 2.5 : 1})`;
      cursorRef.current.style.backgroundColor = isHoveringRef.current ? '#F5B731' : '#FFFFFF';
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCursor);
    };

    const handleHover = () => { isHoveringRef.current = true; updateCursor(); };
    const handleUnhover = () => { isHoveringRef.current = false; updateCursor(); };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Utiliser event delegation au lieu de querySelectorAll
    const handlePointerOver = (e: Event) => {
      const target = (e.target as HTMLElement).closest('a, button, .cursor-none');
      if (target) handleHover();
    };
    const handlePointerOut = (e: Event) => {
      const target = (e.target as HTMLElement).closest('a, button, .cursor-none');
      if (target) handleUnhover();
    };

    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateCursor]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block bg-white"
      style={{ transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.2s, width 0.2s, height 0.2s', willChange: 'transform' }}
    />
  );
};
