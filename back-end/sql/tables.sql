CREATE TABLE users(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE user_groups(
    group_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (group_name)
);
CREATE TABLE user_to_group(
    user_id INT UNSIGNED NOT NULL,
    group_name VARCHAR(255) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(group_name) REFERENCES user_groups(group_name)
);
CREATE TABLE tasks(
    task_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    task_name VARCHAR(255) NOT NULL,
    task_description VARCHAR(255) NULL,
    task_date DATETIME NOT NULL,
    PRIMARY KEY (task_id)
);
CREATE TABLE task_to_owner(
    task_id INT UNSIGNED NOT NULL,
    user_id INT NULL,
    group_name VARCHAR(255) NULL,
    FOREIGN KEY(task_id) REFERENCES tasks(task_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(group_name) REFERENCES user_groups(group_name)
);