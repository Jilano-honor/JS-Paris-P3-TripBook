import type Trip from "./type";

interface Country {
	country_id: number;
	country_name: string;
	id_country: number;
	name: string;
	flag: string;
	tag_id: number;
	tag_name: string;
	tag_photo: string;
	trip: Trip[];
}

export default Country;
