# Database Schema

This directory contains the database schema for the project.

## Files

- `V1__initial_schema.sql`: The SQL script to create the initial database schema.
- `schema.dbml`: A DBML (Database Markup Language) file that defines the database schema. This can be used with tools like `dbdiagram.io` to visualize the schema.

## Schema Overview

The database is designed to store information about users, their diary entries, and the comic strips generated from those entries.

### Core Tables

- **users**: Stores user information, including email, password, and profile details.
- **diaries**: Contains the user's diary entries, including a title and content.
- **stories**: Represents a comic strip generated from a diary entry. Each story has a version number and a status.
- **story_panels**: Each story is divided into panels, and this table stores the text and image prompt for each panel.
- **images**: Stores the URL and metadata for the generated images in each story panel.

### Supporting Tables

- **characters**: Stores characters created by users.
- **styles**: Defines different art styles for the comic strips.
- **genres**: Defines different genres for the stories.
- **storylines**: Allows users to group diaries into storylines.
- **user_default_settings**: Stores a user's default settings for character, style, and genre.
- **generations**: Logs the generation process for stories, panels, and images.

## Entity-Relationship Diagram

The relationships between the tables are defined in the `schema.dbml` file. You can use a tool like [dbdiagram.io](https://dbdiagram.io) to visualize the ER diagram by pasting the contents of `schema.dbml`.
