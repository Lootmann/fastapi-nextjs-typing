import Link from "next/link";
import React from "react";
import { Todo } from "../../../typings";

async function fetchTodos() {
  const res = await fetch("http://127.0.0.1:8888/todos");
  const todos: Todo[] = await res.json();
  return todos;
}

async function TodosList() {
  const todos: Todo[] = await fetchTodos();

  return (
    <>
      {todos.map((todo) => (
        <p key={todo.id}>
          <Link href={`/todos/${todo.id}`}>Todo: {todo.id}</Link>
        </p>
      ))}
    </>
  );
}

export default TodosList;
