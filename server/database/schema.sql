-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema TripBook
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `TripBook` ;

-- -----------------------------------------------------
-- Schema TripBook
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `TripBook` DEFAULT CHARACTER SET utf8 ;
USE `TripBook` ;

-- -----------------------------------------------------
-- Table `TripBook`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  UNIQUE INDEX `idUser_UNIQUE` (`idUser` ASC) VISIBLE,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `Password_UNIQUE` (`Password` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`Country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`Country` (
  `idCountry` INT NOT NULL AUTO_INCREMENT,
  `CountryName` VARCHAR(255) NOT NULL,
  `Description` LONGTEXT NOT NULL,
  `Picture` BLOB NOT NULL,
  UNIQUE INDEX `idCountry_UNIQUE` (`idCountry` ASC) VISIBLE,
  PRIMARY KEY (`idCountry`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`Travel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`Travel` (
  `idTravel` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(255) NOT NULL,
  `Description` MEDIUMTEXT NOT NULL,
  `StartDate` DATETIME NOT NULL,
  `EndDate` DATETIME NOT NULL,
  `CountryId` INT NOT NULL,
  `UserId` INT NOT NULL,
  `IsArchived` TINYINT NULL,
  `User_idUser` INT NOT NULL,
  `Country_idCountry` INT NOT NULL,
  PRIMARY KEY (`idTravel`),
  UNIQUE INDEX `idTravel_UNIQUE` (`idTravel` ASC) VISIBLE,
  INDEX `fk_Travel_User_idx` (`User_idUser` ASC) VISIBLE,
  INDEX `fk_Travel_Country1_idx` (`Country_idCountry` ASC) VISIBLE,
  CONSTRAINT `fk_Travel_User`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `TripBook`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Travel_Country1`
    FOREIGN KEY (`Country_idCountry`)
    REFERENCES `TripBook`.`Country` (`idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`Tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`Tag` (
  `idTag` INT NOT NULL AUTO_INCREMENT,
  `TagName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idTag`),
  UNIQUE INDEX `idTag_UNIQUE` (`idTag` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`Theme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`Theme` (
  `idTheme` INT NOT NULL AUTO_INCREMENT,
  `IdTag` INT NOT NULL,
  `ThemeName` VARCHAR(45) NOT NULL,
  `Country_idCountry` INT NOT NULL,
  PRIMARY KEY (`idTheme`, `IdTag`, `Country_idCountry`),
  UNIQUE INDEX `idTheme_UNIQUE` (`idTheme` ASC) VISIBLE,
  UNIQUE INDEX `IdTag_UNIQUE` (`IdTag` ASC) VISIBLE,
  UNIQUE INDEX `ThemeName_UNIQUE` (`ThemeName` ASC) VISIBLE,
  INDEX `fk_Theme_Country1_idx` (`Country_idCountry` ASC) VISIBLE,
  CONSTRAINT `fk_Theme_Country1`
    FOREIGN KEY (`Country_idCountry`)
    REFERENCES `TripBook`.`Country` (`idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`Tag_has_Country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`Tag_has_Country` (
  `Tag_idTag` INT NOT NULL,
  `Country_idCountry` INT NOT NULL,
  PRIMARY KEY (`Tag_idTag`, `Country_idCountry`),
  INDEX `fk_Tag_has_Country_Country1_idx` (`Country_idCountry` ASC) VISIBLE,
  INDEX `fk_Tag_has_Country_Tag1_idx` (`Tag_idTag` ASC) VISIBLE,
  CONSTRAINT `fk_Tag_has_Country_Tag1`
    FOREIGN KEY (`Tag_idTag`)
    REFERENCES `TripBook`.`Tag` (`idTag`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tag_has_Country_Country1`
    FOREIGN KEY (`Country_idCountry`)
    REFERENCES `TripBook`.`Country` (`idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`Tag_has_Theme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`Tag_has_Theme` (
  `Tag_idTag` INT NOT NULL,
  `Theme_idTheme` INT NOT NULL,
  `Theme_IdTag` INT NOT NULL,
  `Theme_Country_idCountry` INT NOT NULL,
  PRIMARY KEY (`Tag_idTag`, `Theme_idTheme`, `Theme_IdTag`, `Theme_Country_idCountry`),
  INDEX `fk_Tag_has_Theme_Theme1_idx` (`Theme_idTheme` ASC, `Theme_IdTag` ASC, `Theme_Country_idCountry` ASC) VISIBLE,
  INDEX `fk_Tag_has_Theme_Tag1_idx` (`Tag_idTag` ASC) VISIBLE,
  CONSTRAINT `fk_Tag_has_Theme_Tag1`
    FOREIGN KEY (`Tag_idTag`)
    REFERENCES `TripBook`.`Tag` (`idTag`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tag_has_Theme_Theme1`
    FOREIGN KEY (`Theme_idTheme` , `Theme_IdTag` , `Theme_Country_idCountry`)
    REFERENCES `TripBook`.`Theme` (`idTheme` , `IdTag` , `Country_idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO Country (CountryName, Description, Picture) VALUES
  ('Népal', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\NP.png'),
  ('Costa Rica', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\CR.png'),
  ('Australie', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\AU.png'),
  ('Chili', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\CL.png'),
  ('Tanzanie', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\TZ.png'),
  ('Grèce', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\GR.png'),
  ('Égypte', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\EG.png'),
  ('Italie', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\ITA.png'),
  ('Inde', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\IN.png'),
  ('Maroc', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\MA.png'),
  ('Maldives', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\MV.png'),
  ('Bali (Indonésie)', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\ID.png'),
  ('Fidji', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\FJ.png'),
  ('Émirats Arabes Unis (Dubaï)', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\AE.png'),
  ('Suisse', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\CH.png'),
  ('Singapour', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\SG.png'),
  ('France', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\FR.png'),
  ('Japon', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\JP.png'),
  ('Palestine', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\PS.png'),
  ('Canada', 'Quotquot cum otiosae et terrarum tamen omnes verecundum licet set certamina securitas canities circumspectum partes.', 'server\\database\\flags\\CA.png');

INSERT INTO Tag (TagName) VALUES
    ('Aventure en plein air'),
    ('Randonnée et trekking'),
    ('Sites naturels'),
    ('Tourisme durable'),
    ('Safari et faune'),
    ('Plongée et sports nautiques'),
    ('Voyages culturels'),
    ('Sites UNESCO'),
    ('Villes historiques et culturelles'),
    ('Cuisine mondiale'),
    ('Expériences locales et artisanat'),
    ('Îles exotiques'),
    ('Voyages en bateau et croisières'),
    ('Tourisme de luxe'),
    ('Sports d hiver'),
    ('Villes modernes'),
    ('Voyages romantiques'),
    ('Voyages en famille'),
    ('Activités culturelles'),
    ('Voyages en train');
