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
const frequencies: FREQUENCY[] = ["oneshot", "monthly"];

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
  /** Texte sous le prix, ex "engagement 12 mois (468€ total)" */
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
  /** Affiché en bas, ex "Idéal pour..." */
  audience?: string;
}

interface PricingSectionProps extends React.ComponentProps<"div"> {
  plans: Plan[];
  heading: string;
  description?: string;
}

export function PricingSection({
  plans,
  heading,
  description,
  ...props
}: PricingSectionProps) {
  const [frequency, setFrequency] = React.useState<FREQUENCY>("oneshot");

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center space-y-8 p-4",
        props.className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <h2
          className="text-3xl md:text-5xl"
          style={{
            fontFamily: "var(--sans)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
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
        {plans.map((plan) => (
          <PricingCard plan={plan} key={plan.name} frequency={frequency} />
        ))}
      </div>
    </div>
  );
}

type PricingFrequencyToggleProps = React.ComponentProps<"div"> & {
  frequency: FREQUENCY;
  setFrequency: React.Dispatch<React.SetStateAction<FREQUENCY>>;
};

function PricingFrequencyToggle({
  frequency,
  setFrequency,
  ...props
}: PricingFrequencyToggleProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-fit rounded-full border p-1",
        props.className,
      )}
      style={{
        background: "rgba(0, 51, 160, 0.04)",
        borderColor: "rgba(0, 51, 160, 0.15)",
      }}
      {...props}
    >
      {frequencies.map((freq) => (
        <button
          key={freq}
          onClick={() => setFrequency(freq)}
          className="relative px-5 py-2 text-sm font-medium transition-colors"
          style={{
            color: frequency === freq ? "var(--cream)" : "var(--ink-soft)",
          }}
        >
          <span className="relative z-10">{FREQUENCY_LABELS[freq]}</span>
          {frequency === freq && (
            <motion.span
              layoutId="frequency"
              transition={{ type: "spring", duration: 0.4 }}
              className="absolute inset-0 z-0 rounded-full"
              style={{ background: "var(--klein)" }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

type PricingCardProps = React.ComponentProps<"div"> & {
  plan: Plan;
  frequency?: FREQUENCY;
};

function PricingCard({
  plan,
  className,
  frequency = frequencies[0],
  ...props
}: PricingCardProps) {
  const price = plan.price[frequency];
  const priceNote = plan.priceNote?.[frequency];
  const hasPrice = price !== undefined && price !== null;

  return (
    <div
      key={plan.name}
      className={cn(
        "relative flex w-full flex-col rounded-2xl border overflow-hidden",
        className,
      )}
      style={{
        background: plan.highlighted ? "var(--klein)" : "#FFFFFF",
        borderColor: plan.highlighted
          ? "var(--klein)"
          : "var(--line-soft)",
        color: plan.highlighted ? "var(--cream)" : "var(--ink)",
      }}
      {...props}
    >
      {plan.highlighted && <BorderTrail size={80} />}

      {/* Header card */}
      <div
        className="p-6 border-b"
        style={{
          borderColor: plan.highlighted
            ? "rgba(245,240,232,0.15)"
            : "var(--line-soft)",
        }}
      >
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          {plan.highlighted && (
            <span
              className="flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium"
              style={{
                background: "var(--pink)",
                color: "var(--cream)",
              }}
            >
              <StarIcon className="h-3 w-3 fill-current" />
              Populaire
            </span>
          )}
        </div>

        <div
          className="text-base font-medium tracking-tight"
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
                  fontFamily: "var(--sans)",
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
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2.5">
            <CheckCircleIcon
              className="h-4 w-4 mt-0.5 shrink-0"
              style={{
                color: plan.highlighted ? "var(--pink)" : "var(--klein)",
              }}
            />
            <TooltipProvider>
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
            </TooltipProvider>
          </div>
        ))}
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
