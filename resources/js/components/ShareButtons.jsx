export default function ShareButtons() {
  let location = window.location.href
  return (
    <div className="mt-10">
      <h3 className="text-sm font-medium text-gray-900">Share</h3>
      <ul role="list" className="mt-4 flex items-center space-x-6">
        <li>
          <a href={`https://www.facebook.com/sharer.php?u=${location}`} target="noopener" className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
            <span className="sr-only">Share on Facebook</span>
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                clipRule="evenodd" />
            </svg>
          </a>
        </li>
        <li>
          <a href={`https://t.me/share/url?url=${location}`} target="noopener" className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
            <span className="sr-only">Share on Telegram</span>
            <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" >
              <path d="M19.32 22.734a.927.927 0 0 1-.53-.164l-6.036-4.093-3.238 2.328a.948.948 0 0 1-1.473-.528l-1.625-6.16-5.809-2.219A.958.958 0 0 1 0 11.016a.945.945 0 0 1 .598-.887l22.082-8.79a.95.95 0 0 1 1.3 1.066l-3.726 19.556a.95.95 0 0 1-.934.773Zm-6.039-6.195 5.375 3.648L21.56 4.97 11.086 15.047l2.172 1.476c.008.004.015.012.023.016ZM8.81 15.73l.718 2.727 1.551-1.117-2.031-1.375a1.044 1.044 0 0 1-.238-.235Zm-5.246-4.738 3.988 1.524c.285.109.5.351.578.644l.508 1.918a.96.96 0 0 1 .285-.586l9.98-9.601Zm0 0" />
            </svg>
          </a>
        </li>
        <li>
          <a href={`https://api.whatsapp.com/send?text=${location}`} target="noopener" className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
            <span className="sr-only">Share on WhatsApp</span>
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  )
}