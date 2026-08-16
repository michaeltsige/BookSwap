import React from 'react';

const NavigationTabs = ({ showType, setShowType, userBooks, books, pendingSwapsCount }) => {
  const tabs = [
    {
      id: 'allBooks',
      label: 'Browse Books',
      color: 'terracotta',
      count: books.length
    },
    {
      id: 'myBooks',
      label: 'My Books',
      color: 'teal',
      count: userBooks.length
    },
    {
      id: 'swaps',
      label: 'Swap Requests',
      color: 'pine',
      count: pendingSwapsCount > 0 ? pendingSwapsCount : undefined
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
    <div className="flex flex-col sm:flex-row gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={getTabClasses(tab, showType === tab.id)}
          onClick={() => setShowType(tab.id)}
        >
          <span>{tab.label}</span>
          {tab.count !== undefined && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              showType === tab.id 
                ? 'bg-white/25 text-white font-extrabold' 
                : tab.id === 'swaps' 
                  ? 'bg-amber-500 text-white font-extrabold animate-pulse' 
                  : 'bg-slate-100 text-slate-500'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;
