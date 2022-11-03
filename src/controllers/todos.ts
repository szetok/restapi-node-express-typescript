import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const id = Math.random().toString();
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(id, text);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;

  const todoToUpdate = TODOS.find((todo) => todo.id === todoId);
  if (todoToUpdate) {
    todoToUpdate.text = updatedText;
  } else {
    throw new Error("Could not find todo!");
  }

  res.json({ message: "Updated!", updatedTodo: todoToUpdate });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const deleteIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (deleteIndex < 0) {
    throw new Error("Could not find todo!");
  }
  TODOS.splice(deleteIndex, 1);

  res.json({ message: "Deleted!" });
};
