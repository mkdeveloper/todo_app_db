import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const DELETE = async (
  _: any,
  { params }: { params: { id: number } }
) => {
  try {
    if (params.id) {
      const client = await db.connect();
      await client.sql`DELETE FROM todos WHERE id = ${params.id}`;
      return NextResponse.json({
        Message: `Todo id:${params.id} is Deleted`,
      });
    } else {
      throw new Error("Id is required");
    }
  } catch (error) {
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};
