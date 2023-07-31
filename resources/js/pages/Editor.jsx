import { useEffect, useState } from 'react'
import { useAxios } from '../hooks/axios'

export default function Editor() {

  const [ result, setResult ] = useState()

  const format = (e) => {
    let value = e.target.value

    value = trimByChar(value, '"')

    value.replaceAll('%%%', '').replaceAll('%%', '');

    setResult(value)
  }

  function trimByChar(string, character) {
    const first = [...string].findIndex(char => char !== character);
    const last = [...string].reverse().findIndex(char => char !== character);
    return string.substring(first, string.length - last);
  }

  return (
    <div className="p-6 flex justify-start items-start">
      <div className="w-1/3 mx-5">
        <textarea className="w-full rounded-md border-blue-600" rows={10} onChange={format}></textarea> <br />
        <button className="bg-blue-600 rounded-sm text-white px-6 mt-4 cursor-pointer">Format</button>
      </div>

      <textarea className="rounded-md border-green-600 w-1/2 mx-5" rows={25} value={result}></textarea>
    </div>
  )
}
