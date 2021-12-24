-- @BLOCK
select *
from users;
-- @BLOCK
SHOW TABLES;
-- @BLOCK
SELECT task_name,
    task_description,
    task_date
FROM tasks
    INNER JOIN task_to_owner ON tasks.task_id = task_to_owner.task_id
WHERE user_id = 2;
-- @BLOCK
SELECT *
FROM tasks;
-- @BLOCK
SELECT *
FROM task_to_owner;
-- @BLOCK
SELECT *
FROM user_groups;
-- @BLOCK
DELETE FROM tasks
WHERE task_id = 1;
-- @BLOCK
TRUNCATE table users;
-- @BLOCK
TRUNCATE TABLE tasks;
-- @BLOCK
TRUNCATE TABLE task_to_owner;
-- @BLOCK
TRUNCATE TABLE tasks;
-- @BLOCK
TRUNCATE TABLE task_to_owner;
-- @BLOCK
DROP TABLE tasks;
-- @BLOCK
DROP TABLE user_groups;
-- @BLOCK
DROP TABLE user_to_group;
-- @BLOCK
DROP TABLE task_to_owner;
-- @BLOCK
DROP TABLE users;
-- @BLOCK
DROP TABLE subgroups;
-- @BLOCK
DROP TABLE user_to_subgroup;