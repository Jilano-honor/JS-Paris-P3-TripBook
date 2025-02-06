import { useOutletContext } from "react-router-dom";
import type { AppContextInterface } from "../../src/types/type";
function Profil() {
	const { user } = useOutletContext<AppContextInterface>();
	return (
		<>
			<div>Hello : {user?.email}</div>
		</>
	);
}
export default Profil;
