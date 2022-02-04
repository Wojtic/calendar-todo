# Calendar-Todo (looking for better name)

I've stopped developing this application! (Only todo list and accounts work)

Web aplication for calendar (more like time table) and to-do lists

## API Reference

### Account manipulation

#### Logout

```http
  GET /log_out
```

#### Delete current account

```http
  GET /delete_account
```

#### Register new account

```http
  GET /register
```

| Parameter  | Description                   |
| :--------- | :---------------------------- |
| `email`    | **Required**. User's email    |
| `username` | **Required**. User's username |
| `password` | **Required**. User's password |

#### Login into account

```http
  GET /login
```

| Parameter  | Description                   |
| :--------- | :---------------------------- |
| `email`    | **Required**. User's email    |
| `password` | **Required**. User's password |

#### Delete current account

```http
  GET /delete_account
```

#### Get all groups user is part of

```http
  GET /get_groups
```

### Task manipulation

#### Create new task

```http
  POST /create_task
```

| Parameter     | Description                                                                      |
| :------------ | :------------------------------------------------------------------------------- |
| `owner`       | **Required**. Owner of the task - name of current user or `group-` name of group |
| `name`        | **Required**. Name of the task                                                   |
| `date`        | **Required**. Date since the task is                                             |
| `description` | Description of the task                                                          |

#### Get all tasks for user

Including all groups the user is part of.

```http
  GET /get_tasks
```

#### Remove task by id

```http
  POSt /remove_task
```

| Parameter | Description                  |
| :-------- | :--------------------------- |
| `task_id` | **Required**. Id of the task |
