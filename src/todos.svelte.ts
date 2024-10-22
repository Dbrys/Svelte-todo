/* eslint-disable prefer-const */
export type Todos = {
    id: number;
    value: string;
    done: boolean;
};

// Global state
let todos: Todos[] = $state([]);

export function getTodos() {
    let completedAllTodos = $derived(todos.length && todos.every((todo) => todo.done))
    let completedTodos = $derived(todos.filter((todo) => todo.done));

    async function addTodo(value: string) {
        const res = await fetch('http://localhost:8080/todos/v1/', {
            method: "POST",
            body: JSON.stringify({ value }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const newTodo = await res.json();
        todos.push(newTodo);
    }

    return {
        get: todos,
        add: addTodo,
        update: (id: number, todo: Todos) => {
            const todoIndex = todos.findIndex((todo) => todo.id === id)
            if (todoIndex !== -1) {
                todos[todoIndex] = todo;
            }
        },
        setTodos: (initialTodos: Todos[]) => todos = initialTodos,
        get todosComplete() { return completedAllTodos },
        get completedTodos() { return completedTodos }
    }
}