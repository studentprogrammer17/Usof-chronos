-- SQLBook: Code
CREATE DATABASE  IF NOT EXISTS `chronos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `chronos`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: chronos
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calendars`
--

DROP TABLE IF EXISTS `calendars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendars`
--

LOCK TABLES `calendars` WRITE;
/*!40000 ALTER TABLE `calendars` DISABLE KEYS */;
INSERT INTO `calendars` VALUES (1,'main',4),(2,'aboba',3),(4,'ваіпавпав',3),(5,'fdfddffd',3),(6,'University',4);
/*!40000 ALTER TABLE `calendars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendars_events`
--

DROP TABLE IF EXISTS `calendars_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendars_events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `calendar_id` int NOT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendars_events`
--

LOCK TABLES `calendars_events` WRITE;
/*!40000 ALTER TABLE `calendars_events` DISABLE KEYS */;
INSERT INTO `calendars_events` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,5),(5,1,6),(6,1,7),(7,1,8),(8,1,9),(9,1,10),(10,1,11),(11,1,12),(12,1,13),(13,1,14),(14,1,15),(15,1,16),(16,1,17),(17,1,18),(18,1,19),(19,1,20),(20,2,21),(21,1,23),(22,2,24),(23,2,25),(24,2,26),(25,4,27);
/*!40000 ALTER TABLE `calendars_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'arrangement'),(2,'reminder'),(3,'task');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `startAt` datetime NOT NULL,
  `endAt` datetime NOT NULL,
  `description` varchar(500) NOT NULL,
  `allDay` tinyint NOT NULL,
  `email` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'aboba','2022-11-14 23:00:00','2022-11-15 23:00:00','mraz',1,'dimadubinin11@gmail.com',1),(2,'new eevent','2022-11-22 23:00:00','2022-11-23 23:00:00','descr',1,'dimadubinin11@gmail.com',1),(3,'new eevent','2022-11-22 23:00:00','2022-11-23 23:00:00','descr',1,'dimadubinin11@gmail.com',1),(4,'aboba','2022-11-14 23:00:00','2022-11-15 23:00:00','hui',1,'dimadubinin11@gmail.com',2),(5,'Aboba','2022-11-14 23:00:00','2022-11-15 23:00:00','hui',1,'dimadubinin11@gmail.com',2),(6,'aboab','2022-11-14 23:00:00','2022-11-15 23:00:00','hui',1,'dimadubinin11@gmail.com',2),(7,'aboab','2022-11-14 23:00:00','2022-11-15 23:00:00','hui',1,'dimadubinin11@gmail.com',2),(8,'aboba','2022-11-14 23:00:00','2022-11-15 23:00:00','hui',1,'dimadubinin11@gmail.com',1),(9,'aboba','2022-11-14 23:00:00','2022-11-15 23:00:00','hhui',1,'dimadubinin11@gmail.com',2),(10,'asd','2022-11-14 23:00:00','2022-11-15 23:00:00','asd',1,'dimadubinin11@gmail.com',1),(11,'asd','2022-11-14 23:00:00','2022-11-15 23:00:00','asd',1,'dimadubinin11@gmail.com',1),(12,'123','2022-11-14 23:00:00','2022-11-15 23:00:00','asdasdasd',1,'dimadubinin11@gmail.com',2),(13,'hui','2022-11-14 23:00:00','2022-11-15 23:00:00','aboba',1,'dimadubinin11@gmail.com',2),(14,'hui','2022-11-15 10:42:00','2022-11-15 23:00:00','aboba',1,'dimadubinin11@gmail.com',2),(16,'Aboba','2022-11-19 04:00:00','2022-11-19 04:30:00','AAAAAAAA',1,'kossyaak@gmail.com',2),(17,'ghghghgh','2022-11-19 04:00:00','2022-11-19 04:30:00','bhjgjhgjh',1,'kossyaak@gmail.com',1),(18,'fdsfds','2022-11-16 00:00:00','2022-11-17 00:00:00','fdsfds',1,'kossyaak@gmail.com',2),(19,'hui','2022-11-16 23:00:00','2022-11-17 23:00:00','chlen',1,'dimadubinin11@gmail.com',2),(20,'fdsfsd','2022-11-16 00:00:00','2022-11-17 00:00:00','sdfdsfds',1,'kossyaak@gmail.com',2),(21,'рпапавп','2022-11-15 00:00:00','2022-11-16 00:00:00','вапвапав',1,'kossyaak@gmail.com',2),(22,'123','2022-11-17 23:00:00','2022-11-18 23:00:00','123',1,'dimadubinin11@gmail.com',2),(23,'123','2022-11-17 23:00:00','2022-11-18 23:00:00','123',1,'dimadubinin11@gmail.com',2),(24,'fdfdfd','2022-11-24 00:00:00','2022-11-25 00:00:00','fdfdfdfd',1,'kossyaak@gmail.com',1),(25,'','2022-11-09 00:00:00','2022-11-10 00:00:00','',1,'kossyaak@gmail.com',1),(26,'dsdsdsds','2022-11-10 00:00:00','2022-11-11 00:00:00','',1,'kossyaak@gmail.com',1);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'user'),(3,'guest');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL DEFAULT 'default_avatar.png',
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_ibfk_1` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'1','1','1','1','1',1),(2,'login','56b7b7284a279678eac6d9fabf0210c0b48bfa1b3d1496d850c6c0a9ce7f62035df4f5fb19906212f8c370410a24ef301c1fb9889fbbe2ec03b12f4803b1aa54','dfas','kingkostyan887@gmail.com','default_avatar.png',1),(3,'kossyaak','56b7b7284a279678eac6d9fabf0210c0b48bfa1b3d1496d850c6c0a9ce7f62035df4f5fb19906212f8c370410a24ef301c1fb9889fbbe2ec03b12f4803b1aa54','kossyaak','kossyaak@gmail.com',',,.jpg',1),(4,'Huesos','a4453c591828c6f5217cc039d87200baebfbebbafc21fc204f257d3925e919b3950767081c1c85433d82cf71a5c3107fc84f6019c2553f03d4f6b3ec3a9cb0b6','Huesos','dimadubinin11@gmail.com','default_avatar.png',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-17 13:45:07
