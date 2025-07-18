// Lucas: Adicionar funcionalidade de comentários

import { NextResponse } from "next/server";
import DatabaseSingleton from "@/lib/database/init";

const db = DatabaseSingleton.getInstance();

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();

    if (!name || !message) {
      return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
    }

    const createdAt = new Date().toLocaleString("pt-BR");
    const stmt = db.prepare("INSERT INTO comments (name, message, createdAt) VALUES (?, ?, ?)");
    const result = stmt.run(name, message, createdAt);

    return NextResponse.json({
      id: result.lastInsertRowid,
      name,
      message,
      createdAt,
    });
  } catch (error) {
    console.error("Erro ao inserir comentário:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const totalStmt = db.prepare("SELECT COUNT(*) as total FROM comments");
    const { total } = totalStmt.get() as { total: number };
    const totalPages = Math.ceil(total / pageSize);

    const stmt = db.prepare("SELECT * FROM comments ORDER BY id DESC LIMIT ? OFFSET ?");
    const comments = stmt.all(pageSize, offset);

    return NextResponse.json({ comments, totalPages });
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}