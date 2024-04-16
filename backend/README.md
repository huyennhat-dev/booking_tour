# Database Schema README

This document provides an overview of the tables within the database schema.

## Table: `user`

This table stores information about users of the system.

Columns:
- `id`: Unique identifier for the user.
- `password`: User's password.
- `email`: User's email address.
- `phone_number`: User's phone number.
- `role`: Role of the user in the system (e.g., manager, staff).
- `company_name`: Name of the company (applicable for managers).
- `point_evaluation`: Evaluation score for the user.
- `full_name`: Full name of the user.
- `birth_day`: Date of birth of the user.

## Table: `tour`

This table contains details about tours offered by the company.

Columns:
- `id_tour`: Unique identifier for the tour.
- `id_manager`: Identifier of the manager responsible for the tour.
- `id_staff`: Identifier of the staff assigned to the tour.
- `departure_day`: Date of departure for the tour.
- `departure`: Departure location for the tour.
- `destination`: Destination of the tour.
- `initial_price`: Initial price of the tour.
- `promotional_price`: Promotional price of the tour.
- `promotional`: Indicates if the tour is promotional.
- `introduce`: Description/introduction of the tour.
- `highlight`: Highlights of the tour.
- `insurance`: Indicates if insurance is provided for the tour.
- `bus`, `bicycle`, `taxi`, `plane`, `meal`, `photos`: Indicates if these amenities/services are included in the tour.

## Table: `book_tour`

This table records bookings made by customers for tours.

Columns:
- `id_booked_tour`: Unique identifier for the booked tour.
- `id_tour`: Identifier of the booked tour.
- `id_customer`: Identifier of the customer who booked the tour.
- `guest_number`: Number of guests booked for the tour.
- `date_booked`: Date when the booking was made.
- `complete`: Indicates if the booking is complete.
- `evaluate`: Evaluation/comment provided by the customer.
- `point_evaluate`: Evaluation score provided by the customer.

## Table: `team`

This table manages the assignment of staff to managers.

Columns:
- `id_team`: Unique identifier for the team assignment.
- `id_manager`: Identifier of the manager.
- `id_staff`: Identifier of the staff.
- `work_day`: Number of days the staff has worked under the manager.