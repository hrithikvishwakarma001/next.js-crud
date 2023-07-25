"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const updateTodo = async (id, newTitleAndDescription) => {
	const confirm = window.confirm("Are you sure you want to edit this todo?");
	if (!confirm) return;
	try {
		const res = await fetch(
			`https://next-js-crud-black.vercel.app/api/todos/${id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTitleAndDescription),
			}
		);
		return res
	} catch (error) {
		console.log(error);
	}
};

export default function EditForm({ id, data }) {
	const [state, setState] = useState({
		title: data?.title || "",
		description: data?.description || "",
	});
	const router = useRouter();
	const editTodo = async (e) => {
		e.preventDefault();
		if (!state.title || !state.description)
			return alert("Please fill in all fields");
		const res = await updateTodo(id, state);
		if (res.ok) {
			router.push("/");
		} else {
			throw new Error("Failed to Edit todos");
		}
	};
	return (
		<div>
			<form
				className='flex   mt-5 flex-col
			'
				onSubmit={editTodo}>
				<label htmlFor=''>Title</label>
				<input
					type='text'
					name='title'
					className='
					py-4 px-10  text-base font-normal text-black hover:bg-opacity-90 lg:px-8 xl:px-10  mr-5 my-2
					outline-none 
					'
					value={state.title}
					onChange={(e) =>
						setState({ ...state, title: e.target.value })
					}
					placeholder='Enter new title'
				/>
				<label htmlFor=''>Description</label>
				<textarea
					type='text'
					name='description'
					rows={1}
					maxLength={100}
					className='
					py-4 px-10  text-base font-normal text-black hover:bg-opacity-90 lg:px-8 xl:px-10 my-2 mr-5
					outline-none 
					'
					value={state.description}
					onChange={(e) =>
						setState({ ...state, description: e.target.value })
					}
					placeholder='Enter new description'
				/>
				<button
					type='submit'
					className='
					bg-[#fff] disabled:bg-gray-500 inline-flex items-center justify-center py-4 px-2 text-center text-base font-normal text-black hover:bg-opacity-90 lg:px-2 xl:px-6 mt-5 w-[150px]
					'>
					Edit
				</button>
			</form>
		</div>
	);
}
