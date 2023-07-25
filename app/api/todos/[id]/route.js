import connectMongoDB from "@/app/libs/mongodb";
import Todo from "@/app/models/todo.mode";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
	const { id } = params;
	const { title, description } = await req.json();
	await connectMongoDB();
	await Todo.findByIdAndUpdate(id, { title, description });
	return NextResponse.json({ message: "Todo updated" });
}

export async function GET(req, { params }) {
	const { id } = params;
	await connectMongoDB();
	const todo = await Todo.findById(id);
	return NextResponse.json(todo);
}

