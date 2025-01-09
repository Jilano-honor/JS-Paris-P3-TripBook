-- Start of adjusted script

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP SCHEMA IF EXISTS `TripBook`;

CREATE SCHEMA IF NOT EXISTS `TripBook` DEFAULT CHARACTER SET utf8 ;
USE `TripBook` ;

-- Table `TripBook`.`User`
CREATE TABLE IF NOT EXISTS `TripBook`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `Password_UNIQUE` (`Password` ASC) VISIBLE)
ENGINE = InnoDB;

-- Table `TripBook`.`Country`
CREATE TABLE IF NOT EXISTS `TripBook`.`Country` (
  `idCountry` INT NOT NULL AUTO_INCREMENT,
  `CountryName` VARCHAR(255) NOT NULL,
  `Description` LONGTEXT NOT NULL,
  `Picture` BLOB NOT NULL,
  PRIMARY KEY (`idCountry`))
ENGINE = InnoDB;

-- Table `TripBook`.`Travel`
CREATE TABLE IF NOT EXISTS `TripBook`.`Travel` (
  `idTravel` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(255) NOT NULL,
  `Description` MEDIUMTEXT NOT NULL,
  `StartDate` DATETIME NOT NULL,
  `EndDate` DATETIME NOT NULL,
  `CountryId` INT NOT NULL,
  `UserId` INT NOT NULL,
  `IsArchived` TINYINT NULL,
  PRIMARY KEY (`idTravel`),
  INDEX `fk_Travel_User_idx` (`UserId` ASC),
  INDEX `fk_Travel_Country_idx` (`CountryId` ASC),
  CONSTRAINT `fk_Travel_User`
    FOREIGN KEY (`UserId`)
    REFERENCES `TripBook`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Travel_Country`
    FOREIGN KEY (`CountryId`)
    REFERENCES `TripBook`.`Country` (`idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Table `TripBook`.`Tag`
CREATE TABLE IF NOT EXISTS `TripBook`.`Tag` (
  `idTag` INT NOT NULL AUTO_INCREMENT,
  `TagName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idTag`))
ENGINE = InnoDB;

-- Table `TripBook`.`CountryTag`
CREATE TABLE IF NOT EXISTS `TripBook`.`CountryTag` (
  `idCountry` INT NOT NULL,
  `idTag` INT NOT NULL,
  PRIMARY KEY (`idCountry`, `idTag`),
  INDEX `fk_Country_has_Tag_Tag1_idx` (`idTag` ASC),
  INDEX `fk_Country_has_Tag_Country1_idx` (`idCountry` ASC),
  CONSTRAINT `fk_Country_has_Tag_Country1`
    FOREIGN KEY (`idCountry`)
    REFERENCES `TripBook`.`Country` (`idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Country_has_Tag_Tag1`
    FOREIGN KEY (`idTag`)
    REFERENCES `TripBook`.`Tag` (`idTag`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- End of adjusted script
