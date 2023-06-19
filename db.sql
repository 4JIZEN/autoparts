-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.32 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for autoparts
CREATE DATABASE IF NOT EXISTS `autoparts` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `autoparts`;

-- Dumping structure for table autoparts.carts
CREATE TABLE IF NOT EXISTS `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `prod_id` int DEFAULT NULL,
  `qty` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_carts_users` (`user_id`),
  KEY `FK_carts_products` (`prod_id`),
  CONSTRAINT `FK_carts_products` FOREIGN KEY (`prod_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FK_carts_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table autoparts.carts: ~0 rows (approximately)

-- Dumping structure for table autoparts.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table autoparts.categories: ~3 rows (approximately)
INSERT INTO `categories` (`id`, `title`) VALUES
	(15, 'ผลิตภัณฑ์ดูแลรถ'),
	(16, 'น้ำมันเครื่อง'),
	(17, 'น็อตล้อ '),
	(20, 'เครื่องยนต์'),
	(21, 'โช๊ค'),
	(23, 'ฝากระโปรง คาร์บอน'),
	(24, 'น้ำหอมในรถ'),
	(25, 'ล้อแม็ก'),
	(26, 'พวงมาลัย'),
	(27, 'เบาะ'),
	(28, 'เบรค');

-- Dumping structure for table autoparts.claims
CREATE TABLE IF NOT EXISTS `claims` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `order_no` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `message` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table autoparts.claims: ~0 rows (approximately)
INSERT INTO `claims` (`id`, `name`, `email`, `product_name`, `order_no`, `message`, `created_at`, `updated_at`) VALUES
	(6, 'apidej klincharoen', 'apidej16@gmail.com', 'TEST', '111111', '111111111111111111', '2023-05-14 16:22:59', '2023-05-14 16:22:59'),
	(7, 'tanutthon', 'tanutthon01@gmail.com', 'น้ำมันเครื่อง', '10017', 'มีปัญหา', '2023-05-30 04:01:47', '2023-05-30 04:01:47'),
	(8, 'tanutthon', 'tanutthon01@gmail.com', 'น้ำยาทำความสะอาด', '10018', 'ชำรุด', '2023-05-30 05:24:02', '2023-05-30 05:24:02');

-- Dumping structure for table autoparts.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `price` int NOT NULL,
  `payment` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment_status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_orders_users` (`user_id`),
  CONSTRAINT `FK_orders_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10016 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table autoparts.orders: ~2 rows (approximately)

-- Dumping structure for table autoparts.order_prods
CREATE TABLE IF NOT EXISTS `order_prods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `prod_id` int NOT NULL,
  `qty` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK__orders` (`order_id`),
  KEY `FK__products` (`prod_id`),
  CONSTRAINT `FK__orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FK__products` FOREIGN KEY (`prod_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table autoparts.order_prods: ~2 rows (approximately)

-- Dumping structure for table autoparts.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `qty` int NOT NULL DEFAULT '0',
  `description` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image` varchar(2000) COLLATE utf8mb4_general_ci NOT NULL,
  `category_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_products_categories` (`category_id`),
  CONSTRAINT `FK_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table autoparts.products: ~27 rows (approximately)
INSERT INTO `products` (`id`, `title`, `price`, `qty`, `description`, `image`, `category_id`, `created_at`, `updated_at`) VALUES
	(5, 'D1 Spec Engine Room Spray Foam Cleaner 650 ml', 79, 999, 'ดีวันสเปค โปร เวิร์ค สเปรย์โฟมทำความห้องเครื่อง ง่ายๆด้วยตัวเอง\r\nช่วยขจัดคราบน้ำมัน จาระบี, คราบสิ่งสกปรกต่างๆ, ที่จับตัวอยู่ในห้องเครื่องของรถยนต์', 'https://siamautoshop.co.th/wp-content/uploads/2022/12/D1-Spec-Engine-Room-Spray-Foam-Cleaner-650-ml-001-1-247x350.png', 15, '2023-05-12 17:13:00', '2023-05-12 17:13:00'),
	(6, 'D1 Spec Foam Spray Multi Surface Cleaner 650 ml โฟมทำความสะอาดเบาะหนัง-เบาะผ้า', 79, 999, 'ทำความสะอาด ขจัดคราบฝุ่นละออง', 'https://siamautoshop.co.th/wp-content/uploads/2022/12/D1-Spec-Foam-Spray-Multi-Surface-Cleaner-650-ml-001-510x722.png', 15, '2023-05-12 17:14:37', '2023-05-12 17:14:37'),
	(7, 'D1 Spec Tire Shine Foam 650 ml สเปรย์โฟมเคลือบเงายางรถยนต์ สูตรกันหมาฉี่', 79, 999, 'ช่วยให้ความเงางามและรักษาเนื้อยางให้ดูเหมือนยางรถใหม่', 'https://siamautoshop.co.th/wp-content/uploads/2022/12/D1-Spec-Tire-Shine-Foam-650-ml-002-510x722.png', 15, '2023-05-12 17:15:14', '2023-05-12 17:15:14'),
	(8, 'น้ำมันเครื่อง voltronic', 1400, 10, 'มีทุกเกรด', 'https://scontent.fbkk12-4.fna.fbcdn.net/v/t39.30808-6/305628211_625782659128532_7534265269934670473_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGiMggqqiJki1-1qYw4amvhnnH77vuTJKeecfvu-5Mkp0FMPBZ5jg2Sb1tFZpZvEnaEuMBV4UUQzuUtb-GAATwR&_nc_ohc=4J40SDFR65gAX-CJ8Th&_nc_ht=scontent.fbkk12-4.fna&oh=00_AfBo7MAnM4LH_dEwyYYexD38yzjjNZ_YwHS9KLvtCSUM-g&oe=6479D98B', 16, '2023-05-12 17:16:35', '2023-05-12 17:16:35'),
	(10, 'น็อตล้อRAY S  แท้', 1450, 1000, 'RAY S แท้มีทุกสีทุกแบบ', 'https://scontent.fbkk13-2.fna.fbcdn.net/v/t39.30808-6/323425808_710989477098638_6192117269961585987_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFH7Ar472Oh6QhrLjlmTGq_8NbaiiaJUsnw1tqKJolSyZxZ__245_hCd_03jqf1NU4-ONpqbZU1bDU42P0TAYjp&_nc_ohc=_oeCVSxBHIEAX8gSCwR&_nc_ht=scontent.fbkk13-2.fna&oh=00_AfB9aEZUjZWhYXLxnmA8apLZtAviMbtIErJDSJ43o7IWng&oe=6479AE6D', 17, '2023-05-12 17:20:40', '2023-05-12 17:20:40'),
	(13, 'ขาย โช็ค GAB SS ตัวท็อป', 17000, 898, 'อุปกรณ์ครบๆ ยกกล่อง ', 'https://www.grandprix.co.th/wp-content/uploads/2020/01/gab_1-12.jpg', 21, '2023-05-29 23:26:42', '2023-05-29 23:26:42'),
	(14, 'H-Drive โช๊คอัพ โช๊คสตรัทปรับเกลียว', 27000, 4, 'H-Drive โช๊คอัพ โช๊คสตรัทปรับเกลียว รถญี่ปุ่น รุ่น S-Spec และ รถยุโรป รุ่น Euro Spec   ตอบสนองการขับขี่ได้ดี เพิ่มความมั่นใจ', 'https://aseancoffee.club/wp-content/uploads/2021/11/H-Drive-Euro-Spec-3-768x398-1.jpg', 21, '2023-05-29 23:29:47', '2023-05-29 23:29:47'),
	(15, 'เครื่องยนต์รหัส B18c', 100000, 3, 'ยกมาจากตู้ญี่ปุ่น', 'https://th.bing.com/th/id/OIP.l8F2SExED-i_lg6cEN79zAHaFj?pid=ImgDet&rs=1', 20, '2023-05-29 23:32:57', '2023-05-29 23:32:57'),
	(16, 'เครื่องยนต์บล็อค K20A', 180000, 3, 'มาจากตู้ญี่ปุ่น', 'https://www.civicesgroup.com/forum/files/2014/02/att_1392986133_1683721.jpg', 20, '2023-05-29 23:35:42', '2023-05-29 23:35:42'),
	(17, 'ฝากระโปรงคาบ่อน1.9 Monza', 15000, 4, 'ฝางานMONZA มีแทบทุกรุ่น', 'https://cf.shopee.co.th/file/b84951a05f885820d1f6d4847fbed78c', 23, '2023-05-29 23:39:51', '2023-05-29 23:39:51'),
	(18, 'ฝากระโปรงคาร์บอนแท้ AKANA', 15000, 2, 'ฝางานAKANA มีแทบทุกรุ่น', 'https://th.bing.com/th/id/OIP.IUo2NzaSiLRqincBxA-aNgAAAA?pid=ImgDet&rs=1', 23, '2023-05-29 23:44:30', '2023-05-29 23:44:30'),
	(19, 'น้ำหอม CALIFORNIA SCENTS เมกา แท้', 150, 20, 'น้ำหอม CALIFORNIA SCENTS เมกา แท้ มีหลายกลิ่น', 'https://scontent.fbkk13-2.fna.fbcdn.net/v/t39.30808-6/349755967_1007858867291820_4315507706925119349_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFjiC2os5Y6AJ8hyxG7nzL70bOtLb67tGzRs60tvru0bAWQfv4kbvwpKq2NNCbQ82TLpVB_ruxTvVs-mfKqyJal&_nc_ohc=j-N9A5ArzhUAX8yOC8h&_nc_ht=scontent.fbkk13-2.fna&oh=00_AfAVoOOb2rwedi3APstvLqJsPhKCD-W7z5Q1Xe6LDr-_ig&oe=647AA5C4', 24, '2023-05-29 23:47:06', '2023-05-29 23:47:06'),
	(20, 'ล้อTC105N', 30000, 2, 'ล้อTC105N   มีตั้งแต่ขอบ15ถึง18ทุกอ๊อฟสั่งได้เลย', 'https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.30808-6/345590700_195653306695244_2247106462516217487_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFvCujEh3PvvAac0NtakZWlfZCSE8YQDG59kJITxhAMbsNAIybtrX85KZmFmkgG9vHOR3r56xcQc2U1H1NE3e3j&_nc_ohc=1TW06iP8nFUAX9_8eJY&_nc_oc=AQlK9cdx274qcJZS3o24rlAZxFHA9OHB-H5Ef6ky_oIbXIZ6yYsboDyPHzWlIE1wWAY&_nc_ht=scontent.fbkk12-3.fna&oh=00_AfBFEGGOHjTLJq4edLZbuFycQYuhBd23O5UUvCNxSMoNCg&oe=647A72F4', 25, '2023-05-29 23:49:25', '2023-05-29 23:49:25'),
	(21, 'ล้อce28   ', 35000, 3, 'ล้อce28   มีตั้งแต่ขอบ15ถึง18ทุกอ๊อฟสั่งได้เลย', 'https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.30808-6/345583483_918204089457519_1667461685229342972_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHXCiFiVbI8uOAYjkjCzcdvu22f1-weD-67bZ_X7B4P7iIxypG5QoTV8ODXHWlvmRCiHnpjGKZ3CNM12Ts_5nHS&_nc_ohc=iqtknG4l0awAX8LRb9C&_nc_ht=scontent.fbkk12-3.fna&oh=00_AfASHi-_hplTmBBiILzTSZDX4b5JvpYADg8Lqy0laXK2vA&oe=647AD999', 25, '2023-05-29 23:50:22', '2023-05-29 23:50:22'),
	(22, 'พวงมาลัย NARDI', 12900, 1, 'พวงมาลัย NARDI มีทุกไซร้', 'https://scontent.fbkk12-5.fna.fbcdn.net/v/t39.30808-6/343435370_777138620639077_8989155653654946121_n.jpg?stp=cp6_dst-jpg&_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGJVTTmrabOQdStX7iwGDKmsEzE5c4KI9OwTMTlzgoj0wL0L-YpaXgnzHRz5RIIMXov9k7ha7Kha9jzuvQCO4uD&_nc_ohc=zp76UouCAv0AX__40xX&_nc_ht=scontent.fbkk12-5.fna&oh=00_AfBfPBdherFX9VGCW_1bei-GtlyVbquE4_TIOLSgZZ7elw&oe=647A72E5', 26, '2023-05-29 23:52:10', '2023-05-29 23:52:10'),
	(23, 'พวงมาลัย ATC RACING', 19000, 2, 'พวงมาลัย ATC RACING มีทุกไซร้', 'https://scontent.fbkk12-1.fna.fbcdn.net/v/t39.30808-6/338203722_1278765062753650_3308315877342388135_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEDZ9fOom2xD7t9B9DpHMnXc4h1Hn1EM71ziHUefUQzvcoZS_4g2Wtr3Rx9M1Yz0Bx3E3mBGYHw1X5ARFgrF2IO&_nc_ohc=TPxUO4rLwWIAX-VvIQS&_nc_ht=scontent.fbkk12-1.fna&oh=00_AfBA_AkpMK5kzb_Z0ZXcpgVQNf9Gppjsy0J_cC-YwxF_OA&oe=647B203F', 26, '2023-05-29 23:53:36', '2023-05-29 23:53:36'),
	(24, 'TE 37', 29000, 5, 'TE 37 มีตั้งแต่ขอบ15ถึง18ทุกอ๊อฟสั่งได้เลย', 'https://scontent.fbkk9-2.fna.fbcdn.net/v/t39.30808-6/338028604_1532699700553103_3070413670671681880_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHtDtla3jVyGvMJuAQOswHkOoiyiW1Brik6iLKJbUGuKQaoFeexn-pPyIM_nl4n5TEV-WU5XoLXaJjfrT6KRJl5&_nc_ohc=0X8k0q6QwEEAX8NfZJJ&_nc_ht=scontent.fbkk9-2.fna&oh=00_AfDXCEtrDeBuid7tKfcSUWKsRCzVY6Ht1IVZaqtyb3pd1Q&oe=647AD70F', 25, '2023-05-29 23:54:50', '2023-05-29 23:54:50'),
	(25, 'RECARO SR-7 SK-100 SI (Japan)', 40000, 1, 'RECARO SR-7 SK-100 SI (Japan) สภาพใหม่ไม่มีรอยขีดขวน', 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t39.30808-6/346101361_1306258383576684_7984158862083112792_n.jpg?stp=cp6_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGxEoZoYUv6dErMSYXnJyUUSULfvs9RRG9JQt--z1FEb0J4gmCTCV3LcxMeCuV1kZHwiDkeEm6uEou92ul-r1dJ&_nc_ohc=ZC5oRpFf-5sAX8yisgh&_nc_ht=scontent.fbkk13-1.fna&oh=00_AfBL3hw50Bk6wirneKD9trCts9J8-5LsBN9MO5NLfL5PQw&oe=64799440', 27, '2023-05-29 23:57:08', '2023-05-29 23:57:08'),
	(26, 'RECARO SR-7 SK-100  (Japan)', 45000, 1, 'RECARO SR-7 SK-100 SI (Japan) สภาพใหม่ไม่มีรอยขีดขวน', 'https://scontent.fbkk12-1.fna.fbcdn.net/v/t39.30808-6/344690121_1008888760096443_8670644748990820322_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHjKdC7b0W8EbBUik357ovnIwQgBwpADucjBCAHCkAO50PXawc0iZ3-tTI9W-G5ABx5FG5ZQ8XfMQAvJrJ5pFzD&_nc_ohc=F9IgC25__eYAX-P8Syr&_nc_ht=scontent.fbkk12-1.fna&oh=00_AfCjSSvpTBUsQgp_Z-5uiy3B-2XgDjO7bHo44tdCiLAqKw&oe=6479C534', 27, '2023-05-29 23:58:26', '2023-05-29 23:58:26'),
	(27, 'รางเบาะ RECARO', 19000, 3, 'รางเบาะ RECARO ใหม่กริบ', 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t39.30808-6/344025118_204532522341661_5155959475704787249_n.jpg?stp=cp6_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEqaf2f5lkF4kkQolhxWt2OUQaKq3RzxS5RBoqrdHPFLu3UuAkblM15jJIkKrBX_ODYHEn71_HHiWdOeTZE25B6&_nc_ohc=w5mSgwNt1iwAX9N_VZV&_nc_ht=scontent.fbkk13-1.fna&oh=00_AfCV7YO69WF9INmPz6hdL7kedGMt0GH0rIUGU-DfoLVRXg&oe=647A0721', 27, '2023-05-29 23:59:30', '2023-05-29 23:59:30'),
	(28, 'เบรค ENDLESS', 80000, 5, 'เบรค ENDLESS มีทุกแบบทุกรถ', 'https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.30808-6/346613056_170476162636335_6564881704220244406_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEUivAp7zjtJ975s-GxGC__sMUaKkZ-4Z2wxRoqRn7hnXzm_vW8451FF7UFw6u5cfRnSARUa_VWTZeqk1grxTnU&_nc_ohc=ebSEopq5o54AX819JQO&_nc_ht=scontent.fbkk12-3.fna&oh=00_AfC0eBFEPS9-uCGS8Bc9jjV2Dm9SzuL7ZFZpzMJx0b_vPg&oe=647959FC', 28, '2023-05-30 00:02:10', '2023-05-30 00:02:10'),
	(29, 'เบรค PROJECT U', 60000, 1, 'เบรค PROJECT U มีทุกแบบทุกรุ่น', 'https://scontent.fbkk12-1.fna.fbcdn.net/v/t39.30808-6/331518287_1274771173136785_3029259990789557593_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFz4ZrYWMTmF8mBibDmHpX9NHdx8Ut59T00d3HxS3n1PbP13GRdq8gjrPkuM9WKD7Gb4XILQ9yjs2nCpATIES-z&_nc_ohc=wLDbsWKjJJsAX8o3_Qg&_nc_ht=scontent.fbkk12-1.fna&oh=00_AfCJCIBQyIi1Pk8lI9Jeaq_t0aUgtMVpM4tTgdLAcXpa3A&oe=647A4409', 28, '2023-05-30 00:05:39', '2023-05-30 00:05:39'),
	(30, 'ฮัปล้อ', 499, 10, 'ฮัปล้อ ช่วยลดการสั่นของล้อ มีหลายสี', 'https://scontent.fbkk13-1.fna.fbcdn.net/v/t39.30808-6/348591920_764389518563705_2633539327912032639_n.jpg?stp=cp6_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGVvfMSISQqPvIUjEs9uyPC0Tz3foAegjvRPPd-gB6CO1QT-7ifCzTsHh_jg5pe-Vg11xnuNzhZbSBlexh5sTdG&_nc_ohc=W80cKhTGyP0AX9qJM4O&_nc_ht=scontent.fbkk13-1.fna&oh=00_AfDxhjpjdJZBdAMM6dJh7n2Yut2JRjJgCEvTCHw5DUsFEw&oe=647AC5CE', 25, '2023-05-30 00:17:36', '2023-05-30 00:17:36'),
	(31, 'เบรค AP RACING', 29000, 1, 'เบรค AP RACING มีทุกแบบทุกรุ่น', 'https://scontent.fbkk12-1.fna.fbcdn.net/v/t39.30808-6/347251721_1320302902166848_269468425445176628_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFw-orHhkh_KNOBwvPRc-7zmIpYNM9HqEWYilg0z0eoRQm5b3qsE8hipjKmbRWtgRQuk3xnXsgDMwEq9JZRDag4&_nc_ohc=9B70TepxTu4AX-4jEE0&_nc_ht=scontent.fbkk12-1.fna&oh=00_AfB_1C-51UEL3ru2rylwOVOt4TmzIYbLnJGccqK6-myVLg&oe=647AC219', 28, '2023-05-30 00:18:48', '2023-05-30 00:18:48'),
	(32, 'คอพับพวงมาลัย WORK', 2999, 2, 'คอพับพวงมาลัย WORK มีหลายแบบ', 'https://scontent.fbkk9-3.fna.fbcdn.net/v/t39.30808-6/343297628_1029166698050317_964832925208773392_n.jpg?stp=cp6_dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFGlq5pPjlnY7JbTtcdh2jZxxlJO7OSU9zHGUk7s5JT3Ndq1tbdgs2WUht__WhUJPVQdCX6oODWO0Yw8rzLUhoa&_nc_ohc=6b88EN5j_zAAX-uM3aw&_nc_ht=scontent.fbkk9-3.fna&oh=00_AfAYyOj_Y4pzeF5witiRHKc8qsqedXn48DDqVvdtDkp3_Q&oe=647A1995', 26, '2023-05-30 00:20:26', '2023-05-30 00:20:26'),
	(33, 'น้ำมันเครื่อง MOTY', 1499, 3, 'น้ำมันเครื่องMOTY มีทุกเกรด ทุกแบบ', 'https://lh3.googleusercontent.com/-GrSpSdgv4Dk/VfAhHvJ8vQI/AAAAAAAAXAE/5e2wkYDxgew/s640-Ic42/12006188_945659915473392_8333955203743900402_n.jpg', 16, '2023-05-30 00:23:22', '2023-05-30 00:23:22'),
	(34, 'น้ํามันเครื่อง LIQUI MOLY', 1899, 1, 'น้ํามันเครื่อง LIQUI MOLY มีทุกเกรด', 'https://f.ptcdn.info/450/054/000/oyuh31p3wLaKdzjkPkK-o.jpg', 16, '2023-05-30 00:25:12', '2023-05-30 00:25:12');

-- Dumping structure for table autoparts.promptpay
CREATE TABLE IF NOT EXISTS `promptpay` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table autoparts.promptpay: ~1 rows (approximately)
INSERT INTO `promptpay` (`id`, `phone`) VALUES
	(6, '0648409132');

-- Dumping structure for table autoparts.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table autoparts.users: ~1 rows (approximately)
INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `phone`, `address`, `password`, `created_at`, `updated_at`, `isAdmin`) VALUES
	(12, 'Admin', 'Admin', 'admin@autoparts', '0600000000', '1', '$2b$10$FVtlLvte5TnjHKVPzO9RReBtqnBOKbSC8XoH8h98aHbsayF9r.bWi', '2023-06-08 15:23:04', '2023-06-08 15:23:04', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
