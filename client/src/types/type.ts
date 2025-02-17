import type { Dispatch, SetStateAction } from "react";

interface Trip {
	id_trip: number;
	countryName: string;
	flag: string;
	name: string;
	start_at: Date;
	end_at: Date;
	description: string;
	photo: string;
	user_id: number;
	country_id: number;
	id:number;
}
interface User {
	phone_number: number;
	lastname: string;
	firstname: string;
	born_at:Date;
	id_user: number;
	email: string;
	password: string;
	token: string;
}
interface AppContextInterface {
	user: User;
	setUser: Dispatch<SetStateAction<User>>;
}
export type { Trip, User, AppContextInterface };
