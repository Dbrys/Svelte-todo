/* eslint-disable prefer-const */
export type Todo = {
    id: number;
    value: string;
    done: boolean;
};
export const HOST = 'http://localhost:8080';

// Global state
let todos: Todo[] = $state([]);

export function getTodos() {
    let completedAllTodos = $derived(todos.length && todos.every((todo) => todo.done))
    let completedTodos = $derived(todos.filter((todo) => todo.done));

    async function addTodo(value: string) {
        const res = await fetch(`${HOST}/todos/v1/`, {
            method: "POST",
            body: JSON.stringify({ value }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const newTodo = await res.json();
        todos.push(newTodo);
    }

    async function updateTodo(todo: Todo) {
        const res = await fetch(`${HOST}/todos/v1/update`, {
            method: "POST",
            body: JSON.stringify({ ...todo }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const updatedTodo = await res.json();
        const todoIndex = todos.findIndex((todo) => todo.id === updatedTodo.id)
        if (todoIndex !== -1) {
            todos[todoIndex] = updatedTodo;
        }
    }

    return {
        get: todos.sort((a, b) => (a.id - b.id)),
        add: addTodo,
        update: updateTodo,
        setTodos: (initialTodos: Todo[]) => todos = initialTodos,
        get todosComplete() { return completedAllTodos },
        get completedTodos() { return completedTodos }
    }
}