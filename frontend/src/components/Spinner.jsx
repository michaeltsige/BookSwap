import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF9F6]/80 backdrop-blur-md select-none">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulse ring */}
        <div className="w-16 h-16 border-2 border-[#9A3412]/10 rounded-full absolute animate-ping duration-1000"></div>
        {/* Medium track ring */}
        <div className="w-12 h-12 border-4 border-slate-100 rounded-full"></div>
        {/* Spinning accent ring */}
        <div className="w-12 h-12 border-4 border-[#9A3412] border-t-transparent rounded-full animate-spin absolute top-0"></div>
      </div>
      <p className="text-xs uppercase font-mono tracking-widest font-extrabold text-[#9A3412] mt-6 animate-pulse">
        Loading BookSwap
      </p>
    </div>
  );
};

export default Spinner;
