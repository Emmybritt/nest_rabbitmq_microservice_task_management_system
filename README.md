# Task Management System Backend - NestJS Developer Assessment

## Table of Contents

- [Objective](#objective)
- [Project Overview](#project-overview)
  - [Microservices](#microservices)
  - [RabbitMQ](#rabbitmq)
  - [Distributed Caching (Redis)](#distributed-caching-redis)
  - [Core Functionality](#core-functionality)
  - [Relational Database (Postgres) & ORM](#relational-database-postgres--orm)
  - [Event-Driven Architecture](#event-driven-architecture)
  - [Clean Architecture & OOP](#clean-architecture--oop)
  - [Type-Safe Code](#type-safe-code)
  - [Error Handling](#error-handling)
- [Bonus](#bonus)
- [Submission](#submission)
- [Evaluation Criteria](#evaluation-criteria)

## Objective

The objective of this assessment is to build a Task Management System backend using NestJS. The primary goal is to demonstrate your expertise in various key areas, including microservices, RabbitMQ, distributed caching, relational databases, event-driven architecture, object-oriented programming (OOP), type-safe code, error handling, Clean Architecture, and Domain-Driven Design (DDD).

## Project Overview

### Microservices

1. **User Service:** This service manages user data. Keep this service simple; there's no need for complexity here.

2. **Task Service:** The Task Service manages projects, tasks, deadlines, and notifications. Apply DDD principles to this service to structure it effectively.

### RabbitMQ

Implement inter-service communication using a message queue:

- Tasks and user updates should be communicated between services as domain events.

### Distributed Caching (Redis)

Cache frequently accessed tasks and user profiles. Consider which elements of the domain are frequently accessed and would benefit from caching.

### Core Functionality

- Users should be able to set up projects and assign tasks to other users.
- Users should receive notifications when tasks are assigned to them.
- Users should be notified when tasks are due.

### Relational Database (Postgres) & ORM

- Design a normalized database schema based on the domain models.
- You are free to use TypeORM, Prisma, or any other ORM of your choice.

### Event-Driven Architecture

Implement domain events that are triggered and handled. You can decide which events you consider important for your application.

### Clean Architecture & OOP

Structure your application following the principles of Clean Architecture. Embrace object-oriented principles throughout the design.

### Type-Safe Code

Implement strong typing across the application, ensuring that domain rules are enforced through type constraints.

### Error Handling

Implement error handling based on the domain's possible inconsistencies and violations.

## Bonus

As a bonus, consider:

- Applying a DDD approach, with clear aggregates, entities, and value objects.
- Implementing pagination for tasks listing.

## Submission

Please submit your code repository link using the following form: [Submission Form](https://forms.gle/beAmC8jeLGJA1qQRA)

Include a README file in your repository that provides detailed information about your architectural decisions, especially concerning DDD and Clean Architecture. Additionally, include instructions on setting up and running your project.

## Evaluation Criteria

Your assessment will be evaluated based on the following criteria:

- Adherence to Clean Architecture and DDD principles.
- Code quality, modularity, and readability.
- Proper use of the mentioned technologies.
- Effective domain modeling.
- Robust error handling.

Good luck with your assessment! If you have any questions, feel free to reach out.
