import { db, todoTable, Todo, NewTodo } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await db.select().from(todoTable);
    return NextResponse.json({
      Todos: res,
    });
  } catch (error) {
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  try {
    if (req.todo) {
      const res = await db
        .insert(todoTable)
        .values({
          todo: req.todo,
          is_done: req.is_done,
        })
        .returning();

      return NextResponse.json({
        Message: "Todo Added",
        Todo: req.todo,
      });
    } else {
      throw new Error("Todo Field is Required");
    }
  } catch (error) {
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};

export const PUT = async (request: NextRequest) => {
  const req = await request.json();
  try {
    if (req.id) {
      const res = await db
        .update(todoTable)
        .set({
          is_done: req.is_done,
        })
        .where(eq(todoTable.id, req.id))
        .returning();

      return NextResponse.json({
        Message: "Todo Updated",
      });
    } else {
      throw new Error("ID Field is Required");
    }
  } catch (error) {
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};
