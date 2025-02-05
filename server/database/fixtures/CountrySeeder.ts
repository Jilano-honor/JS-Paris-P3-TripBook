import AbstractSeeder from "./AbstractSeeder";
class CountrySeeder extends AbstractSeeder {
	static getAllCountries() {
		throw new Error("Method not implemented.");
	}
	constructor() {
		super({ table: "country", truncate: true });
	}
	run() {
		const countryNames = new Set();

		for (let i = 0; i < 200; i += 1) {
			let fakeCountryName: string;
			do {
				fakeCountryName = this.faker.location.country();
			} while (countryNames.has(fakeCountryName));
			countryNames.add(fakeCountryName);
			const fakeCountry = {
				name: fakeCountryName,
				flag: `http://localhost:3310/flags/${this.faker.location.countryCode()}.png`,
				refName: `country_${i}`,
			};
			this.insert(fakeCountry);
		}
	}
}
export default CountrySeeder;
