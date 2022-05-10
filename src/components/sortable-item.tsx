import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { Reorder } from 'framer-motion';
import prettyBytes from 'pretty-bytes';


export default function SortableItem(props: { id: string; name: string; size: number; onRemove: (fileId: string) => void; }) {
	return (
		<Reorder.Item key={props.id} value={props.id} className="bg-base-100 shadow-md flex flex-row justify-between items-center p-2 gap-4 rounded-lg cursor-pointer hover:bg-base-200">
			<button className="btn btn-square btn-ghost">
				<FontAwesomeIcon icon={faGripVertical} className="fa-lg" />
			</button>
			<p className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">{props.name}</p>
			<div className="flex-1" />
			<p className="whitespace-nowrap">({prettyBytes(props.size)})</p>
			<div className="card-actions justify-end">
				<button className="btn btn-square btn-ghost" onClick={() => props.onRemove(props.id)}>
					<FontAwesomeIcon icon={faXmark} className="fa-lg" />
				</button>
			</div>
		</Reorder.Item>
	);
}
