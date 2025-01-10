import "dotenv/config";

import fs from "node:fs";
import path from "node:path";
import database from "../database/client";
import type { AbstractSeeder } from "../database/fixtures/AbstractSeeder";

const fixturesPath = path.join(__dirname, "../database/fixtures");

const seed = async () => {
  try {
    const dependencyMap: { [key: string]: AbstractSeeder } = {};

    // Lire les fichiers de seeders
    const filePaths = fs
      .readdirSync(fixturesPath)
      .filter((filePath: string) => !filePath.startsWith("Abstract"));

    for (const filePath of filePaths) {
      const { default: SeederClass } = await import(
        `file://${path.join(fixturesPath, filePath)}`
      );

      if (typeof SeederClass !== "function") {
        throw new Error(
          `Le fichier ${filePath} ne contient pas une classe constructeur.`,
        );
      }

      const seeder = new SeederClass() as AbstractSeeder;
      dependencyMap[SeederClass.toString()] = seeder;
    }

    // Exécuter les seeders dans l'ordre
    for (const seeder of Object.values(dependencyMap)) {
      await seeder.run();
      await Promise.all(seeder.promises);
    }

    database.end();

    console.info("Database seeded successfully");
  } catch (err) {
    console.error("Error during seeding:", err);
  }
};

seed();
