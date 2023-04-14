-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2023 at 04:08 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lotr-vacations`
--
CREATE DATABASE IF NOT EXISTS `lotr-vacations` DEFAULT CHARACTER SET utf16 COLLATE utf16_general_ci;
USE `lotr-vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(4, 1),
(6, 12),
(6, 6),
(4, 6),
(7, 3),
(7, 16),
(7, 14),
(7, 1),
(7, 13),
(4, 13),
(4, 51),
(4, 8),
(4, 52),
(4, 55),
(4, 12),
(4, 3),
(10, 2),
(10, 1),
(10, 54),
(10, 4),
(10, 9),
(10, 10),
(10, 11),
(10, 55),
(11, 4),
(16, 1),
(16, 14),
(16, 4),
(16, 8),
(16, 11),
(16, 55),
(11, 1),
(11, 2),
(11, 13),
(11, 7),
(11, 5),
(11, 53),
(7, 54),
(7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(1024) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(4, 'Assaf', 'Fink', 'assaf@gmail.com', '4a238bf53b72e12549b046ea2935bce9d4e283185764c5a5c3e5d242ffff9b3301910693924564749b6938201a6dd469a99f5fdc2ce9cf67bc069d981e2e724f', 'user'),
(5, 'Dima', 'Blank', 'dimonblank@gmail.com', '6224a6738549ed0bf04149e1d56ceb262d24fb54f117bcce9ff1fca0fc97f3e58be33617e0345e842d7a23bae919eb73a947187fa6cc9ac0da4779ec4fa0a1d1', 'admin'),
(6, 'Alex', 'Boom', 'alexboom@gmail.com', 'c769ae750e3979537d0cc05a59e22f63e9ac2d70024907b5742edc53a5cce65873719780df4e3b4035241fd87e77e73856c33a71820614c9310c72095fd935f1', 'user'),
(7, 'Anna', 'Vex', 'annavex@gmail.com', 'b83e1d77920bf73bacb6a67ff6119f5e31157a72f251be9ab608823e8fba5aaaf4ceebd31df18754f0ba1d4db3d1312859a45fb15f7840fb03b2c2dd370ca94d', 'user'),
(10, 'Adi', 'Hofman', 'adih@gmail.com', 'b4d97c129c888d48a7eb9dece906f7ce06e96416678f70686cfe1b813f325fa6193b3adc9834430e188bee5a11acb3f72696b58b5129536353d82def66b83024', 'user'),
(11, 'James', 'Goldberg', 'jamesg@gmail.com', 'ee30d853693de34619d9e325c26707e2df38f407cccdca53ac5b1aabb1a7ba019e089d0ba2d0a880b3d89b4aaea82d2b8995465d48e7fa79d8afb34465a429b5', 'user'),
(16, 'Yulia', 'Blank', 'Yulia@gmail.com', 'e7a8a1ff575d84dc16610a30a95b62131a18a6dd91159b345a4831623115325130c4e0721c6fc3bc8c4ac8059a3f55b85a58ea610d73c70d10042a3b5fd1b5b4', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `imageName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'The Shire', 'Take a relaxing stroll through the idyllic hobbit villages and sample the local ale. Beware of the occasional ringwraith.', '2023-04-01', '2023-04-11', '1255.50', '8cece3e6-cedc-4e09-9a60-0164b09140a6.jpg'),
(2, 'Rivendell', 'Come for the waterfalls, stay for the endless council meetings!', '2023-04-12', '2023-04-30', '5760.00', 'rivendell.jpg_op2_1400x787.jpg'),
(3, 'Lothlórien', 'Get lost in the golden mallorn trees and pretend you\'re an elf. Don\'t mention the Balrog.', '2023-06-01', '2023-06-06', '899.90', 'lothlórien.jpg_op2_1400x787.jpg'),
(4, 'Isengard', 'Enjoy the stunning views of the Orthanc tower, but watch out for the traitorous wizard who lives there.', '2023-07-13', '2023-07-20', '1760.00', 'isengard.jpg_op2_1400x787.jpg'),
(5, 'Moria', 'Experience the thrill of spelunking in abandoned dwarven mines, just be careful not to wake the Balrog.', '2023-07-28', '2023-08-03', '575.50', 'moria.jpg_op2_1400x787.jpg'),
(6, 'Minas Tirith', 'Climb the seven levels of the White City and enjoy a panoramic view of the Pelennor Fields. Don\'t mind the occasional siege.', '2023-08-10', '2023-08-12', '359.90', 'Minas_Tirith.jpg_op2_1400x787.jpg'),
(7, 'Helm\'s Deep', 'For the ultimate survivalist, spend a night defending the Hornburg against thousands of orcs.', '2023-09-02', '2023-09-09', '99.90', 'halms-deep.jpg'),
(8, 'Fangorn Forest', 'Meet the ancient Ents and help them protect the forest from Saruman\'s industrialization.', '2023-10-05', '2023-10-12', '1035.50', 'fangorn-forest.jpg_op2_1400x787.jpg'),
(9, 'Edoras', 'Visit the capital of Rohan and enjoy the horse culture. Just don\'t mention the time they sided with Isengard.', '2023-11-08', '2023-11-18', '1550.00', 'Edoras.jpg'),
(10, 'Bree', 'Stay in the quaint inn and chat with the locals, just make sure to lock your doors at night.', '2023-12-02', '2023-12-16', '660.00', 'bree.jpg_op2_1400x787.jpg'),
(11, 'Morannon', 'For the thrill-seeker, take a guided tour of Sauron\'s fortress and try to avoid getting captured by his armies.', '2024-01-03', '2024-01-13', '935.50', 'morannon.jpg_op2_1400x787.jpg'),
(12, 'Barad-dûr', 'Visit the home of the Dark Lord himself and experience the terror of Mordor firsthand. Not recommended for the faint of heart.', '2024-01-20', '2024-01-24', '789.00', 'barad-dûr.jpg_op2_1400x787.jpg'),
(13, 'Mordor', 'Looking for a challenging hike? Take on the slopes of Mount Doom and toss in a certain piece of jewelry. Just beware of the Eye of Sauron and his armies of orcs. Don\'t forget your sunscreen!', '2023-05-22', '2023-05-26', '99.00', 'mordor.jpg_op2_1400x787.jpg'),
(14, 'Grey Havens', 'Take a one-way boat ride to the Undying Lands and escape the woes of Middle-earth. No refunds or returns allowed.', '2023-06-14', '2023-06-18', '1024.90', 'grey-havens.jpg_op2_1400x787.jpg'),
(16, 'Mount Doom', 'Take a scenic hike up the fiery mountain and toss in a certain piece of jewelry. Just make sure to bring your own lava-proof footwear.', '2023-07-19', '2023-07-23', '945.00', 'mount-doom.jpg_op2_1400x787.jpg'),
(51, 'Cirith Ungol', 'Hike the treacherous pass and try not to get eaten by Shelob, the giant spider.', '2023-07-18', '2023-07-30', '150.90', 'aaff59f5-b774-499e-92dc-1ac29be859bb.jpg'),
(52, 'The Lonely Mountain', 'Take a journey to Erebor and witness the grandeur of the dwarven kingdom. Just beware of the dragon who hoards its treasures.', '2024-01-09', '2024-01-23', '5980.90', 'a8dd9159-88a1-4e33-8cbb-309b93a7f332.webp'),
(53, 'The Dead Marshes', 'Explore the eerie landscape and witness the souls of the dead. Don\'t follow the lights or you\'ll be lost forever.', '2023-09-13', '2023-09-30', '1580.00', 'fe83b563-92cc-4db7-b8f5-17a7079f5456.webp'),
(54, 'The Prancing Pony Inn', 'Relax and enjoy the hospitality of the friendly innkeeper, Barliman Butterbur. Just keep an eye out for any shady characters who might be lurking around.', '2023-06-15', '2023-06-23', '580.90', '5f203e02-667c-47f2-8da8-0554c4535cd7.jpg'),
(55, 'The Misty Mountains', 'Take a scenic hike through the majestic peaks and discover the secrets of the ancient dwarven cities. Just beware of the goblins and trolls who dwell there.', '2024-02-01', '2024-02-28', '2580.50', '52af453a-266e-4458-9623-2cb031eec961.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
