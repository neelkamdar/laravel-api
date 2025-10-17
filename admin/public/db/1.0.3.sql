ALTER TABLE `products` ADD `is_all_tags` INT NULL DEFAULT '0' AFTER `name`;
ALTER TABLE `products` ADD `is_all_categories` INT NULL DEFAULT '0' AFTER `name`;

ALTER TABLE `blogs` ADD `is_all_tags` INT NULL DEFAULT '0' AFTER `meta_title`;
ALTER TABLE `blogs` ADD `is_all_categories` INT NULL DEFAULT '0' AFTER `meta_title`;

ALTER TABLE `products` ADD `is_all_author` INT NULL DEFAULT '0' AFTER `name`;

ALTER TABLE `blogs` DROP INDEX `blogs_slug_unique`;

ALTER TABLE `blogs` CHANGE `slug` `slug` VARCHAR(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL;