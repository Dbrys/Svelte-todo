type Todos = {
    id: number;
    value: string;
    done: boolean;
};
export function createTodos() {
    const todos: Todos[] = $state([]);

    return {
        get get() { return todos },
        add: (value: string) => todos.push({ id: todos.length, value, done: false })
    }
}