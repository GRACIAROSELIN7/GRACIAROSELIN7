-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2024 at 11:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `poc`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `type` varchar(100) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `bookeddate` date DEFAULT NULL,
  `contactnumber` int(20) DEFAULT NULL,
  `contactname` varchar(30) DEFAULT NULL,
  `closeddate` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `id` int(30) NOT NULL,
  `servicedBy` text DEFAULT NULL,
  `isclosed` varchar(50) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`type`, `category`, `bookeddate`, `contactnumber`, `contactname`, `closeddate`, `description`, `location`, `id`, `servicedBy`, `isclosed`, `user_id`) VALUES
('dd', 'a/c', '2024-10-07', 0, 'dd', NULL, 'dd', '', 1, NULL, NULL, 0),
('AC Repair', 'a/c', '2024-10-07', 111, '111', NULL, 'TEST', '11.0168445,76.9558321', 2, NULL, NULL, 1),
('AC Repair', 'refrigerator', '2024-10-12', 2147483647, 'raja', NULL, 'TETS', '37.4323716,-121.8993526', 3, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(50) NOT NULL,
  `user_id` int(20) DEFAULT NULL,
  `product_id` int(50) DEFAULT NULL,
  `count` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `count`) VALUES
(0, 1, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `user_id` int(20) NOT NULL,
  `user_name` varchar(200) DEFAULT NULL,
  `user_password` varchar(30) DEFAULT NULL,
  `user_type` int(11) NOT NULL,
  `display_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`user_id`, `user_name`, `user_password`, `user_type`, `display_name`) VALUES
(1, 'rose@gmail.com', '123', 3, 'RJ Electronics');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `booking_id` int(50) DEFAULT NULL,
  `user_id` int(30) DEFAULT NULL,
  `rating` int(30) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`booking_id`, `user_id`, `rating`, `comment`, `created_at`, `id`) VALUES
(123, 123, 5, 'god', '0000-00-00', 1),
(0, 1, 3, 'TESTTS', '2024-10-07', 4),
(0, 1, 1, 'Tes', '2024-10-07', 6),
(0, 1, 1, '', '2024-10-07', 7),
(0, 1, 5, '', '2024-10-07', 8),
(0, 1, 0, '', '2024-10-08', 9),
(0, 1, 0, '', '2024-10-08', 10),
(0, 1, 0, '', '2024-10-08', 11);

-- --------------------------------------------------------

--
-- Table structure for table `shopping`
--

CREATE TABLE `shopping` (
  `id` int(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `price` decimal(11,2) NOT NULL,
  `category` text DEFAULT NULL,
  `user_id` int(20) NOT NULL,
  `img` text NOT NULL,
  `delivery` text NOT NULL,
  `rating` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `tax` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shopping`
--

INSERT INTO `shopping` (`id`, `name`, `price`, `category`, `user_id`, `img`, `delivery`, `rating`, `count`, `tax`) VALUES
(0, 'Samsung TV', 15600.00, 'TV', 0, '', '5Days', 1, 1, 28);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(20) NOT NULL,
  `user_name` varchar(200) DEFAULT NULL,
  `user_password` varchar(30) DEFAULT NULL,
  `user_type` int(11) NOT NULL,
  `display_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_password`, `user_type`, `display_name`) VALUES
(1, 'rose@gmail.com', '123', 3, 'RJ Electronics');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopping`
--
ALTER TABLE `shopping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
