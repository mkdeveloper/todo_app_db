import { db, todoTable } from "@/lib/drizzle";

const getTodos = async () => {
  const res = await db.select().from(todoTable);
  console.log(res);
  return res;
};

export default async function Home() {
  const todos = await getTodos();
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex flex-col items-center max-w-4xl gap-10">
        <h1>Todo App</h1>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center gap-10"
          >
            <p>Id: {todo.id}</p>
            <p>Todo: {todo.todo}</p>
            <p>Status: {todo.is_done ? "Completed" : "Not Yet"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
