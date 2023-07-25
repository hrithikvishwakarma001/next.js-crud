"use client";

import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DateFormatter from "./DateFormatter";

const getTodos = async () => {
	try {
		const res = await fetch("http://localhost:3000/api/todos/", {
			cache: "no-cache",
		});

		if (!res.ok) {
			throw new Error("Failed to fetch todos");
		}
		return res.json();
	} catch (error) {
		console.log(error);
	}
};

const TodoList = async () => {
	const router = useRouter();
	const [todos, setTodos] = React.useState([]);

	const setFunction = async () => {
		const data = await getTodos();
		setTodos(data && data.reverse());
	};

	React.useEffect(() => {
		setFunction();
	}, []);

	const handleDelete = async (id) => {
		const confirm = window.confirm(
			"Are you sure you want to delete this todo?"
		);
		if (!confirm) return;
		try {
			const res = await fetch(
				`http://localhost:3000/api/todos?id=${id}`,
				{
					method: "DELETE",
				}
			);
			if (res.ok) {
				setFunction();
			} else {
				throw new Error("Failed to DELETE todos");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<ul
			className='mt-10 bg-gray-200 px-4 py-4
			 max-w-[full] overflow-y-auto overflow-x-hidden hover:opacity-90
			'>
			{todos&&todos.map((todo, index) => (
				<>
					<li
						key={todo._id}
						className='text-base font-black text-black'>
						{todo.title}
					</li>
					<p className='text-sm font-normal text-gray-600'>
						{todo.description}
					</p>
					<div
						className={`flex justify-between items-center py-2 ${
							index !== todos.length - 1 &&
							"border-b border-gray-300 mb-4"
						}`}>
						<DateFormatter timestamp={todo.createdAt} />
						<div>
							<button
								onClick={() =>
									router.push(`/editTodo/${todo._id}`)
								}>
								<FiEdit className='text-xl text-black mr-4' />
							</button>
							<button onClick={() => handleDelete(todo._id)}>
								<RiDeleteBin5Line className='text-xl text-black' />
							</button>
						</div>
					</div>
				</>
			))}
		</ul>
	);
};

export default TodoList;
