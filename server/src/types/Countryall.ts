interface CountryAll {
	country_name: string;
	id_country: number;
	name: string;
	flag: string;
	tag_id: number;
	tag_name: string;
	tag_photo: string;
	trip: Trip[];
}
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
}

export default CountryAll;
