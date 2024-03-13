export default function LoadingButton({ type, color, text, onClick, isLoading=false }) {
    const buttonClasses = `flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-opacity-75 disabled:bg-opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`;
  
    const getColorClasses = (color) => {
      switch (color) {
        case 'indigo':
          return 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600';
        case 'red':
          return 'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600';
        case 'green':
          return 'bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600';
        default:
          return 'bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline-gray-600';
      }
    };
  
    return (
      <button
        type={type}
        className={`${buttonClasses} ${getColorClasses(color)}`}
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading && <svg className="mr-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid" style={{background:'none',shapeRendering:'auto'}} viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="none" stroke="#fff" strokeDasharray="33.510321638291124 11.503440546097041" strokeWidth="2"><animateTransform attributeName="transform" dur="1s" keyTimes="0;1" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></circle></svg>}
        {text}
      </button>
    );
  };