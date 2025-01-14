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
  `IdUser` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(255) NOT NULL,
  `LastName` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `PhoneNumber` INT NOT NULL,
  `DateOfBirth` DATETIME NOT NULL,
  `Avatar`   VARCHAR(255) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`IdUser`),
  UNIQUE INDEX `Id_UNIQUE` (`IdUser` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `Mdp_UNIQUE` (`Password` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`Country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`Country` (
  `idCountry` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  `Flag` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idCountry`),
  UNIQUE INDEX `idCountry_UNIQUE` (`idCountry` ASC) VISIBLE,
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`Trip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`Trip` (
  `idTrip` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  `StartDate` DATETIME NOT NULL,
  `EndDate` DATETIME NOT NULL,
  `Description` TEXT NOT NULL,
  `Photo` VARCHAR(255) NOT NULL,
  `User_IdUser` INT NOT NULL,
  `Country_idCountry` INT NOT NULL,
  PRIMARY KEY (`idTrip`, `User_IdUser`, `Country_idCountry`),
  UNIQUE INDEX `idTrip_UNIQUE` (`idTrip` ASC) VISIBLE,
  UNIQUE INDEX `Photo_UNIQUE` (`Photo` ASC) VISIBLE,
  INDEX `fk_Trip_User_idx` (`User_IdUser` ASC) VISIBLE,
  INDEX `fk_Trip_Country1_idx` (`Country_idCountry` ASC) VISIBLE,
  CONSTRAINT `fk_Trip_User`
    FOREIGN KEY (`User_IdUser`)
    REFERENCES `TripBook`.`User` (`IdUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Trip_Country1`
    FOREIGN KEY (`Country_idCountry`)
    REFERENCES `TripBook`.`Country` (`idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`Theme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`Theme` (
  `idTheme` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  `Photo` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`idTheme`),
  UNIQUE INDEX `idTheme_UNIQUE` (`idTheme` ASC) VISIBLE,
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`Tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`Tag` (
  `idTag` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  `Photo` VARCHAR(1000) NOT NULL,
  `Theme_idTheme` INT NOT NULL,
  PRIMARY KEY (`idTag`, `Theme_idTheme`),
  UNIQUE INDEX `idTag_UNIQUE` (`idTag` ASC) VISIBLE,
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) VISIBLE,
  INDEX `fk_Tag_Theme1_idx` (`Theme_idTheme` ASC) VISIBLE,
  CONSTRAINT `fk_Tag_Theme1`
    FOREIGN KEY (`Theme_idTheme`)
    REFERENCES `TripBook`.`Theme` (`idTheme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`CountryTag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`CountryTag` (
  `CountryId` INT NOT NULL,
  `TagId` INT NOT NULL,
  PRIMARY KEY (`CountryId`, `TagId`),
  INDEX `fk_Country_has_Tag_Tag1_idx` (`TagId` ASC) VISIBLE,
  INDEX `fk_Country_has_Tag_Country1_idx` (`CountryId` ASC) VISIBLE,
  CONSTRAINT `fk_Country_has_Tag_Country1`
    FOREIGN KEY (`CountryId`)
    REFERENCES `TripBook`.`Country` (`idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Country_has_Tag_Tag1`
    FOREIGN KEY (`TagId`)
    REFERENCES `TripBook`.`Tag` (`idTag`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`ThemeCountry`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`ThemeCountry` (
  `ThemeId` INT NOT NULL,
  `CountryId` INT NOT NULL,
  PRIMARY KEY (`ThemeId`, `CountryId`),
  INDEX `fk_Theme_has_Country_Country1_idx` (`CountryId` ASC) VISIBLE,
  INDEX `fk_Theme_has_Country_Theme1_idx` (`ThemeId` ASC) VISIBLE,
  CONSTRAINT `fk_Theme_has_Country_Theme1`
    FOREIGN KEY (`ThemeId`)
    REFERENCES `TripBook`.`Theme` (`idTheme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Theme_has_Country_Country1`
    FOREIGN KEY (`CountryId`)
    REFERENCES `TripBook`.`Country` (`idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
