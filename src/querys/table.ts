export type TodoFields = {
    id: number,
    title: string,
    status: string,
    created_on: Date,
    due_date: Date
}

export const createTodoTable =
    `CREATE table public.todos (
        id serial primary key,
        title VARCHAR (255) not null,
        status VARCHAR (25) not null,
        created_on TIMESTAMP not null,
        due_date TIMESTAMP not null
    );`

export const selectAllTodos =
    `SELECT * FROM todos`

export const createTodo =
    `INSERT INTO public.todos
    (title, status, created_on, due_date)
    VALUES($1, $2, $3, $4)
    RETURNING *;`

export const getDetailFromId =
    `SELECT *
    FROM public.todos
    WHERE id=$1;`