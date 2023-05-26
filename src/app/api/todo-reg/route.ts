import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const client = await db.connect();

    const data = await client.sql`SELECT * FROM todos`;
    console.log(data);
    return NextResponse.json({
      Todo_Data: data,
    });
  } catch (error) {
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const req = await request.json();
    if (req) {
      const client = await db.connect();
      await client.sql`INSERT INTO todos(todo) VALUES (${req.todo})`;
      return NextResponse.json({
        Message: "Todo Added",
        Todo: req.todo,
      });
    } else {
      throw new Error("Todo field is empty");
    }
  } catch (error) {
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};

// UPDATE todos
// SET is_done=true
// WHERE id = 2;

export const PUT = async (request: NextRequest) => {
  try {
    const req = await request.json();
    if (req.id) {
      const client = await db.connect();
      await client.sql`UPDATE todos SET is_done = ${req.completed} WHERE id = ${req.id}`;
      return NextResponse.json({
        Message: "Todo updated",
      });
    } else {
      throw new Error("Id Field is required");
    }
  } catch (error) {
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};
