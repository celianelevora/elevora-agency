"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionWithMockupProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  primaryImageSrc?: string;
  secondaryImageSrc?: string;
  primaryContent?: React.ReactNode;
  secondaryContent?: React.ReactNode;
  reverseLayout?: boolean;
  theme?: "dark" | "light";
}

const SectionWithMockup: React.FC<SectionWithMockupProps> = ({
  title,
  description,
  primaryImageSrc,
  secondaryImageSrc,
  primaryContent,
  secondaryContent,
  reverseLayout = false,
  theme = "light",
}) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const },
    },
  };

  const layoutClasses = reverseLayout
    ? "md:grid-cols-2 md:grid-flow-col-dense"
    : "md:grid-cols-2";

  const textOrderClass = reverseLayout ? "md:col-start-2" : "";
  const imageOrderClass = reverseLayout ? "md:col-start-1" : "";

  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-[var(--klein-deep)]" : "bg-[var(--cream-warm)]";
  const titleColor = isDark ? "text-[var(--cream)]" : "text-[var(--ink)]";
  const descColor = isDark
    ? "text-[var(--cream)]/70"
    : "text-[var(--ink-soft)]";
  const secondaryBg = isDark ? "bg-[var(--klein)]" : "bg-[var(--pink-light)]";
  const primaryBg = isDark
    ? "bg-[var(--klein-bright)]/10"
    : "bg-white";

  return (
    <section
      className={`relative py-24 md:py-32 overflow-hidden ${bgClass}`}
    >
      <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
        <motion.div
          className={`grid grid-cols-1 gap-16 md:gap-8 w-full items-center ${layoutClasses}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Texte */}
          <motion.div
            className={`flex flex-col items-start gap-4 mt-10 md:mt-0 max-w-[546px] mx-auto md:mx-0 ${textOrderClass}`}
            variants={itemVariants}
          >
            <h2
              className={`text-3xl md:text-[44px] font-normal leading-tight md:leading-[1.1] tracking-tight ${titleColor}`}
              style={{ letterSpacing: "-0.03em" }}
            >
              {title}
            </h2>

            <p className={`text-[15px] md:text-base leading-[1.7] mt-2 ${descColor}`}>
              {description}
            </p>
          </motion.div>

          {/* Mockup */}
          <motion.div
            className={`relative mt-10 md:mt-0 mx-auto ${imageOrderClass} w-full max-w-[300px] md:max-w-[471px]`}
            variants={itemVariants}
          >
            {/* Carte secondaire (en arrière-plan) */}
            <motion.div
              className={`absolute w-[300px] h-[317px] md:w-[472px] md:h-[500px] ${secondaryBg} rounded-[32px] z-0 overflow-hidden`}
              style={{
                top: reverseLayout ? "auto" : "10%",
                bottom: reverseLayout ? "10%" : "auto",
                left: reverseLayout ? "auto" : "-20%",
                right: reverseLayout ? "-20%" : "auto",
                transform: reverseLayout
                  ? "translate(0, 0)"
                  : "translateY(10%)",
                filter: "blur(1px)",
              }}
              initial={{ y: 0 }}
              whileInView={{ y: reverseLayout ? -20 : -30 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {secondaryImageSrc && (
                <div
                  className="relative w-full h-full bg-cover bg-center rounded-[32px]"
                  style={{
                    backgroundImage: `url(${secondaryImageSrc})`,
                  }}
                />
              )}
              {secondaryContent && (
                <div className="w-full h-full">{secondaryContent}</div>
              )}
            </motion.div>

            {/* Mockup principal */}
            <motion.div
              className={`relative w-full h-[405px] md:h-[637px] ${primaryBg} rounded-[32px] border z-10 overflow-hidden shadow-2xl`}
              style={{
                borderColor: isDark
                  ? "rgba(245,240,232,0.08)"
                  : "var(--line-soft)",
              }}
              initial={{ y: 0 }}
              whileInView={{ y: reverseLayout ? 20 : 30 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {primaryImageSrc && (
                <div className="p-0 h-full">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${primaryImageSrc})`,
                    }}
                  />
                </div>
              )}
              {primaryContent && (
                <div className="w-full h-full">{primaryContent}</div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient bas */}
      <div
        className="absolute w-full h-px bottom-0 left-0 z-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0) 100%)",
        }}
      />
    </section>
  );
};

export default SectionWithMockup;
