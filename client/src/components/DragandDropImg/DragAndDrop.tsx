import type React from "react";
import { useState } from "react";
import "./DragAndDrop.css";

const DragAndDrop = () => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		const files = Array.from(e.dataTransfer.files) as File[];

		const imageFiles = files.filter((file) => file.type.startsWith("image/"));

		if (imageFiles.length > 0) {
			const url = URL.createObjectURL(imageFiles[0]);
			setImageUrl(url);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file?.type?.startsWith("image/")) {
			const url = URL.createObjectURL(file);
			setImageUrl(url);
		}
	};

	return (
		<div>
			<div
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				className="drag-and-drop-zone"
			>
				<p>Glissez une image ici</p>
			</div>

			{imageUrl && (
				<div className="image-preview">
					<p>Voici l'image :</p>
					<img src={imageUrl} alt="téléchargée" />
				</div>
			)}

			<label htmlFor="file-input" className="import-button">
				Importer une image
			</label>
			<input
				id="file-input"
				type="file"
				accept="image/*"
				onChange={handleFileSelect}
			/>
		</div>
	);
};

export default DragAndDrop;
