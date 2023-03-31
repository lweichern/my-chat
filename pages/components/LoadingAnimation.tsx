import React from "react";

export default function LoadingAnimation() {
  return (
    <div className="flex items-center space-x-2">
      {[1, 2, 3].map((circle, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full bg-gradient-to-r from-slate-300 to-slate-500 animate-pulse`}
        ></div>
      ))}
    </div>
  );
}
