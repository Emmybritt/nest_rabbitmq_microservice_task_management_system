export enum EXCHANGE {
  apiAuth = 'api-auth',
  apiTask = 'api-task',
}

export enum EXCHANGE_TYPE {
  fanout = 'fanout',
  topic = 'topic',
  headers = 'headers',
  direct = 'direct',
}

export enum EXCHANGE_ROUTE {
  // Task
  taskCreated = 'taskCreated',
  taskDeleted = 'taskDeleted',
  taskAssigned = 'taskAssigned',
  taskUpdated = 'taskUpdated',
  taskDue = 'taskDue',

  // User
  userCreated = 'userCreated',
  userDeleted = 'userDeleted',
  userUpdated = 'userUpdated',
}
