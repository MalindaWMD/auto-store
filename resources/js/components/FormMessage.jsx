let colors = {
  error: 'red',
  success: 'green',
  info: 'indigo'
}

export default function FormMessage({ type, message, isShown=false }) {
  if( ! isShown){
    return null
  }

  if (!type && !message) {
    return null
  }

  let color = colors[type] || colors.info

  return <div className={`rounded-md bg-${color}-100 px-3 py-3 mb-3 text-xs font-medium text-${color}-700`}>
    {message}
  </div>
}