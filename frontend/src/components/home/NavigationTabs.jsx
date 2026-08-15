import React from 'react';
import { SiBookstack } from 'react-icons/si';
import { LuBookPlus } from 'react-icons/lu';
import { HiOutlineMail } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/all'; // Modified import just in case, wait, let's keep BsArrowRight from 'react-icons/bs' as it was!
import { BsArrowRight as ArrowIcon } from 'react-icons/bs';

const NavigationTabs = ({ showType, setShowType, userBooks, books }) => {
  const tabs = [
    {
      id: 'allBooks',
      label: 'Browse Books',
      icon: SiBookstack,
      color: 'terracotta',
      count: books.length
    },
    {
      id: 'myBooks',
      label: 'My Books',
      icon: LuBookPlus,
      color: 'teal',
      count: userBooks.length
    },
    {
      id: 'swaps',
      label: 'Swap Requests',
      icon: HiOutlineMail,
      color: 'pine'
    }
  ];

  const getTabClasses = (tab, isActive) => {
    const baseClasses = "flex items-center justify-center space-x-2.5 px-6 py-4 rounded-xl border transition-all duration-200 flex-1 text-xs uppercase tracking-wider font-bold";
    
    if (isActive) {
      const activeColors = {
        terracotta: 'border-[#9A3412] bg-[#9A3412] text-white shadow-sm',
        teal: 'border-[#164E63] bg-[#164E63] text-white shadow-sm',
        pine: 'border-[#115E59] bg-[#115E59] text-white shadow-sm'
      };
      return `${baseClasses} ${activeColors[tab.color]}`;
    }
    
    return `${baseClasses} border-[#E3EAE3] bg-white text-slate-600 hover:border-slate-400`;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={getTabClasses(tab, showType === tab.id)}
          onClick={() => setShowType(tab.id)}
        >
          <tab.icon className="text-sm" />
          <span>{tab.label}</span>
          {tab.count !== undefined && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              showType === tab.id ? 'bg-white/25 text-white font-extrabold' : 'bg-slate-100 text-slate-500'
            }`}>
              {tab.count}
            </span>
          )}
          {showType === tab.id && <ArrowIcon className="text-sm ml-1" />}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;
