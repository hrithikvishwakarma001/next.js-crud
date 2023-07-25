import connectMongoDB from "@/app/libs/mongodb";
import Todo from "@/app/models/todo.mode";
import { NextResponse } from "next/server";

export async function POST(req) {
	const { title, description } = await req.json();
	await connectMongoDB();
	await Todo.create({ title, description });
	return NextResponse.json({ message: "Todo created" }, { status: 201 });
}
export async function GET() {
	await connectMongoDB();
	const todos = await Todo.find({});
	return NextResponse.json(todos);
}

export async function DELETE(req) {
	const id = req.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await Todo.findByIdAndDelete(id);
	return NextResponse.json({ message: "Todo deleted" });
}

