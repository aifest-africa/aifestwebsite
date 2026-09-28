"use client";

export function DecorativeShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Subtle accent shapes - fewer and more refined */}
      <div className="absolute right-8 top-12 h-2 w-2 rounded-full bg-[#ea4335]/10" />
      <div className="absolute right-16 top-24 h-3 w-3 rounded-full bg-[#4285f4]/10" />
      <div className="absolute left-12 top-20 h-2 w-2 rounded-full bg-[#34a853]/10" />
      <div className="absolute left-24 top-32 h-3 w-3 rounded-full bg-[#fbbc04]/10" />
      <div className="absolute bottom-16 right-16 h-2 w-2 rounded-full bg-[#ea4335]/10" />
      <div className="absolute bottom-24 left-16 h-3 w-3 rounded-full bg-[#4285f4]/10" />
    </div>
  );
}

