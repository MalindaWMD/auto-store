export default function CartItemQtyPicker({ qty, variantId, onAdd, onSubtract }) {
	return (
		<div className="flex justify-between w-[100px]">
			<button onClick={onSubtract} className="bg-gray-200 rounded-full w-6 h-6 cursor-pointer flex justify-center items-center">
				<svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" aria-hidden="false" focusable="false"><path d="M864 480a32 32 0 0 1 3.072 63.850667l-3.072 0.149333h-704a32 32 0 0 1-3.072-63.850667L160 480h704z"></path></svg>
			</button>
			<span className="text-sm">{qty}</span>
			<button onClick={onAdd} className="bg-gray-200 rounded-full w-6 h-6 cursor-pointer flex justify-center items-center">
				<svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" aria-hidden="false" focusable="false"><path d="M512 128a32 32 0 0 1 31.850667 28.928l0.149333 3.072v320h320a32 32 0 0 1 3.072 63.850667l-3.072 0.149333h-320v320a32 32 0 0 1-63.850667 3.072L480 864v-320h-320a32 32 0 0 1-3.072-63.850667L160 480h320v-320A32 32 0 0 1 512 128z"></path></svg>
			</button>
		</div>
	)
}