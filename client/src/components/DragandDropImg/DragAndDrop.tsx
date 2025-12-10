import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import "./DragAndDrop.css";

interface DragAndDropProps {
	tripImage: string | null;
	setTripImage: Dispatch<SetStateAction<string>>;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({
	tripImage,
	setTripImage,
}) => {
	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		const files = Array.from(e.dataTransfer.files) as File[];

		const imageFiles = files.filter((file) => file.type.startsWith("image/"));

		if (imageFiles.length > 0) {
			const url = URL.createObjectURL(imageFiles[0]);
			setTripImage(url); // Utilise la prop du parent au lieu de gérer un state interne
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file?.type?.startsWith("image/")) {
			const url = URL.createObjectURL(file);
			setTripImage(url); // Utilise la prop du parent
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

			{tripImage && (
				<div className="image-preview">
					<p>Voici l'image :</p>
					<img src={tripImage ?? ""} alt="téléchargée" />
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
