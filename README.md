# Project Title

A brief description of what this project does and who it's for

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

### Task manipulation

#### Create new task

```http
  GET /create_task
```

| Parameter     | Description                                                                      |
| :------------ | :------------------------------------------------------------------------------- |
| `owner`       | **Required**. Owner of the task - name of current user or `group-` name of group |
| `name`        | **Required**. Name of the task                                                   |
| `date`        | **Required**. Date since the task is                                             |
| `description` | Description of the task                                                          |
