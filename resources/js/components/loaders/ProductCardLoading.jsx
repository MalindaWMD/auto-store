import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProductCardLoading({ count = 1 }) {
  return (
    <>
      {[...Array(count)].map((e, i) => (
        <div key={i} className="grid grid-cols-4 grid-gap-6 py-5 hover:bg-gray-50 rounded-sm">
          <div className="flex flex-col justify-start items-center">
            <Skeleton style={{ width: '75px', justifySelf: 'start', alignSelf: 'start' }} />
            <div className="flex justify-center items-center w-full h-full">
              <Skeleton style={{ width: '100px', height: '100px' }} />
            </div>
          </div>
          <div className="col-span-2">
            <h3 className="text-lg font-bold"><Skeleton /></h3>
            <span className="text-sm text-gray-600">
              <Skeleton count={2} />
            </span>
            <Skeleton />
            <div className="text-gray-500 text-xs font-medium"><Skeleton /></div>
            <div className="mt-4 text-xs bg-gray-100 p-2 rounded-sm">
              <Skeleton count={5} />
            </div>
          </div>
          <div className="px-5 flex flex-col justify-between items-start">
            <Skeleton style={{ width: '100px' }} />
            <div>
              <Skeleton style={{ width: '100px' }} />
              <Skeleton style={{ width: '100px', height: '30px' }} />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}