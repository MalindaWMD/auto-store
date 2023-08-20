import Modal from './Modal'

export default function SearchHelperModal({ open, openAction }) {
	return (
		<Modal open={open} setOpen={openAction}>
			<div className="text-xs text-left pt-3">
				<p className="mb-3">Search for spare parts using the following combinations.</p>

				<table>
					<thead>
						<tr className="bg-gray-300 text-gray-600 text-center">
							<th className="py-1">Search type</th>
							<th className="py-1">Example</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="py-1 border pl-2 font-medium">Car part</td>
							<td className="py-1 border pl-2">Engine oil</td>
						</tr>
						<tr>
							<td className="py-1 border pl-2 font-medium">Car part + car part manufacturer</td>
							<td className="py-1 border pl-2">Engine Oil CASTROL</td>
						</tr>
						<tr>
							<td className="py-1 border pl-2 font-medium">Car part + car brand</td>
							<td className="py-1 border pl-2">Engine oil DAEWOO</td>
						</tr>
						<tr>
							<td className="py-1 border pl-2 font-medium">Car part + item number</td>
							<td className="py-1 border pl-2">Engine oil + 192.929</td>
						</tr>
						<tr>
							<td className="py-1 border pl-2 font-medium">Item number</td>
							<td className="py-1 border pl-2">8GA 002 071-121</td>
						</tr>
						<tr>
							<td className="py-1 border pl-2 font-medium">Item number + car part manufacturer</td>
							<td className="py-1 border pl-2">1219603500 CASTROL</td>
						</tr>
						<tr>
							<td className="py-1 border pl-2 font-medium">OEN (original equipment number)</td>
							<td className="py-1 border pl-2">1332645</td>
						</tr>
						<tr>
							<td className="py-1 border pl-2 font-medium">OEN + car part manufacturer</td>
							<td className="py-1 border pl-2">100109001 CASTROL</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Modal>
	)
}