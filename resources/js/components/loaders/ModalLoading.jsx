export default function ModalLoading({ open = false }) {

  if( ! open){
    return null
  }

  return (
    <div className="w-full h-screen flex justify-center items-center fixed top-0 right-0">
      <div className="fixed inset-0 bg-gray-700 bg-opacity-95 transition-opacity" />
      <div className="text-center relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:px-6 sm:py-8">
        <svg width="52" height="52" preserveAspectRatio="xMidYMid" style={{margin:'auto',background:'0 0',display:'block',shapeRendering:'auto'}} viewBox="0 0 100 100"><rect width="7" height="14" x="46.5" y="23" fill="#1d3f72" rx="3.5" ry="5.88"><animate attributeName="opacity" begin="-0.9s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/></rect><rect width="7" height="14" x="46.5" y="23" fill="#1d3f72" rx="3.5" ry="5.88" transform="rotate(36 50 50)"><animate attributeName="opacity" begin="-0.8s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/></rect><rect width="7" height="14" x="46.5" y="23" fill="#1d3f72" rx="3.5" ry="5.88" transform="rotate(72 50 50)"><animate attributeName="opacity" begin="-0.7s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/></rect><rect width="7" height="14" x="46.5" y="23" fill="#1d3f72" rx="3.5" ry="5.88" transform="rotate(108 50 50)"><animate attributeName="opacity" begin="-0.6s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/></rect><rect width="7" height="14" x="46.5" y="23" fill="#1d3f72" rx="3.5" ry="5.88" transform="rotate(144 50 50)"><animate attributeName="opacity" begin="-0.5s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/></rect><rect width="7" height="14" x="46.5" y="23" fill="#1d3f72" rx="3.5" ry="5.88" transform="rotate(180 50 50)"><animate attributeName="opacity" begin="-0.4s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/></rect><rect width="7" height="14" x="46.5" y="23" fill="#1d3f72" rx="3.5" ry="5.88" transform="rotate(216 50 50)"><animate attributeName="opacity" begin="-0.3s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/></rect><rect width="7" height="14" x="46.5" y="23" fill="#1d3f72" rx="3.5" ry="5.88" transform="rotate(252 50 50)"><animate attributeName="opacity" begin="-0.2s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/></rect><rect width="7" height="14" x="46.5" y="23" fill="#1d3f72" rx="3.5" ry="5.88" transform="rotate(288 50 50)"><animate attributeName="opacity" begin="-0.1s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/></rect><rect width="7" height="14" x="46.5" y="23" fill="#1d3f72" rx="3.5" ry="5.88" transform="rotate(324 50 50)"><animate attributeName="opacity" begin="0s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/></rect></svg>
        <p>Please wiat...</p>
      </div>
    </div>
  )
}