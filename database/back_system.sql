-- MySQL dump 10.13  Distrib 5.7.44, for Linux (x86_64)
--
-- Host: localhost    Database: back_system
-- ------------------------------------------------------
-- Server version	5.7.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `onlyId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=73 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (72,'蒲公英的约定','/upload/avatar.jpg','21e53cf3-88fb-4a82-99c2-ea8329dafad0');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `set_name` varchar(255) DEFAULT NULL,
  `set_value` varchar(255) DEFAULT NULL,
  `set_text` text,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=1216 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES (1,'轮播图一','/upload/OIP-A.jpg',NULL),(2,'轮播图二','/upload/OIP-B.jpg',NULL),(3,'轮播图三','/upload/OIP-C (1).jpg',NULL),(4,'轮播图四','/upload/OIP-C (2).jpg',NULL),(5,'轮播图五','/upload/OIP-C.jpg',NULL),(6,'轮播图六','/upload/OIP-D.jpg',NULL),(8,'公司介绍',NULL,'<p><span style=\"color: rgb(255, 163, 158); font-size: 16px;\"> &nbsp; &nbsp; &nbsp; &nbsp;爱老婆是一种美德，它体现了对妻子的尊重和爱护。在家庭中，爱老婆的男人会关心妻子的感受，尊重她的意见，支持她的梦想。这样的男人会为妻子创造一个温馨、和谐的家庭环境，让妻子感受到家的温暖和幸福。同时，爱老婆也会让女人更加成熟、有责任感，成为一个值得尊敬和信赖的人。</span></p>'),(9,'公司架构',NULL,'<p><span style=\"color: rgb(255, 163, 158); font-size: 16px;\"> &nbsp; &nbsp; &nbsp; &nbsp;恋爱是一种美好的感觉，它让人心跳加速，让人感到幸福和甜蜜。在恋爱中，人们会体验到各种各样的情感，有欢笑，有泪水，有争吵，也有和解。恋爱让人们更加了解自己，也让人们更加珍惜生命中的每一个瞬间。在恋爱中，我们可以学会如何爱和被爱，学会如何包容和理解别人。恋爱是一段美好的旅程，让人们感受到生命的无限可能和美好。</span></p>'),(10,'公司战略',NULL,'<p><span style=\"color: rgb(255, 163, 158); font-size: 16px;\">恋爱的意义到底是什么?</span></p><p><span style=\"color: rgb(255, 163, 158); font-size: 16px;\">大概就是彼此照亮，成为彼此的避风港和精神寄托，让本就平淡的生活感受到一丝美好。在每一个情绪低落的夜里有个陪伴，在平庸无望的时候发现更好的自己。</span></p>'),(11,'公司高层',NULL,'<p><span style=\"color: rgb(255, 163, 158); font-size: 16px;\">我们会说一个人的生活也很好，又何必去谈恋爱呢?</span></p><p><span style=\"color: rgb(255, 163, 158); font-size: 16px;\">但其实两个人的生活也可以很好，关键是你能不能遇到那个对的人，遇到那个对的人会提高你的生活质量。我们都希望遇到那个对的人，但本来</span></p>'),(7,'公司名称','小朱的公司',NULL);
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `identity` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'蒲公英的约定','$2a$10$jdICO4PC2MMzzPmV5D5X3.78TryOCBSPrV9fDeO1UscLckQQC/hOS','用户','产品部','蒲公英','女','1993466159@qq.com','/upload/avatar.jpg','2024-08-27 01:32:50.560','2025-04-05 19:28:18','0');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'back_system'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-10 21:50:22
