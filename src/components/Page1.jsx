import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page1 = () => {
    const containerRef = useRef(null);
    const brainContainerRef = useRef(null);
    const particleContainerRef = useRef(null);

    useEffect(() => {
        /** Mouse Parallax */
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const { clientX, clientY } = e;
            const { width, height, left, top } = containerRef.current.getBoundingClientRect();
            const x = (clientX - left) / width;
            const y = (clientY - top) / height;
            const moveX = (x - 0.5) * 30;
            const moveY = (y - 0.5) * 30;
            containerRef.current.style.setProperty('--move-x', `${moveX}px`);
            containerRef.current.style.setProperty('--move-y', `${moveY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);

        /** ✅ Text Intro Animation (fix for both lines) */
        const letters = document.querySelectorAll(".reveal-text span");
        gsap.fromTo(
            letters,
            { y: 120, opacity: 0, rotateX: 90 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
                duration: 1.2,
                delay: 0.3,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",   // when top of section hits 80% of viewport
                    once: true,         // ✅ runs only once
                }
            }
        );

        /** Random Letter Pulse */
        const randomPulse = () => {
            const randomLetter = letters[Math.floor(Math.random() * letters.length)];
            if (!randomLetter) return;
            gsap.to(randomLetter, {
                scale: 1.3,
                y: -5,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: "power2.out",
                onComplete: () => {
                    gsap.set(randomLetter, { clearProps: "transform" });
                    setTimeout(randomPulse, 1000 + Math.random() * 4000);
                }
            });
        };
        setTimeout(randomPulse, 8000);

        /** Floating Particles */
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement("div");
            particle.className = "absolute rounded-full bg-[var(--secondary-color)] opacity-20";
            particle.style.width = `${gsap.utils.random(4, 10)}px`;
            particle.style.height = particle.style.width;
            particle.style.top = `${gsap.utils.random(0, 100)}%`;
            particle.style.left = `${gsap.utils.random(0, 100)}%`;
            particleContainerRef.current.appendChild(particle);

            gsap.to(particle, {
                x: `+=${gsap.utils.random(-50, 50)}`,
                y: `+=${gsap.utils.random(-50, 50)}`,
                duration: gsap.utils.random(3, 6),
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });
        }

        /** Automatic Random Brain Throws */
        const randomBrainThrow = () => {
            throwBrain();
            setTimeout(randomBrainThrow, 8000 + Math.random() * 8000);
        };
        setTimeout(randomBrainThrow, 7000);

        /** Automatic Random Letter Hover Effects */
        const randomHoverEffectTrigger = () => {
            const randomLetter = letters[Math.floor(Math.random() * letters.length)];
            if (!randomLetter) return;
            applyRandomHoverEffect(randomLetter);
            setTimeout(randomHoverEffectTrigger, 2000 + Math.random() * 2000);
        };
        setTimeout(randomHoverEffectTrigger, 9000);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    /** Throw Multiple Brains */
    const throwBrain = () => {
        if (!brainContainerRef.current) return;
        brainContainerRef.current.innerHTML = "";

        for (let i = 0; i < 7; i++) {
            const brain = document.createElement("div");
            brain.className = "absolute text-[5vh] text-pink-400";
            brain.style.top = "0px";
            brain.style.left = "50%";
            brain.innerHTML = "🧠";
            brainContainerRef.current.appendChild(brain);

            const angle = gsap.utils.random(-60, -120);
            const distance = gsap.utils.random(150, 400);
            const rotation = gsap.utils.random(180, 720);
            const scale = gsap.utils.random(0.5, 1.3);

            gsap.to(brain, {
                duration: gsap.utils.random(1, 2),
                x: distance * Math.cos(angle * (Math.PI / 180)),
                y: distance * Math.sin(angle * (Math.PI / 180)),
                scale,
                rotation,
                opacity: 0,
                ease: "power3.out",
                onComplete: () => brain.remove()
            });
        }
    };

    /** Hover Effects */
    const hoverEffects = ["stretch", "blast", "weight"];
    const applyRandomHoverEffect = (target) => {
        const effect = hoverEffects[Math.floor(Math.random() * hoverEffects.length)];
        switch (effect) {
            case "stretch":
                gsap.fromTo(
                    target,
                    { scaleY: 1 },
                    { scaleY: 1.2, duration: 0.3, yoyo: true, repeat: 1, ease: "elastic.out(1,0.3)" }
                );
                break;
            case "blast":
                const siblings = target.parentNode.querySelectorAll("span");
                const idx = Array.from(siblings).indexOf(target);
                siblings.forEach((s, i) => {
                    gsap.to(s, {
                        y: -5,
                        scale: 1.1,
                        duration: 0.3,
                        delay: Math.abs(idx - i) * 0.1,
                        yoyo: true,
                        repeat: 1,
                        ease: "power2.out"
                    });
                });
                break;
            case "weight":
                gsap.to(target, {
                    fontWeight: 900,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.inOut"
                });
                break;
            default:
                break;
        }
    };

    /** Split Text into Animated Spans */
    const splitText = (text) =>
        text.split("").map((letter, i) => (
            <span
                key={i}
                className="inline-block cursor-pointer hover:text-[var(--secondary-color)]"
            >
                {letter === " " ? "\u00A0" : letter}
            </span>
        ));

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[var(--bg-color)] font-sans">
            {/* Floating Particles */}
            <div ref={particleContainerRef} className="absolute w-full h-full top-0 left-0 z-0"></div>

            {/* ✅ Main Text - Now includes both lines */}
            <div
                ref={containerRef}
                className="w-full h-screen flex flex-col items-center justify-center relative z-10 reveal-text"
            >
                {/* Line 1: OPEN MIND */}
                <div className="text-[10vw] font-bold tracking-tighter text-center leading-none select-none">
                    <div>
                        <span
                            className="text-[var(--text-color)]"
                            style={{
                                transform:
                                    "translate(calc(var(--move-x, 0) * -0.5), calc(var(--move-y, 0) * -0.5))",
                            }}
                        >
                            {splitText("OPEN")}
                        </span>
                        <span
                            className="relative ml-[2vw] text-[var(--secondary-color)]"
                            style={{
                                transform:
                                    "translate(calc(var(--move-x, 0) * 0.5), calc(var(--move-y, 0) * 0.5))",
                            }}
                        >
                            {splitText("MIND")}
                            <div
                                ref={brainContainerRef}
                                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                            ></div>
                        </span>
                    </div>
                    {/* Line 2: OPEN WORLD */}
                    <div className="mt-[2vh]">
                        <span
                            className="text-[var(--text-color)]"
                            style={{
                                transform:
                                    "translate(calc(var(--move-x, 0) * -0.5), calc(var(--move-y, 0) * -0.5))",
                            }}
                        >
                            {splitText("OPEN")}
                        </span>
                        <span
                            className="ml-[2vw] text-[var(--secondary-color)]"
                            style={{
                                transform:
                                    "translate(calc(var(--move-x, 0) * 0.5), calc(var(--move-y, 0) * 0.5))",
                            }}
                        >
                            {splitText("WORLD")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Floating Circles */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div
                    className="absolute top-[20vh] left-[20vh] w-[10vh] h-[10vh] rounded-full border-2 border-white/10 backdrop-blur-md"
                    style={{
                        transform: 'translate(calc(var(--move-x, 0) * 1.2), calc(var(--move-y, 0) * 1.2))',
                    }}
                />
                <div
                    className="absolute bottom-[25vh] right-[25vh] w-[15vh] h-[15vh] rounded-full border-2 border-white/10 backdrop-blur-md"
                    style={{
                        transform: 'translate(calc(var(--move-x, 0) * -1.2), calc(var(--move-y, 0) * -1.2))',
                    }}
                />
            </div>

            {/* CTA */}
            <div
                className="absolute bottom-[10vh] left-1/2 transform -translate-x-1/2 z-10 text-center"
                style={{
                    transform: 'translate(calc(-50% + var(--move-x, 0) * 0.3), calc(var(--move-y, 0) * 0.3))',
                }}
            >
                <p className="text-[2.5vh] font-light text-[var(--text-color)] mb-4 tracking-wide">
                    Empowering Minds Through Technology
                </p>
                <button
                    className="px-8 py-3 text-[2vh] font-semibold rounded-full bg-gradient-to-br from-[var(--text-color)] to-[var(--secondary-color)] text-[var(--bg-color)] shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-500 ease-in-out hover:scale-105"
                    data-magnetic data-strength="0.15"
                >
                    Begin Your Journey
                </button>
            </div>

            {/* Tech Icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {[
                    { icon: '⚛️', top: '15vh', left: '15vh', delay: '0s' },
                    { icon: '🌐', top: '25vh', right: '20vh', delay: '0.2s' },
                    { icon: '💻', bottom: '20vh', left: '25vh', delay: '0.4s' },
                    { icon: '🚀', bottom: '30vh', right: '15vh', delay: '0.6s' },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="absolute text-[3vh] animate-float opacity-40 [data-theme='dark']:opacity-60"
                        style={{
                            top: item.top,
                            left: item.left,
                            right: item.right,
                            bottom: item.bottom,
                            animationDelay: item.delay,
                            transform: 'translate(calc(var(--move-x, 0) * 0.8), calc(var(--move-y, 0) * 0.8))',
                        }}
                    >
                        {item.icon}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page1;
