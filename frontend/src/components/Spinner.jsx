const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-indigo-200 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  );
};

export default Spinner;


/**Old Spinner **/

// const Spinner = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="animate-ping w-16 h-16 rounded-full bg-indigo-600"></div>
//     </div>
//   );
// };

// export default Spinner;