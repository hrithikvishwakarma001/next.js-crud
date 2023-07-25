"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditForm() {
	const [state, setState] = useState({
		title: "",
		description: "",
	});
	const router = useRouter();
	const addTodo = async (e) => {
		e.preventDefault();
		if (!state.title || !state.description) {
			return alert("Please add title and description");
		}
		try {
			let res = await fetch("http://localhost:3000/api/todos/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(state),
			});
			if (!res.ok) {
				throw new Error("Failed to add todo");
			}
			router.push("/");
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<div>
			<form
				className='flex   mt-5 flex-col
			'
				onSubmit={addTodo}>
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
					placeholder='Enter title'
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
					placeholder='Enter description'
				/>
				<button
					type='submit'
					className='
					bg-[#fff] disabled:bg-gray-500 inline-flex items-center justify-center py-4 px-2 text-center text-base font-normal text-black hover:bg-opacity-90 lg:px-2 xl:px-6 mt-5 w-[150px]
					'>
					Add
				</button>
			</form>
		</div>
	);
}
