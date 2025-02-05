interface tags {
	id_tag: number;
	name: string;
}

interface TagMenuProps {
	tags: tags[];
	activeTag: number | null;
	onTagClick: (tagId: number) => void;
}

function TagMenu({ tags, activeTag, onTagClick }: TagMenuProps) {
	const handleTagClick = (tag: tags) => {
		onTagClick(tag.id_tag);
	};

	return (
		<div className="TripSearchListTag">
			{tags.length > 0 ? (
				tags.map((tag: tags) => (
					<button
						className="TripSearchButton"
						type="button"
						key={tag.id_tag}
						onClick={() => handleTagClick(tag)}
						style={{
							backgroundColor: activeTag === tag.id_tag ? "lightblue" : "white",
							color: activeTag === tag.id_tag ? "white" : "black",
						}}
					>
						{tag.name}
					</button>
				))
			) : (
				<p>Aucun tag disponible.</p>
			)}
		</div>
	);
}

export default TagMenu;
