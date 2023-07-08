import { Fragment } from "react"

export default function ProductFaq({ faqs }) {
  return (
    <>
      <h3 className="sr-only">Frequently Asked Questions</h3>

      <dl>
        {faqs.map((faq) => (
          <Fragment key={faq.question}>
            <dt className="mt-10 font-medium text-gray-900">{faq.question}</dt>
            <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
              <p>{faq.answer}</p>
            </dd>
          </Fragment>
        ))}
      </dl>
    </>
  )
}