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
