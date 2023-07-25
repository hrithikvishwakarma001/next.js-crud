import Link from "next/link";
import React from "react";

const Navbar = () => {
	return (
		<div className='flex justify-between items-center py-4 px-10 shadow-md '>
			<Link href='/' className='font-bold'>
				<h1 className='text-3xl font-bold first-letter:text-5xl '>
					Todos
				</h1>
			</Link>
			<Link
				href='/addTodo'
				className='bg-[#fff] disabled:bg-gray-500 inline-flex items-center justify-center rounded py-4 px-10 text-center text-base font-normal text-black hover:bg-opacity-90 lg:px-8 xl:px-10 mt-10'>
				Add todo
			</Link>
		</div>
	);
};

export default Navbar;
