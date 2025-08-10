/*
 Navicat Premium Data Transfer

 Source Server         : 阿里云
 Source Server Type    : MySQL
 Source Server Version : 50744 (5.7.44)
 Source Host           : 8.209.201.239:3306
 Source Schema         : back_system

 Target Server Type    : MySQL
 Target Server Version : 50744 (5.7.44)
 File Encoding         : 65001

 Date: 10/08/2025 21:25:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `onlyId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 73 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES (72, '蒲公英的约定', '/upload/avatar.jpg', '21e53cf3-88fb-4a82-99c2-ea8329dafad0');

-- ----------------------------
-- Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `set_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `set_value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `set_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1216 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of setting
-- ----------------------------
INSERT INTO `setting` VALUES (1, '轮播图一', '/upload/OIP-A.jpg', NULL);
INSERT INTO `setting` VALUES (2, '轮播图二', '/upload/OIP-B.jpg', NULL);
INSERT INTO `setting` VALUES (3, '轮播图三', '/upload/OIP-C (1).jpg', NULL);
INSERT INTO `setting` VALUES (4, '轮播图四', '/upload/OIP-C (2).jpg', NULL);
INSERT INTO `setting` VALUES (5, '轮播图五', '/upload/OIP-C.jpg', NULL);
INSERT INTO `setting` VALUES (6, '轮播图六', '/upload/OIP-D.jpg', NULL);
INSERT INTO `setting` VALUES (8, '公司介绍', NULL, '<p><span style=\"color: rgb(255, 163, 158); font-size: 16px;\"> &nbsp; &nbsp; &nbsp; &nbsp;爱老婆是一种美德，它体现了对妻子的尊重和爱护。在家庭中，爱老婆的男人会关心妻子的感受，尊重她的意见，支持她的梦想。这样的男人会为妻子创造一个温馨、和谐的家庭环境，让妻子感受到家的温暖和幸福。同时，爱老婆也会让女人更加成熟、有责任感，成为一个值得尊敬和信赖的人。</span></p>');
INSERT INTO `setting` VALUES (9, '公司架构', NULL, '<p><span style=\"color: rgb(255, 163, 158); font-size: 16px;\"> &nbsp; &nbsp; &nbsp; &nbsp;恋爱是一种美好的感觉，它让人心跳加速，让人感到幸福和甜蜜。在恋爱中，人们会体验到各种各样的情感，有欢笑，有泪水，有争吵，也有和解。恋爱让人们更加了解自己，也让人们更加珍惜生命中的每一个瞬间。在恋爱中，我们可以学会如何爱和被爱，学会如何包容和理解别人。恋爱是一段美好的旅程，让人们感受到生命的无限可能和美好。</span></p>');
INSERT INTO `setting` VALUES (10, '公司战略', NULL, '<p><span style=\"color: rgb(255, 163, 158); font-size: 16px;\">恋爱的意义到底是什么?</span></p><p><span style=\"color: rgb(255, 163, 158); font-size: 16px;\">大概就是彼此照亮，成为彼此的避风港和精神寄托，让本就平淡的生活感受到一丝美好。在每一个情绪低落的夜里有个陪伴，在平庸无望的时候发现更好的自己。</span></p>');
INSERT INTO `setting` VALUES (11, '公司高层', NULL, '<p><span style=\"color: rgb(255, 163, 158); font-size: 16px;\">我们会说一个人的生活也很好，又何必去谈恋爱呢?</span></p><p><span style=\"color: rgb(255, 163, 158); font-size: 16px;\">但其实两个人的生活也可以很好，关键是你能不能遇到那个对的人，遇到那个对的人会提高你的生活质量。我们都希望遇到那个对的人，但本来</span></p>');
INSERT INTO `setting` VALUES (7, '公司名称', '小朱的公司', NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `identity` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `department` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '蒲公英的约定', '$2a$10$jdICO4PC2MMzzPmV5D5X3.78TryOCBSPrV9fDeO1UscLckQQC/hOS', '用户', '产品部', '蒲公英', '女', '1993466159@qq.com', '/upload/avatar.jpg', '2024-08-27 01:32:50.560', '2025-04-05 19:28:18', '0');

SET FOREIGN_KEY_CHECKS = 1;
