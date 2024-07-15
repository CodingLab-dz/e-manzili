'use clent'

import React, { useRef, useState, useEffect} from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const StickyScroll = ({
    content,
    contentClassName,
}) => {
    const [activeCard, setActiveCard] = useState(0);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        container: ref,
        offset: ["start start", "end start"],
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );
        setActiveCard(closestBreakpointIndex);
    });

    const backgroundColors = [
        "var(--slate-900)",
        "var(--black)",
        "var(--neutral-900)",
    ];
    const linearGradients = [
        "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
        "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
        "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
    ];
    return (
        <motion.div
            className="h-screen w-full max-w-7xl m-auto overflow-y-auto flex justify-between relative space-x-10 rounded-md px-4"
            ref={ref}
        >
            <div className="div relative flex items-center ">
                <div className="max-w-2xl h-full">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="my-28 h-[60%]">
                            <motion.h2
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-2xl font-bold"
                            >
                                {item.title}
                            </motion.h2>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-kg max-w-sm mt-10"
                            >
                                {item.description}
                            </motion.div>
                        </div>
                    ))}
                    <div className="h-40" />
                </div>
            </div>
            <motion.div
                // animate={{
                //     background: linearGradients[activeCard % linearGradients.length],
                // }}
                className={cn(
                    "hidden mintablet:block h-[500px] w-[50%] rounded-tr-xl rounded-bl-xl sticky top-10 overflow-hidden mx-4",
                    contentClassName
                )}
            >
                {content[activeCard].content ?? null}
            </motion.div>
        </motion.div>
    );
};
