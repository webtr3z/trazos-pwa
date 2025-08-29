"use client";

import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";

const marqueePhrase = [
  "Trazos",
  "lleva",
  "los",
  "productos",
  "del",
  "Caribe",
  "al",
  "blockchain",
  "con",
  "QR",
  "únicos",
  "-",
];

export default function MarqueeSection() {
  return (
    <Marquee>
      <MarqueeContent className="overflow-hidden">
        {marqueePhrase.map((w, index) => (
          <MarqueeItem className="h-10 max-w-fit w-full" key={`${w}-${index}`}>
            <p className="uppercase text-4xl text-muted-foreground font-medium">
              {w}
            </p>
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </Marquee>
  );
}
