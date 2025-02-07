import client from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
	email: string;
	password: string;
	firstname: string;
	lastname: string;
	phone_number: string;
	born_at: number;
	avatar?: string | File;
};

class UserRepository {
	createUser(user: User) {
		return client.query<Result>(
			"INSERT INTO user(firstname, lastname,email,phone_number, born_at, avatar,password) VALUES (?,?,?,?,?,?,?)",
			[
				user.firstname,
				user.lastname,
				user.email,
				user.phone_number,
				user.born_at,
				user.avatar,
				user.password,
			],
		);
	}
	readUserByEmail(email: string) {
		return client.query<Rows>("SELECT * FROM User WHERE email = ?", [email]);
	}
	readUserById(idUser: number) {
		return client.query<Rows>("SELECT * FROM User WHERE id_user = ?", [idUser]);
	}
}

export default new UserRepository();
