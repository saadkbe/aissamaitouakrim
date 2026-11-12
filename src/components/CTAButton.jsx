import React from 'react';
import { motion } from 'framer-motion';

const CTAButton = ({
    children,
    href,
    onClick,
    variant = 'primary',
    size = 'medium',
    icon,
    className = ''
}) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wider transition-all duration-300";

    const variants = {
        primary: "bg-[#C9A961] text-black hover:bg-[#B8935A] hover:scale-105",
        secondary: "bg-transparent border-2 border-[#C9A961] text-[#C9A961] hover:bg-[#C9A961] hover:text-white",
        ghost: "bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-[#C9A961]"
    };

    const sizes = {
        small: "px-4 py-2 text-xs",
        medium: "px-6 py-3 text-sm",
        large: "px-8 py-4 text-base"
    };

    const Component = href ? 'a' : 'button';

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Component
                href={href}
                onClick={onClick}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            >
                {children}
                {icon && <span>{icon}</span>}
            </Component>
        </motion.div>
    );
};

export default CTAButton;
