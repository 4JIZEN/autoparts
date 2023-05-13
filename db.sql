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
CREATE DATABASE IF NOT EXISTS `autoparts` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `autoparts`;

-- Dumping structure for table autoparts.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table autoparts.admin: ~1 rows (approximately)
INSERT INTO `admin` (`id`, `email`, `password`) VALUES
	(6, 'admin@autopart', '$2b$10$90LCZgLxItOm3Vml0qo1EuoJ3fSKb9NVPbyf5cLRfAK1MM6WFlsei');

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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table autoparts.carts: ~0 rows (approximately)

-- Dumping structure for table autoparts.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table autoparts.categories: ~3 rows (approximately)
INSERT INTO `categories` (`id`, `title`) VALUES
	(15, 'ผลิตภัณฑ์ดูแลรถ'),
	(16, 'ผ้าเช็ดทำความสะอาด'),
	(17, 'ผ้าเช็ดรถ');

-- Dumping structure for table autoparts.claims
CREATE TABLE IF NOT EXISTS `claims` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `order_no` varchar(100) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table autoparts.claims: ~0 rows (approximately)

-- Dumping structure for table autoparts.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `price` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_orders_users` (`user_id`),
  CONSTRAINT `FK_orders_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10013 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table autoparts.orders: ~0 rows (approximately)

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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table autoparts.order_prods: ~0 rows (approximately)

-- Dumping structure for table autoparts.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `qty` int NOT NULL DEFAULT '0',
  `description` varchar(1000) DEFAULT NULL,
  `image` varchar(2000) NOT NULL,
  `category_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_products_categories` (`category_id`),
  CONSTRAINT `FK_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table autoparts.products: ~6 rows (approximately)
INSERT INTO `products` (`id`, `title`, `price`, `qty`, `description`, `image`, `category_id`, `created_at`, `updated_at`) VALUES
	(5, 'D1 Spec Engine Room Spray Foam Cleaner 650 ml', 79, 999, 'ดีวันสเปค โปร เวิร์ค สเปรย์โฟมทำความห้องเครื่อง ง่ายๆด้วยตัวเอง\r\nช่วยขจัดคราบน้ำมัน จาระบี, คราบสิ่งสกปรกต่างๆ, ที่จับตัวอยู่ในห้องเครื่องของรถยนต์', 'https://siamautoshop.co.th/wp-content/uploads/2022/12/D1-Spec-Engine-Room-Spray-Foam-Cleaner-650-ml-001-1-247x350.png', 15, '2023-05-12 17:13:00', '2023-05-12 17:13:00'),
	(6, 'D1 Spec Foam Spray Multi Surface Cleaner 650 ml โฟมทำความสะอาดเบาะหนัง-เบาะผ้า', 79, 999, 'ทำความสะอาด ขจัดคราบฝุ่นละออง', 'https://siamautoshop.co.th/wp-content/uploads/2022/12/D1-Spec-Foam-Spray-Multi-Surface-Cleaner-650-ml-001-510x722.png', 15, '2023-05-12 17:14:37', '2023-05-12 17:14:37'),
	(7, 'D1 Spec Tire Shine Foam 650 ml สเปรย์โฟมเคลือบเงายางรถยนต์ สูตรกันหมาฉี่', 79, 999, 'ช่วยให้ความเงางามและรักษาเนื้อยางให้ดูเหมือนยางรถใหม่', 'https://siamautoshop.co.th/wp-content/uploads/2022/12/D1-Spec-Tire-Shine-Foam-650-ml-002-510x722.png', 15, '2023-05-12 17:15:14', '2023-05-12 17:15:14'),
	(8, 'ผ้าเช็ดทำความสะอาด ไมโครไฟเบอร์ 200 GSM ขนาด 40×40 ซม.', 69, 999, 'หนา 200 ก./ตร.ม.', 'https://cp.lnwfile.com/_max_images/600/600/sq/6i/ce.jpg', 16, '2023-05-12 17:16:35', '2023-05-12 17:16:35'),
	(9, 'Double Sided Twisted Drying Towel 1200 GSM ผ้าซับน้ำ 2 ด้าน คุณภาพสูง ขนเกลียวพิเศษ', 189, 999, 'Super Soft Scratch Free', 'https://siamautoshop.co.th/wp-content/uploads/2022/12/Double-Sided-Twisted-Drying-Towel-1200-GSM_-1-510x722.png', 17, '2023-05-12 17:17:11', '2023-05-12 17:17:11'),
	(10, 'ผ้าซับน้ำ ผ้าลากน้ำ ไมโครไฟเบอร์ เนื้อกำมะหยี่ 100×200 cm หนา 450 gsm', 210, 1000, 'ขนาด 100×200 cm', 'https://lzd-img-global.slatic.net/g/p/fb18182dd47abb0934609bbe2ca25ac7.jpg_2200x2200q80.jpg_.webp', 17, '2023-05-12 17:20:40', '2023-05-12 17:20:40');

-- Dumping structure for table autoparts.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table autoparts.users: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
