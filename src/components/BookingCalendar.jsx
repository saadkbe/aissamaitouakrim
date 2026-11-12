import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const BookingCalendar = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        type: 'consultation',
        message: ''
    });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    time: '',
                    type: 'consultation',
                    message: ''
                });
            }, 3000);
        }, 1500);
    };

    return (
        <section className="py-20 bg-[#0A0A0A]">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C9A961] text-black rounded-full mb-6">
                        <FaCalendar size={24} />
                    </div>
                    <h3 className="font-arabic text-[#C9A961] md:mb-4 text-6xl md:text-7xl lg:text-8xl font-bold" dir="rtl">
  
                        Book a <span className="text-[#C9A961]">Consultation</span>
                    
</h3>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Schedule a consultation for culinary consulting, speaking engagements, or collaboration opportunities.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit}
                    className="max-w-3xl mx-auto bg-[#111111] border border-white/10 p-8 md:p-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                                <FaUser size={12} />
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:border-[#C9A961] outline-none transition-colors"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                                <FaEnvelope size={12} />
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:border-[#C9A961] outline-none transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                                <FaPhone size={12} />
                                Phone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:border-[#C9A961] outline-none transition-colors"
                                placeholder="+212 660-171702"
                            />
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                Consultation Type *
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 text-white focus:border-[#C9A961] outline-none transition-colors"
                            >
                                <option value="consultation" className="bg-[#0A0A0A] text-white">Culinary Consulting</option>
                                <option value="speaking" className="bg-[#0A0A0A] text-white">Speaking Engagement</option>
                                <option value="collaboration" className="bg-[#0A0A0A] text-white">Collaboration</option>
                                <option value="training" className="bg-[#0A0A0A] text-white">Training Program</option>
                                <option value="other" className="bg-[#0A0A0A] text-white">Other</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                                <FaCalendar size={12} />
                                Preferred Date *
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:border-[#C9A961] outline-none transition-colors"
                            />
                        </div>

                        {/* Time */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                                <FaClock size={12} />
                                Preferred Time *
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:border-[#C9A961] outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-400 mb-2">
                            Additional Information
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:border-[#C9A961] outline-none transition-colors resize-none"
                            placeholder="Tell us more about your inquiry..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full bg-[#C9A961] text-black py-4 font-semibold uppercase tracking-wider hover:bg-[#B8935A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Request Sent!' : 'Submit Request'}
                    </button>

                    {status === 'success' && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 text-center text-[#C9A961]"
                        >
                            Thank you! We'll get back to you within 24 hours.
                        </motion.p>
                    )}
                </motion.form>
            </div>
        </section>
    );
};

export default BookingCalendar;
