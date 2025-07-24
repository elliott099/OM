import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="relative bg-[var(--bg-color)] text-gray-300">
            {/* 🔥 Gradient Top Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary-glow)] via-[var(--secondary-glow)] to-[var(--primary-glow)]"></div>

            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Brand & Description */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-4">SkillPro</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Transform your career with professional online courses designed by
                        industry experts. Learn anytime, anywhere.
                    </p>

                    {/* Social Icons */}
                    <div className="flex space-x-4 mt-6">
                        {["facebook", "twitter", "linkedin", "instagram"].map((platform, i) => (
                            <a
                                key={i}
                                href="#"
                                className="w-10 h-9 flex items-center justify-center rounded-full bg-[var(--bg-color)] hover:bg-[var(--primary-glow)] transition"
                                data-magnetic data-strength="0.15"
                            >
                                <img
                                    src={`https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${platform}.svg`}
                                    alt={platform}
                                    className="w-5 invert"
                                />
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-[var(--primary-glow)] transition" data-magnetic data-strength="0.15">About Us</a></li>
                        <li><a href="#" className="hover:text-[var(--primary-glow)] transition" data-magnetic data-strength="0.15">Courses</a></li>
                        <li><a href="#" className="hover:text-[var(--primary-glow)] transition" data-magnetic data-strength="0.15">Pricing</a></li>
                        <li><a href="#" className="hover:text-[var(--primary-glow)] transition" data-magnetic data-strength="0.15">Contact</a></li>
                    </ul>
                </motion.div>

                {/* Resources */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-[var(--primary-glow)] transition" data-magnetic data-strength="0.15">Blog</a></li>
                        <li><a href="#" className="hover:text-[var(--primary-glow)] transition" data-magnetic data-strength="0.15">Help Center</a></li>
                        <li><a href="#" className="hover:text-[var(--primary-glow)] transition" data-magnetic data-strength="0.15">Careers</a></li>
                        <li><a href="#" className="hover:text-[var(--primary-glow)] transition" data-magnetic data-strength="0.15">Privacy Policy</a></li>
                    </ul>
                </motion.div>

                {/* Newsletter */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
                    <p className="text-gray-400 text-sm mb-4">
                        Subscribe to get the latest updates and offers.
                    </p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-l-lg bg-[var(--bg-color)] border border-[var(--border-color)] 
              text-[var(--text-color)] text-sm focus:outline-none focus:border-[var(--primary-glow)]"
                        />
                        <button className="px-4 bg-[var(--primary-glow)] hover:bg-[var(--secondary-glow)] text-white rounded-r-lg text-sm transition" data-magnetic data-strength="0.15">
                            Subscribe
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--border-color)] mt-6 py-6 text-center text-[var(--text-color-secondary)] text-sm" data-magnetic data-strength="0.15">
                © {new Date().getFullYear()} SkillPro. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
