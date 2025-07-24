import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagneticCursor() {
    const cursorRef = useRef(null);
    const prevPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const isVisible = useRef(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        gsap.set(cursor, {
            x: prevPos.current.x,
            y: prevPos.current.y,
            opacity: 0
        });

        const xTo = gsap.quickTo(cursor, 'x');
        const yTo = gsap.quickTo(cursor, 'y');

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            prevPos.current = { x: clientX, y: clientY };
            xTo(clientX);
            yTo(clientY);

            if (!isVisible.current) {
                isVisible.current = true;
                gsap.to(cursor, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        const handleMouseLeave = (e) => {
            // Only hide if actually leaving the document
            if (e.relatedTarget === null || e.relatedTarget.nodeName === 'HTML') {
                isVisible.current = false;
                gsap.to(cursor, {
                    opacity: 0,
                    scale: 0,
                    duration: 0.3,
                    ease: 'power2.in'
                });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;
        const magneticItems = document.querySelectorAll('[data-magnetic]');
        const cleanupFns = [];

        magneticItems.forEach((el) => {
            const strength = parseFloat(el.getAttribute('data-strength')) || 0.3;

            const handleMove = (e) => {
                const rect = el.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);

                // Move element slightly
                gsap.to(el, {
                    x: dx * strength,
                    y: dy * strength,
                    duration: 0.2,
                    ease: 'none',
                    cursor: 'none',
                });

                // Resize cursor to match hovered element
                gsap.to(cursor, {
                    width: rect.width + 8,
                    height: rect.height + 8,
                    borderRadius: '8px',
                    duration: 0.3,
                    ease: 'power2.out',
                });
            };

            const reset = () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    clearProps: 'transform',
                    duration: 0.2,
                    ease: 'none',
                });

                // Reset cursor to default dot
                gsap.to(cursor, {
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    duration: 0.3,
                    ease: 'power2.out',
                });
            };

            el.addEventListener('mousemove', handleMove);
            el.addEventListener('mouseleave', reset);

            cleanupFns.push(() => {
                el.removeEventListener('mousemove', handleMove);
                el.removeEventListener('mouseleave', reset);
            });
        });

        return () => cleanupFns.forEach((fn) => fn());
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;
        const handleClick = () => {
            gsap.fromTo(
                cursor,
                { scale: 0.7 },
                {
                    scale: 1,
                    duration: 0.3,
                    ease: 'back.inOut',
                }
            );
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] pon"
            style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                willChange: 'transform, scale, width, height, border-radius, opacity',
                // backgroundColor: 'rgba(0, 0, 0, 0.75)',
            }}
        />
    );
}
