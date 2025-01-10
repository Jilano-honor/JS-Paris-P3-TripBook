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

      // Vérifier si SeederClass est bien une fonction (classe)
      if (typeof SeederClass !== "function") {
        throw new Error(
          `Le fichier ${filePath} ne contient pas une classe constructeur.`,
        );
      }

      const seeder = new SeederClass() as AbstractSeeder;
      dependencyMap[SeederClass.toString()] = seeder;
    }

    // Résoudre les dépendances et trier les seeders
    const sortedSeeders: AbstractSeeder[] = [];
    const solveDependencies = (n: AbstractSeeder) => {
      for (const DependencyClass of n.dependencies) {
        const dependency = dependencyMap[DependencyClass.toString()];
        if (!sortedSeeders.includes(dependency)) {
          solveDependencies(dependency);
        }
      }

      if (!sortedSeeders.includes(n)) {
        sortedSeeders.push(n);
      }
    };

    // Résoudre les dépendances pour chaque seeder
    for (const seeder of Object.values(dependencyMap)) {
      solveDependencies(seeder);
    }

    // Supprimer les anciennes données (trier selon les dépendances)
    for (const seeder of sortedSeeders.reverse()) {
      await database.query(`DELETE FROM ${seeder.table}`);
    }

    // Exécuter chaque seeder
    for (const seeder of sortedSeeders) {
      await seeder.run();
      await Promise.all(seeder.promises); // Attendre que les promesses soient résolues
    }

    // Fermer la connexion à la base de données
    database.end();

    console.info(
      `${process.env.DB_NAME} filled from '${path.normalize(fixturesPath)}' 🌱`,
    );
  } catch (err) {
    const { message, stack } = err as Error;
    console.error("Error filling the database:", message, stack);
  }
};

// Exécuter la fonction de seed
seed();
