import { useOutletContext, useParams } from "react-router-dom";
import type { AppContextInterface } from "../../src/types/type";
import { useEffect } from "react";

function Profile() {
	const { user, setUser } = useOutletContext<AppContextInterface>();
	const { id } = useParams<string>();

	useEffect(() => {
		if (!id) return;
		const getUser = async () => {
			try {
				const result = await fetch(
					`${import.meta.env.VITE_API_URL}/api/users/${id}`,

					{
						method: "GET",
						headers: {
							"content-type": "application/json",
						},
					},
				);
				if (result.ok) {
					const [user] = await result.json();
					setUser(user);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getUser();
	}, [id]);
	const formattedStartDate =
		user && new Date(user.born_at).toLocaleDateString("fr-FR");
	return (
		<>
			<div>{user.firstname}</div>
			<div>{user.lastname}</div>
			<div>{user.email}</div>
			<div>{user.phone_number}</div>
			<div>{formattedStartDate}</div>
			<div><img src={user.avatar} alt= {user.firstname} /></div>
		</>
	);
}
export default Profile;
