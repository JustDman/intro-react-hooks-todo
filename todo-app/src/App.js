import React, { useState, useCallback, useEffect } from "react";

// function App() {
//   return (
//     <div>
//       <h1>Hello World!</h1>
//     </div>
//   );
// }

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

  const formSubmitted = useCallback(
    (event) => {
      event.preventDefault();
      if (!newTodo.trim()) return;
      setTodos([
        {
          id: todos.length ? todos[0].id + 1 : 1,
          content: newTodo,
          done: false,
        },
        ...todos,
      ]);
    }, [newTodo, todos]);

  useEffect(() => {
    console.log("todos", todos);
    setNewTodo("");
  }, [todos]);

  const addTodo = useCallback(
    (todo, index) => (event) => {
      console.log(event.target.checked);
      const newTodos = [...todos];
      newTodos.splice(index, 1, {
        ...todo,
        done: !todo.done,
      });
      setTodos(newTodos);
    }, [todos]);

  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter((otherTodo) => otherTodo !== todo));
  }, [todos]);

  const markAllDone = useCallback(() => {
    let updatedTodos = [];
    if (todos.every(todo => todo.done)) {
    updatedTodos = todos.map(todo => {
      return {
        ...todo,
        done: false,
      };
    });
  } else {
    updatedTodos = todos.map(todo => {
      return {
        ...todo,
        done: true,
      };
    });
  }
    setTodos(updatedTodos);
  }, [todos]);

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newTodo">Enter a Todo:</label>
        <input
          id="newTodo"
          name="newTodo"
          value={newTodo}
          onChange={onNewTodoChange}
        />
        <button>Add Todo</button>
      </form>
      <button onClick={markAllDone}>Mark all as done!</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <label>
              <input
                className="checkbox"
                checked={todo.done}
                type="checkbox"
                onChange={addTodo(todo, index)}
              />
              <span className={todo.done ? "done" : ""}>{todo.content}</span>
              <button onClick={removeTodo(todo)}>Remove Todo</button>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
