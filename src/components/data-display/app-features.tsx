"use client";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Globe, Zap, CheckCircle } from "lucide-react";
import { Fragment } from "react";

const cards = [
  {
    title: "100%",
    description: "Verificable",
    icon: <TrendingUp className="w-6 h-6 text-primary-foreground" />,
  },
  {
    title: "<5 min",
    description: "Implementación",
    icon: <Zap className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "Global",
    description: "Alcance",
    icon: <Globe className="w-6 h-6 text-primary-foreground" />,
  },
  {
    title: "24/7",
    description: "Disponible",
    icon: <Users className="w-6 h-6 text-purple-500" />,
  },
];

export function AppFeatures() {
  return (
    <div className="space-y-16 w-full">
      {/* Statistics Section */}
      <div className="w-full gap-6 flex flex-row">
        <Marquee className="">
          <MarqueeContent className="w-full overflow-hidden pb-8">
            {cards.map((card, index) => (
              <MarqueeItem
                className="h-full min-w-fit w-full"
                key={`${card.title}-${index}`}
              >
                <Card className="min-w-[320px] mx-4 group relative overflow-hidden border-0 shadow-xl bg-[#ffffff55] backdrop-blur-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardContent className="relative text-center p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Fragment>{card.icon}</Fragment>
                    </div>
                    <div className="text-2xl font-bold text-primary-foreground mb-2">
                      {card.title}
                    </div>
                    <div className="text-sm text-primary-foreground font-medium">
                      {card.description}
                    </div>
                  </CardContent>
                </Card>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </div>
  );
}
