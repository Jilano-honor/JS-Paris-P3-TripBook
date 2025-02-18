interface tags {
	photo: string;
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
						className={activeTag === tag.id_tag ? "active-tag" : "inactive-tag"}
						type="button"
						key={tag.id_tag}
						onClick={() => handleTagClick(tag)}
					>
						<img src={tag.photo} alt={tag.name} className="icone" />
						<span>{tag.name}</span> {}
					</button>
				))
			) : (
				<p>Aucun tag disponible.</p>
			)}
		</div>
	);
}

export default TagMenu;
