export default function ProductDescription({description}) {
  return (
    <>
      <h3 className="sr-only">Product Details</h3>

      <div
        className="space-y-6 text-sm text-gray-500"
        dangerouslySetInnerHTML={{ __html: description }} />
    </>
  )
}