/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : chat

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-02-26 10:43:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `chat_content`
-- ----------------------------
DROP TABLE IF EXISTS `chat_content`;
CREATE TABLE `chat_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `people_id` int(11) DEFAULT NULL,
  `chat_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chat_content
-- ----------------------------

-- ----------------------------
-- Table structure for `chat_people`
-- ----------------------------
DROP TABLE IF EXISTS `chat_people`;
CREATE TABLE `chat_people` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `sign_time` varchar(255) DEFAULT NULL,
  `psd` varchar(255) DEFAULT NULL,
  `login_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chat_people
-- ----------------------------
INSERT INTO `chat_people` VALUES ('14', 'miao', '1551064856361', '123', '1551088731979');
INSERT INTO `chat_people` VALUES ('15', 'wang', '1551065130697', '123', '1551065151185');
INSERT INTO `chat_people` VALUES ('16', 'liu', '1551065162809', '123', '1551088438872');
INSERT INTO `chat_people` VALUES ('18', 'wy', '1551088544659', '123', '1551088550482');
