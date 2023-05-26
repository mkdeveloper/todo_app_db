import { db, todoTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: number };
}

export const DELETE = async (_: any, { params }: Props) => {
  const id = params.id;
  try {
    if (id) {
      const res = await db
        .delete(todoTable)
        .where(eq(todoTable.id, id))
        .returning();
      return NextResponse.json({
        Message: "Todo Deleted",
      });
    } else {
      throw new Error("ID is Required");
    }
  } catch (error) {
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};
