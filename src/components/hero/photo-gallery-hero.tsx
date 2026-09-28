"use client";

import { forwardRef, useState, useEffect, Ref } from "react";
import Image, { ImageProps } from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/ui";

const MotionImage = motion(
    forwardRef(function MotionImage(
        { alt, ...props }: ImageProps,
        ref: Ref<HTMLImageElement>
    ) {
        return <Image ref={ref} alt={alt || ""} {...props} />;
    })
);

type Direction = "left" | "right";

function getRandomNumberInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export const Photo = ({
    src,
    alt,
    className,
    direction,
    width,
    height,
}: {
    src: string;
    alt: string;
    className?: string;
    direction?: Direction;
    width: number;
    height: number;
}) => {
    const [rotation, setRotation] = useState<number>(0);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRotation(getRandomNumberInRange(1, 3) * (direction === "left" ? -1 : 1));
    }, [direction]);

    return (
        <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            whileTap={{ scale: 1.15, zIndex: 50 }}
            whileHover={{
                scale: 1.08,
                rotateZ: 2 * (direction === "left" ? -1 : 1),
                zIndex: 50,
            }}
            whileDrag={{
                scale: 1.1,
                zIndex: 55,
            }}
            initial={{ rotate: 0 }}
            animate={{ rotate: rotation }}
            style={{
                width,
                height,
            }}
            className={cn(
                className,
                "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing"
            )}
            draggable={false}
            tabIndex={0}
        >
            <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-lg border-4 border-white">
                <MotionImage
                    className="rounded-3xl object-cover"
                    fill
                    src={src}
                    alt={alt}
                    draggable={false}
                    loading="eager"
                    priority
                    sizes="(max-width: 768px) 130px, 220px"
                />
            </div>
        </motion.div>
    );
};

export const PhotoGallery = ({
    images,
}: {
    images: { src: string; alt?: string }[];
}) => {
    const [mounted, setMounted] = useState(false);
    const [windowWidth, setWindowWidth] = useState(1200);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        setWindowWidth(window.innerWidth);

        // Reduced delays for faster appearance
        const visibilityTimer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        const animationTimer = setTimeout(() => {
            setIsLoaded(true);
        }, 200);

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(visibilityTimer);
            clearTimeout(animationTimer);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (!mounted) {
        return (
            <div className="mt-12 relative min-h-[500px] flex flex-col items-center">
                <p className="lg:text-md my-2 text-center text-xs font-light uppercase tracking-widest text-white">
                    Moments That Matter
                </p>
                <h3 className="z-20 mx-auto max-w-2xl justify-center bg-gradient-to-r from-[#001F3F] via-[#00D9FF] to-[#001F3F] bg-clip-text py-3 text-center text-4xl text-transparent md:text-7xl" style={{ fontFamily: "Blanka, sans-serif" }}>
                    Gallery of <span className="text-[#00D9FF]">Innovation</span>
                </h3>
            </div>
        );
    }

    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    const displayImages = images.slice(0, windowWidth < 1024 ? 4 : 5);

    // Responsive photo positions
    const getPhotoPositions = () => {
        if (isMobile) {
            return [
                { x: "-80px", y: "0px", zIndex: 50, direction: "left" as Direction },
                { x: "-30px", y: "-10px", zIndex: 40, direction: "left" as Direction },
                { x: "30px", y: "10px", zIndex: 30, direction: "right" as Direction },
                { x: "80px", y: "0px", zIndex: 20, direction: "right" as Direction },
            ];
        }
        if (isTablet) {
            return [
                { x: "-200px", y: "0px", zIndex: 50, direction: "left" as Direction },
                { x: "-70px", y: "-15px", zIndex: 40, direction: "left" as Direction },
                { x: "70px", y: "15px", zIndex: 30, direction: "right" as Direction },
                { x: "200px", y: "0px", zIndex: 20, direction: "right" as Direction },
            ];
        }
        return [
            { x: "-320px", y: "0px", zIndex: 50, direction: "left" as Direction },
            { x: "-160px", y: "-15px", zIndex: 40, direction: "left" as Direction },
            { x: "0px", y: "0px", zIndex: 30, direction: "right" as Direction },
            { x: "160px", y: "15px", zIndex: 20, direction: "right" as Direction },
            { x: "320px", y: "0px", zIndex: 10, direction: "left" as Direction },
        ];
    };

    const photoPositions = getPhotoPositions();

    const photos = displayImages.map((img, idx) => ({
        id: idx + 1,
        order: idx,
        ...photoPositions[idx],
        src: img.src,
        alt: img.alt || "Gallery photo",
    }));

    // Simplified animation variants
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Reduced from 0.15
                delayChildren: 0,
            },
        },
    };

    const photoVariants = {
        hidden: {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
        },
        visible: (custom: { x: number | string; y: number | string; order: number }) => ({
            x: custom.x,
            y: custom.y,
            rotate: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15,
                mass: 0.8,
                delay: custom.order * 0.08,
            },
        }),
    };

    return (
        <div className="mt-6 md:mt-12 relative">
            <p className="lg:text-md my-2 text-center text-xs font-light uppercase tracking-widest text-[#001F3F]/60 dark:text-white">
                Moments That Matter
            </p>

            <h3 className="z-20 mx-auto max-w-2xl justify-center bg-gradient-to-r from-[#001F3F] via-[#00D9FF] to-[#001F3F] bg-clip-text py-3 text-center text-4xl text-transparent md:text-7xl" style={{ fontFamily: "Blanka, sans-serif" }}>
                Gallery of <span className="text-[#00D9FF]">Innovation</span>
            </h3>

            <div className="relative mt-16 md:mt-20 h-[220px] md:h-[350px] w-full items-center justify-center lg:flex">
                <motion.div
                    className="relative mx-auto flex w-full max-w-7xl justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <motion.div
                        className="relative flex w-full justify-center items-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isLoaded ? "visible" : "hidden"}
                    >
                        <div className="relative h-[130px] w-[130px] md:h-[220px] md:w-[220px] flex items-center justify-center">
                            {[...photos].reverse().map((photo) => (
                                <motion.div
                                    key={photo.id}
                                    className="absolute"
                                    style={{ zIndex: photo.zIndex }}
                                    variants={photoVariants}
                                    custom={{
                                        x: photo.x,
                                        y: photo.y,
                                        order: photo.order,
                                    }}
                                >
                                    <Photo
                                        width={isMobile ? 130 : 220}
                                        height={isMobile ? 130 : 220}
                                        src={photo.src}
                                        alt={photo.alt}
                                        direction={photo.direction}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};
