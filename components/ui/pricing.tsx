"use client";

import * as React from "react";
import Link from "next/link";
import { motion, Transition } from "framer-motion";
import { CheckCircleIcon, StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type FREQUENCY = "oneshot" | "monthly";

const FREQUENCY_LABELS: Record<FREQUENCY, string> = {
  oneshot: "Paiement unique",
  monthly: "Mensuel",
};

export interface Plan {
  name: string;
  info: string;
  price: {
    oneshot?: number | string;
    monthly?: number | string;
  };
  priceNote?: {
    oneshot?: string;
    monthly?: string;
  };
  features: {
    text: string;
    tooltip?: string;
  }[];
  btn: {
    text: string;
    href: string;
  };
  highlighted?: boolean;
  audience?: string;
}

interface PricingSectionProps extends React.ComponentProps<"div"> {
  plans: Plan[];
  heading: string;
  description?: string;
}

/* Hook simple sans dépendance externe.
   Retourne null tant que le viewport n'est pas connu (SSR + 1er rendu client),
   ce qui evite le saut de position des cards sur desktop et tout mismatch
   d'hydratation. */
function useIsDesktop(minWidth = 768) {
  const [isDesktop, setIsDesktop] = React.useState<boolean | null>(null);
  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${minWidth}px)`);
    const onChange = () => setIsDesktop(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [minWidth]);
  return isDesktop;
}

export function PricingSection({
  plans,
  heading,
  description,
  ...props
}: PricingSectionProps) {
  const [frequency, setFrequency] = React.useState<FREQUENCY>("oneshot");
  const isDesktop = useIsDesktop();

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center space-y-10 p-4",
        props.className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <h2
          className="text-3xl md:text-5xl"
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 400,
            letterSpacing: "-0.025em",
            color: "var(--ink)",
            lineHeight: 1.05,
          }}
        >
          {heading}
        </h2>
        {description && (
          <p
            className="text-base md:text-lg"
            style={{ color: "var(--ink-soft)", lineHeight: 1.6 }}
          >
            {description}
          </p>
        )}
      </div>

      <PricingFrequencyToggle
        frequency={frequency}
        setFrequency={setFrequency}
      />

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ y: 50, opacity: 0 }}
            whileInView={
              isDesktop === null
                ? undefined
                : isDesktop
                ? {
                    y: plan.highlighted ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -25 : index === 0 ? 25 : 0,
                    scale: plan.highlighted ? 1.0 : 0.94,
                  }
                : { y: 0, opacity: 1, scale: 1 }
            }
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.4,
              type: "spring",
              stiffness: 90,
              damping: 28,
              delay: index * 0.1,
              opacity: { duration: 0.5 },
            }}
            style={{
              zIndex: plan.highlighted ? 10 : 0,
              transformOrigin:
                index === 0 ? "right center" : index === 2 ? "left center" : "center",
            }}
          >
            <PricingCard plan={plan} frequency={frequency} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

type PricingFrequencyToggleProps = {
  frequency: FREQUENCY;
  setFrequency: React.Dispatch<React.SetStateAction<FREQUENCY>>;
};

function PricingFrequencyToggle({
  frequency,
  setFrequency,
}: PricingFrequencyToggleProps) {
  const isMonthly = frequency === "monthly";

  return (
    <div className="flex items-center gap-4">
      <span
        className="text-sm font-medium transition-colors"
        style={{ color: !isMonthly ? "var(--ink)" : "var(--ink-muted)" }}
      >
        {FREQUENCY_LABELS.oneshot}
      </span>

      <button
        type="button"
        onClick={() => setFrequency(isMonthly ? "oneshot" : "monthly")}
        className="relative h-7 w-12 rounded-full transition-colors duration-300"
        style={{
          background: isMonthly ? "var(--klein)" : "rgba(27, 79, 138, 0.15)",
        }}
        aria-label="Toggle billing"
      >
        <motion.div
          className="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md"
          animate={{ left: isMonthly ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>

      <span
        className="text-sm font-medium transition-colors"
        style={{ color: isMonthly ? "var(--ink)" : "var(--ink-muted)" }}
      >
        {FREQUENCY_LABELS.monthly}
      </span>
    </div>
  );
}

type PricingCardProps = {
  plan: Plan;
  frequency?: FREQUENCY;
};

function PricingCard({ plan, frequency = "oneshot" }: PricingCardProps) {
  const price = plan.price[frequency];
  const priceNote = plan.priceNote?.[frequency];
  const hasPrice = price !== undefined && price !== null;

  return (
    <div
      className={cn(
        "relative flex w-full h-full flex-col rounded-2xl overflow-hidden",
      )}
      style={{
        background: plan.highlighted ? "var(--klein)" : "#FFFFFF",
        borderWidth: plan.highlighted ? 2 : 1,
        borderStyle: "solid",
        borderColor: plan.highlighted ? "var(--klein)" : "var(--line-soft)",
        color: plan.highlighted ? "var(--cream)" : "var(--ink)",
        boxShadow: plan.highlighted
          ? "0 24px 60px rgba(27, 79, 138, 0.25), 0 8px 24px rgba(27, 79, 138, 0.15)"
          : "0 4px 20px rgba(0, 0, 0, 0.04)",
      }}
    >
      {plan.highlighted && <BorderTrail size={80} />}

      {/* Popular badge */}
      {plan.highlighted && (
        <div
          className="absolute top-0 right-0 z-10 flex items-center gap-1 rounded-bl-xl rounded-tr-2xl px-3 py-1.5"
          style={{ background: "var(--pink)", color: "var(--cream)" }}
        >
          <StarIcon className="h-3.5 w-3.5 fill-current" />
          <span className="text-xs font-semibold tracking-wide">Populaire</span>
        </div>
      )}

      {/* Header card */}
      <div
        className="p-6 border-b"
        style={{
          borderColor: plan.highlighted
            ? "rgba(245,240,232,0.15)"
            : "var(--line-soft)",
        }}
      >
        <div
          className="text-base font-medium"
          style={{ letterSpacing: "-0.01em" }}
        >
          {plan.name}
        </div>
        <p
          className="text-sm mt-1"
          style={{
            color: plan.highlighted
              ? "rgba(245,240,232,0.7)"
              : "var(--ink-muted)",
          }}
        >
          {plan.info}
        </p>

        <h3 className="mt-4 flex items-end gap-1">
          {hasPrice ? (
            <>
              <span
                className="text-4xl"
                style={{
                  fontFamily: "var(--serif)",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  color: plan.highlighted ? "var(--cream)" : "var(--ink)",
                  lineHeight: 1,
                }}
              >
                {typeof price === "number" ? `${price}€` : price}
              </span>
              {frequency === "monthly" && typeof price === "number" && (
                <span
                  className="text-sm mb-1"
                  style={{
                    color: plan.highlighted
                      ? "rgba(245,240,232,0.6)"
                      : "var(--ink-muted)",
                  }}
                >
                  /mois
                </span>
              )}
            </>
          ) : (
            <span
              className="text-2xl"
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontWeight: 400,
                color: plan.highlighted ? "var(--cream)" : "var(--ink-muted)",
                lineHeight: 1,
              }}
            >
              Non disponible
            </span>
          )}
        </h3>

        {priceNote && (
          <p
            className="text-xs mt-2"
            style={{
              color: plan.highlighted
                ? "rgba(245,240,232,0.7)"
                : "var(--ink-muted)",
            }}
          >
            {priceNote}
          </p>
        )}
      </div>

      {/* Features */}
      <div
        className="space-y-3 px-6 py-6 text-sm flex-1"
        style={{
          color: plan.highlighted
            ? "rgba(245,240,232,0.85)"
            : "var(--ink-soft)",
        }}
      >
        <TooltipProvider>
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2.5">
              <CheckCircleIcon
                className="h-4 w-4 mt-0.5 shrink-0"
                style={{
                  color: plan.highlighted ? "var(--pink)" : "var(--klein)",
                }}
              />
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p
                    className={cn(
                      "leading-snug",
                      feature.tooltip && "cursor-help border-b border-dashed",
                    )}
                    style={{
                      borderColor: feature.tooltip
                        ? plan.highlighted
                          ? "rgba(245,240,232,0.25)"
                          : "var(--line)"
                        : "transparent",
                    }}
                  >
                    {feature.text}
                  </p>
                </TooltipTrigger>
                {feature.tooltip && (
                  <TooltipContent>
                    <p>{feature.tooltip}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </div>
          ))}
        </TooltipProvider>
      </div>

      {/* Audience */}
      {plan.audience && (
        <div
          className="px-6 py-3 text-xs italic"
          style={{
            color: plan.highlighted
              ? "rgba(245,240,232,0.6)"
              : "var(--ink-muted)",
            fontFamily: "var(--serif)",
            borderTop: plan.highlighted
              ? "0.5px solid rgba(245,240,232,0.15)"
              : "0.5px solid var(--line-soft)",
          }}
        >
          {plan.audience}
        </div>
      )}

      {/* CTA */}
      <div
        className="w-full p-4"
        style={{
          borderTop: plan.highlighted
            ? "0.5px solid rgba(245,240,232,0.15)"
            : "0.5px solid var(--line-soft)",
        }}
      >
        <Button
          asChild
          className="w-full"
          style={
            plan.highlighted
              ? {
                  background: "var(--cream)",
                  color: "var(--klein)",
                }
              : {
                  background: "var(--klein)",
                  color: "var(--cream)",
                }
          }
        >
          <Link href={plan.btn.href}>{plan.btn.text}</Link>
        </Button>
      </div>
    </div>
  );
}

type BorderTrailProps = {
  className?: string;
  size?: number;
  transition?: Transition;
  delay?: number;
  style?: React.CSSProperties;
};

function BorderTrail({
  className,
  size = 60,
  transition,
  delay,
  style,
}: BorderTrailProps) {
  const BASE_TRANSITION: Transition = {
    repeat: Infinity,
    duration: 5,
    ease: "linear",
  };

  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn("absolute aspect-square", className)}
        style={{
          width: size,
          background: "var(--pink)",
          opacity: 0.5,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          ...(transition ?? BASE_TRANSITION),
          delay: delay,
        }}
      />
    </div>
  );
}
