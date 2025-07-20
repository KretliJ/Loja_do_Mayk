import { NextResponse } from "next/server";
import DatabaseSingleton from "@/lib/database/init";

const db = DatabaseSingleton.getInstance();
const ITEMS_PER_PAGE = 10;

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const offset = (page - 1) * ITEMS_PER_PAGE;

    // Busca os comentários paginados
    const stmt = db.prepare(`
      SELECT * FROM comments 
      ORDER BY id DESC 
      LIMIT ? OFFSET ?
    `);
    const comments = stmt.all(ITEMS_PER_PAGE, offset);

    // Conta o total de comentários para calcular o total de páginas
    const countStmt = db.prepare("SELECT COUNT(*) as total FROM comments");
    const { total } = countStmt.get() as { total: number };
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return NextResponse.json({
      comments,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: ITEMS_PER_PAGE
      }
    });
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}