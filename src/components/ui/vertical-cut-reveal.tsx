"use client";

import { motion, Variants } from "framer-motion";

interface VerticalCutRevealProps {
    children: string;
    splitBy?: "words" | "characters";
    staggerDuration?: number;
    staggerFrom?: "first" | "last" | "center";
    reverse?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition?: any;
    className?: string;
}

export const VerticalCutReveal = ({
    children,
    splitBy = "words",
    staggerDuration = 0.1,
    reverse = false,
    transition: customTransition,
    className,
}: VerticalCutRevealProps) => {
    const parts = splitBy === "words" ? children.split(" ") : children.split("");

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: () => ({
            opacity: 1,
            transition: {
                staggerChildren: staggerDuration,
                delayChildren: customTransition?.delay || 0,
                staggerDirection: reverse ? -1 : 1
            },
        }),
    };

    const child: Variants = {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 30,
                stiffness: 250,
                ...customTransition
            },
        },
        hidden: {
            y: "100%",
            opacity: 0,
            transition: {
                type: "spring",
                damping: 30,
                stiffness: 250,
            },
        },
    };

    return (
        <motion.div
            style={{ overflow: "hidden", display: "inline-block" }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}
        >
            {parts.map((part, index) => (
                <span
                    key={index}
                    style={{ overflow: "hidden", display: "inline-block", marginRight: splitBy === "words" ? "0.25em" : "0" }}
                >
                    <motion.span
                        variants={child}
                        style={{ display: "inline-block" }}
                    >
                        {part}
                    </motion.span>
                </span>
            ))}
        </motion.div>
    );
};
