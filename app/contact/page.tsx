"use client";

import React, { useState } from "react";
import { IconSend, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";
import { motion } from "framer-motion";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        // Simulate form submission
        setTimeout(() => {
            console.log("Form data:", formData);
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
        }, 1500);
    };

    return (
        <main className="min-h-screen relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 font-sans">
            {/* Gradient Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(23,23,23,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(23,23,23,0.04)_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-grid-white/[0.03] -z-10"></div>

            <div className="max-w-4xl w-full pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6 font-instrument">
                        Contact <span className="text-violet-600 dark:text-purple">Me</span>
                    </h1>
                    <p className="text-neutral-600 dark:text-white/80 text-lg max-w-2xl mx-auto">
                        Have a project in mind or just want to explore a new idea? I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white font-instrument">Let&apos;s connect</h2>
                            <p className="text-neutral-600 dark:text-gray-400 leading-relaxed">
                                Feel free to reach out directly via email or check out my social profiles. I try my best to respond within 24 hours.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <a href="mailto:arnab@example.com" className="text-xl text-neutral-900 dark:text-white hover:text-violet-600 dark:hover:text-purple transition-colors font-medium">
                                arnab@example.com
                            </a>
                            <div className="flex gap-4">
                                <a href="https://github.com/arnabjena007" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm hover:bg-neutral-100 hover:text-violet-600 dark:border-transparent dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:text-purple transition-all">
                                    <IconBrandGithub size={24} />
                                </a>
                                <a href="https://www.linkedin.com/in/arnabjena/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm hover:bg-neutral-100 hover:text-violet-600 dark:border-transparent dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:text-purple transition-all">
                                    <IconBrandLinkedin size={24} />
                                </a>
                                <a href="https://x.com/ArnabJena11" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm hover:bg-neutral-100 hover:text-violet-600 dark:border-transparent dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:text-purple transition-all">
                                    <IconBrandTwitter size={24} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white p-8 rounded-[1.75rem] border border-neutral-200 shadow-xl shadow-neutral-200/50 dark:border-white/10 dark:bg-[#0f0f11] dark:shadow-none relative overflow-hidden">
                            {/* Success Overlay */}
                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 bg-white dark:bg-[#0f0f11] flex flex-col items-center justify-center z-20 text-center p-8"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-500">
                                        <IconSend size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 font-instrument">Message Sent!</h3>
                                    <p className="text-neutral-600 dark:text-gray-400">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                                    <button
                                        type="button"
                                        onClick={() => setStatus("idle")}
                                        className="mt-6 text-violet-600 hover:text-neutral-900 dark:text-purple dark:hover:text-white transition-colors"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            )}

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:bg-[#1c1c21] dark:border-white/10 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-purple dark:focus:ring-purple transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:bg-[#1c1c21] dark:border-white/10 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-purple dark:focus:ring-purple transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-gray-400 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:bg-[#1c1c21] dark:border-white/10 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-purple dark:focus:ring-purple transition-all resize-none"
                                    placeholder="Your message here..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="mt-2 w-full bg-violet-600 text-white font-medium py-3 rounded-lg hover:bg-violet-700 dark:bg-purple dark:hover:bg-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === "submitting" ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                ) : (
                                    <>
                                        Send Message
                                        <IconSend size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default ContactPage;
