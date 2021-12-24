CREATE TABLE users(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE user_groups(
    group_name VARCHAR(255) NOT NULL,
    admin INT NOT NULL,
    PRIMARY KEY (group_name)
);
CREATE TABLE user_to_group(
    user_id INT UNSIGNED NOT NULL,
    group_name VARCHAR(255) NOT NULL
);
CREATE TABLE tasks(
    task_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    task_name VARCHAR(255) NOT NULL,
    task_description VARCHAR(255) NULL,
    task_date DATETIME NOT NULL,
    task_creator_user_id INT NULL,
    task_creator_group_name VARCHAR(255) NULL,
    task_creator_subgroup_name VARCHAR(255) NULL,
    PRIMARY KEY (task_id)
);
CREATE TABLE task_to_owner(
    task_id INT UNSIGNED NOT NULL,
    user_id INT NOT NULL
);
CREATE TABLE subgroups(
    subgroup_name VARCHAR(255) NOT NULL,
    parent_group VARCHAR(255) NOT NULL,
    PRIMARY KEY (subgroup_name)
);
CREATE TABLE user_to_subgroup(
    user_id INT NOT NULL,
    subgroup_name VARCHAR(255) NOT NULL
);