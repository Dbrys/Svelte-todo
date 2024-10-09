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
    return {
        get get() { return todos },
        add: (value: string) => todos.push({ id: todos.length, value, done: false }),
        get todosComplete() { return completedAllTodos },
        get completedTodos() { return completedTodos }
    }
}