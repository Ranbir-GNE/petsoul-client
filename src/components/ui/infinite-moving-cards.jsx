import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

const InfiniteMovingCards = ({
  items = [],
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  // Set animation direction and speed using CSS variables
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
    let duration = "20s";
    if (speed === "normal") duration = "40s";
    else if (speed === "slow") duration = "80s";
    containerRef.current.style.setProperty("--animation-duration", duration);
  }, [direction, speed]);

  // Duplicate items for seamless infinite scroll
  useEffect(() => {
    if (!scrollerRef.current || start) return;
    const scroller = scrollerRef.current;
    const originalLength = scroller.children.length;
    for (let i = 0; i < originalLength; i++) {
      const node = scroller.children[i].cloneNode(true);
      scroller.appendChild(node);
    }
    setStart(true);
  }, [start, items]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-2 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px] bg-gradient-to-b from-slate-800 to-slate-900"
            key={item.name + idx}
          >
            <blockquote>
              <span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;