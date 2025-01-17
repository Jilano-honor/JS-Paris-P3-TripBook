-- SQLBook: Code
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
-- Table `TripBook`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone_number` INT NOT NULL,
  `born_at` DATETIME NOT NULL,
  `avatar`   VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `Id_UNIQUE` (`id_user` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `Mdp_UNIQUE` (`password` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`Country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`country` (
  `id_country` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `flag` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_country`),
  UNIQUE INDEX `id_country_UNIQUE` (`id_country` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`Trip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`trip` (
  `id_trip` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `start_at` DATETIME NOT NULL,
  `end_at` DATETIME NOT NULL,
  `description` TEXT NOT NULL,
  `photo` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL,
  `country_id` INT NOT NULL,
  PRIMARY KEY (`id_trip`, `user_id`, `country_id`),
  UNIQUE INDEX `id_trip_UNIQUE` (`id_trip` ASC) VISIBLE,
  INDEX `fk_Trip_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_Trip_Country1_idx` (`country_id` ASC) VISIBLE,
  CONSTRAINT `fk_Trip_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `TripBook`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Trip_Country1`
    FOREIGN KEY (`country_id`)
    REFERENCES `TripBook`.`Country` (`id_country`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`Theme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`theme` (
  `id_theme` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `photo` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`id_theme`),
  UNIQUE INDEX `id_theme_UNIQUE` (`id_theme` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`Tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`tag` (
  `id_tag` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `photo` VARCHAR(1000) NOT NULL,
  `theme_id` INT NOT NULL,
  PRIMARY KEY (`id_tag`, `theme_id`),
  UNIQUE INDEX `id_tag_UNIQUE` (`id_tag` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `fk_Tag_Theme1_idx` (`theme_id` ASC) VISIBLE,
  CONSTRAINT `fk_Tag_Theme1`
    FOREIGN KEY (`theme_id`)
    REFERENCES `TripBook`.`Theme` (`id_theme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`CountryTag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`country_tag` (
  `country_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`country_id`, `tag_id`),
  INDEX `fk_Country_has_Tag_Tag1_idx` (`tag_id` ASC) VISIBLE,
  INDEX `fk_Country_has_Tag_Country1_idx` (`country_id` ASC) VISIBLE,
  CONSTRAINT `fk_Country_has_Tag_Country1`
    FOREIGN KEY (`country_id`)
    REFERENCES `TripBook`.`Country` (`id_country`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Country_has_Tag_Tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `TripBook`.`Tag` (`id_tag`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripBook`.`ThemeCountry`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TripBook`.`theme_country` (
  `theme_id` INT NOT NULL,
  `country_id` INT NOT NULL,
  PRIMARY KEY (`theme_id`, `country_id`),
  INDEX `fk_Theme_has_Country_Country1_idx` (`country_id` ASC) VISIBLE,
  INDEX `fk_Theme_has_Country_Theme1_idx` (`theme_id` ASC) VISIBLE,
  CONSTRAINT `fk_Theme_has_Country_Theme1`
    FOREIGN KEY (`theme_id`)
    REFERENCES `TripBook`.`Theme` (`id_theme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Theme_has_Country_Country1`
    FOREIGN KEY (`country_id`)
    REFERENCES `TripBook`.`Country` (`id_country`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
