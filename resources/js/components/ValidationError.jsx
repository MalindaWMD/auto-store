export default function ValidationError({ errors }) {
  if( ! errors){
    return null
  }
  
  return (
    <ul className="mt-1 list-inside list-disk">
      {errors.map((err, i) => {
        return <li key={i} className="text-red-500 text-xs">{err}</li>
      })}
    </ul>
  )
}