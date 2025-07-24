import React, { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import gsap from 'gsap';


const Navbar = ({ visible }) => {
    const logoRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // useEffect(() => {
    //     if (!logoRef.current) return;

    //     const mainLogo = logoRef.current.querySelector(".logo-main");
    //     const subLogo = logoRef.current.querySelectorAll(".logo-sub span");

    //     /** Entrance Animation */
    //     gsap.fromTo(
    //         mainLogo,
    //         { y: -30, opacity: 0, scale: 0.8 },
    //         { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    //     );

    //     gsap.fromTo(
    //         subLogo,
    //         { y: 10, opacity: 0 },
    //         { y: 0, opacity: 1, stagger: 0.08, delay: 0.2, duration: 0.6, ease: "power3.out" }
    //     );

    //     /** Subtle Looping Glow for OM */
    //     gsap.to(mainLogo, {
    //         textShadow: "0px 0px 8px var(--secondary-color)",
    //         repeat: -1,
    //         yoyo: true,
    //         duration: 2,
    //         ease: "sine.inOut"
    //     });
    // }, []);

    /** Hover Animation */
    const handleHover = () => {
        gsap.from(logoRef.current, {
            scale: 1.07,
            ease: "power2.out",
        });
    };

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    // Responsive: show hamburger on mobile only
    const isMobile = () => window.innerWidth <= 768;
    const [mobile, setMobile] = useState(isMobile());
    useEffect(() => {
        const handleResize = () => setMobile(isMobile());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinks = [
        { label: 'Home', id: 'home' },
        { label: 'About', id: 'about' },
        { label: 'Courses', id: 'courses' },
        { label: 'Contact Us', id: 'contact' },
        { label: 'Login', id: 'login' },
    ];

    return (
        <>
            <div
                className={`navbar flex items-center justify-between px-[10vw] py-[1vh] fixed top-0 left-0 w-full backdrop-blur-md  transition-transform duration-300 
                    ${visible ? 'translate-y-0' : '-translate-y-full'}
                    text-[var(--text-color)] border-[var(--text-color)] z-50`}
            >
                {/* LOGO */}
                <div
                    ref={logoRef}
                    onMouseEnter={handleHover}
                    className="logo relative cursor-pointer select-none flex items-center gap-2"
                >
                    <h1 className="flex items-center flex-col leading-tight relative">
                        <span className="logo-main text-[5vh] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary-color)] to-[var(--text-color)] drop-shadow-sm"
                            data-magnetic data-strength="0.15"
                        >
                            OM
                        </span>
                    </h1>
                </div>

                {/* Hamburger for mobile */}
                {mobile && (
                    <button
                        className="block md:hidden z-[100] p-2 focus:outline-none"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <span className="block w-8 h-1 bg-[var(--text-color)] mb-1 rounded"></span>
                        <span className="block w-8 h-1 bg-[var(--text-color)] mb-1 rounded"></span>
                        <span className="block w-8 h-1 bg-[var(--text-color)] rounded"></span>
                    </button>
                )}

                {/* NAV LINKS (desktop) */}
                {!mobile && (
                    <div className="nav-links flex gap-[3vw] text-[1.8vh] font-medium items-center justify-center">
                        {navLinks.map(({ label, id }, i) => (
                            <div key={i} className="relative group cursor-pointer">
                                <a
                                    href="#"
                                    className="transition-colors duration-300 text-[var(--text-color)] hover:text-[var(--text-color)]"
                                    data-magnetic data-strength="0.15"
                                    id={id}
                                >
                                    {label}
                                </a>
                                {/* Underline Hover Animation */}
                                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[var(--secondary-color)] transition-all duration-300 group-hover:w-full"></span>
                            </div>
                        ))}
                        <ThemeToggle />
                    </div>
                )}
            </div>

            {/* Fullscreen mobile menu */}
            {mobile && menuOpen && (
                <div className="fixed inset-0 z-[99] bg-[var(--bg-color)] bg-opacity-95 flex flex-col items-end animate-slidein">
                    <button
                        className="m-6 p-2 text-3xl text-[var(--text-color)] focus:outline-none"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        &times;
                    </button>
                    <nav className="flex flex-col items-center justify-center w-full h-full gap-8">
                        {navLinks.map(({ label, id }, i) => (
                            <a
                                key={i}
                                href="#"
                                className="text-2xl font-semibold text-[var(--text-color)] hover:text-[var(--secondary-color)] transition-colors duration-300"
                                onClick={() => setMenuOpen(false)}
                                id={id + '-mobile'}
                            >
                                {label}
                            </a>
                        ))}
                        <ThemeToggle />
                    </nav>
                </div>
            )}
            {/* Slide-in animation */}
            <style>{`
                @keyframes slidein {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slidein {
                    animation: slidein 0.4s cubic-bezier(0.4,0,0.2,1) forwards;
                }
            `}</style>
        </>
    );
};

export default Navbar;
