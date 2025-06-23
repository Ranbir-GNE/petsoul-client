import React, { useState, memo, useCallback } from "react";
import { cn } from "@/lib/utils";

const Card = memo(({ card, index, hovered, setHovered }) => {
  const handleMouseEnter = useCallback(() => setHovered(index), [index, setHovered]);
  const handleMouseLeave = useCallback(() => setHovered(null), [setHovered]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        loading="lazy"
        className="object-cover absolute inset-0 h-full w-full"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-6 px-2 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
      </div>
    </div>
  );
});
Card.displayName = "Card";

export function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full pb-2">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}