
--
-- 表的结构 `content`
--
 
CREATE TABLE `content` (
  `id` smallint(6) unsigned NOT NULL auto_increment,
  `img` char(20) NOT NULL,
  `height` char(10) NOT NULL,
  `title` varchar(300)  NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;