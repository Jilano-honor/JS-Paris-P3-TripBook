import { useNavigate, useOutletContext } from "react-router-dom";
import type { AppContextInterface } from "../../types/type";
import "./Profile.css";
import avatarImage from "../../../public/avatar/Avatar3.png";
import UserTrips from "./UserTrips";

function Profile() {
	const { user } = useOutletContext<AppContextInterface>();
	const navigate = useNavigate();
	const formattedStartDate =
		user && new Date(user.born_at).toLocaleDateString("fr-FR");

	return (
		<>
			<div className="main-container">
				<div className="profile-container">
					{/* Avatar */}
					<div className="profile-avatar-container">
						<div className="profile-avatar">
							<img src={avatarImage} alt="avatar" />
						</div>
					</div>
					{/* Informations personnelles */}
					<div className="profile-info-container">
						<div className="profile-info">
							<p>{user?.firstname}</p>
							<p>{user?.lastname}</p>
							<p>{user?.email}</p>
							<p>{user?.phone_number}</p>
							<p>{formattedStartDate}</p>
						</div>
					</div>

					<button className="edit-profile-button" type="button">
						Modifier le profil
					</button>

					<button
						className="add-trip-button"
						onClick={() => navigate("/trips/add")}
						type="button"
					>
						Ajouter un voyage
					</button>
				</div>
				<div>
					<UserTrips />
				</div>
			</div>
		</>
	);
}

export default Profile;
