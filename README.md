# Task-Board

## Overview

The Task Board Application is a web-based tool designed for project teams to manage tasks effectively. It allows users to add, track, and manage tasks in a dynamic task board interface. The app utilizes jQuery for dynamic updates and Day.js for handling dates. Tasks are organized into columns based on their progress state, and color coding is used to indicate urgency.

## Features

Task Management: Add, edit, and delete tasks.
Progress Tracking: Tasks are displayed in columns representing different progress states.
Color Coding: Tasks are color-coded to indicate their deadline status.
Persistent Storage: Tasks are saved in localStorage and persist across page reloads.
Drag and Drop: Tasks can be dragged and dropped between progress columns.

## Technologies Used

HTML/CSS: Structure and styling of the task board.
jQuery: For DOM manipulation, event handling, and drag-and-drop functionality.
Day.js: For handling and formatting dates.
Bootstrap: For modal dialogs and responsive layout.

# Getting Started

## Prerequisites
A modern web browser.
Internet connection (for loading third-party libraries).
Installation
1. Clone the Repository:
    git clone https://github.com/yourusername/task-board.git
cd task-board
2. Open index.html:

Open the index.html file in a web browser.

# Usage

## Viewing Tasks:

Upon loading the page, the task board will display tasks organized into columns representing their progress state: Not Yet Started, In Progress, and Completed.

## Adding a Task:

Click the "Add Task" button to open the modal dialog.
Enter the task title, description, and due date.

Click "Save" to add the task to the board. The task will be saved in localStorage and displayed in the appropriate column.

## Managing Tasks:

Dragging and Dropping: Drag tasks to different columns to update their progress state. The change will persist after refreshing the page.

Deleting Tasks: Click the delete button on a task to remove it from the board. The task will not be added back after refreshing.

## Color Coding:

Tasks nearing their deadline (within 3 days) are highlighted in yellow, and overdue tasks are highlighted in red. Tasks that are on time have a green color.

Code Structure
index.html: The main HTML file with the structure of the task board and modal dialog.
style.css: Custom CSS for task card color coding.
script.js: JavaScript file containing functionality for adding, deleting, and managing tasks, as well as handling drag-and-drop interactions.

### Links
    https://github.com/mirandarb/Task-Board
    

