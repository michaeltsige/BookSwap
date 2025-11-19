import React from 'react';
import { SiBookstack } from 'react-icons/si';
import { LuBookPlus } from 'react-icons/lu';
import { HiOutlineMail } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/bs';

const NavigationTabs = ({ showType, setShowType, userBooks, books }) => {
  const tabs = [
    {
      id: 'allBooks',
      label: 'Browse Books',
      icon: SiBookstack,
      color: 'indigo',
      count: books.length
    },
    {
      id: 'myBooks',
      label: 'My Books',
      icon: LuBookPlus,
      color: 'amber',
      count: userBooks.length
    },
    {
      id: 'swaps',
      label: 'Swap Requests',
      icon: HiOutlineMail,
      color: 'green'
    }
  ];

  const getTabClasses = (tab, isActive) => {
    const baseClasses = "flex items-center justify-center space-x-2 px-6 py-4 rounded-xl border-2 transition-all duration-300 flex-1";
    
    if (isActive) {
      const activeColors = {
        indigo: 'border-indigo-600 bg-indigo-600 text-white shadow-lg',
        amber: 'border-amber-500 bg-amber-500 text-white shadow-lg',
        green: 'border-green-500 bg-green-500 text-white shadow-lg'
      };
      return `${baseClasses} ${activeColors[tab.color]}`;
    }
    
    return `${baseClasses} border-gray-300 bg-white text-gray-700 hover:border-${tab.color}-500 hover:shadow-md`;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={getTabClasses(tab, showType === tab.id)}
          onClick={() => setShowType(tab.id)}
        >
          <tab.icon className="text-lg" />
          <span className="font-semibold">{tab.label}</span>
          {tab.count !== undefined && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              showType === tab.id ? 'bg-white bg-opacity-20' : 'bg-gray-100'
            }`}>
              {tab.count}
            </span>
          )}
          {showType === tab.id && <BsArrowRight className="text-lg" />}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;