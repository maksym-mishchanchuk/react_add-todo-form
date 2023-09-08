import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const preparedTodos:Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: usersFromServer
    .find(({ id }) => id === todo.userId) || null,
}));

// eslint-disable-next-line no-console
console.log(preparedTodos);

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState(preparedTodos);

  const [todoTitle, setTodoTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);

    setHasTitleError(false);
  };

  const handleUSerId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle) {
      setHasTitleError(true);
    }

    if (!hasUserIdError) {
      setHasTitleError(true);
    }

    setVisibleTodos((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        title: todoTitle,
        completed: false,
        userId,
        user: usersFromServer.find(({ id }) => id === userId) || null,
      },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
        action="/api/todos"
        method="POST"
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            onChange={handleChangeTitle}
          />
          <span>{todoTitle}</span>
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUSerId}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
