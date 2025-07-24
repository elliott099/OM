import React, { useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import gsap from 'gsap';


const Navbar = ({ visible }) => {
    const logoRef = useRef(null);

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

    return (
        <div
            className={`flex items-center justify-between px-[10vw] py-[1vh] fixed top-0 left-0 w-full backdrop-blur-md  transition-transform duration-300 
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

            {/* NAV LINKS */}
            <div className="flex gap-[3vw] text-[1.8vh] font-medium nav-links items-center justify-center">
                {['Home', 'About', 'Courses', 'Contact Us', 'Login'].map((label, i) => (
                    <div key={i} className="relative group cursor-pointer">
                        <a
                            href="#"
                            className="transition-colors duration-300 text-[var(--text-color)] hover:text-[var(--text-color)]"
                            data-magnetic data-strength="0.15"
                        >
                            {label}
                        </a>
                        {/* Underline Hover Animation */}
                        <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[var(--secondary-color)] transition-all duration-300 group-hover:w-full"></span>
                    </div>
                ))}
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Navbar;
