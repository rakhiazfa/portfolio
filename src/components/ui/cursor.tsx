import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor = () => {
    const cursorFollower = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const context = gsap.context(() => {
            const xTo = gsap.quickTo(cursorFollower.current, 'x', {
                duration: 0.6,
                ease: 'power3'
            });

            const yTo = gsap.quickTo(cursorFollower.current, 'y', {
                duration: 0.6,
                ease: 'power3'
            });

            let x: number = 0;
            let y: number = 0;
            let scrollY: number = 0;

            const moveCursor = () => {
                xTo(x);
                yTo(y + scrollY - 90);
            };

            const handleMouseMove = (event: any) => {
                const { clientX, clientY } = event;

                x = clientX;
                y = clientY;

                moveCursor();
            };

            const handleScroll = () => {
                scrollY = window.scrollY;

                moveCursor();
            };

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('scroll', handleScroll);
            };
        });

        return () => {
            context.revert();
        };
    }, []);

    return (
        <div
            ref={cursorFollower}
            className="hidden md:block absolute z-[-1] top-0 left-0 opacity-50 blur-3xl brightness-125 contrast-75 drop-shadow-xl grayscale-0 hue-rotate-180 backdrop-blur-xl backdrop-brightness-125 backdrop-opacity-25 backdrop-saturate-125 backdrop-sepia"
        >
            <div className="pointer-events-none fixed left-0 top-0 aspect-square w-[450px] -translate-x-24 -translate-y-5 overflow-hidden rounded-full will-change-transform">
                <div className="h-full w-full animate-spin-slow bg-gradient-to-r from-cyan-800 to-amber-700"></div>
            </div>
        </div>
    );
};

export default Cursor;
