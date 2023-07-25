import EditForm from "@/app/components/EditForm";
const getTodoById = async (id) => {
	try {
		const res = await fetch(`http://localhost:3000/api/todos/${id}`);
		if (!res.ok) {
			throw new Error("Failed to fetch todos");
		}
		return res.json();
	} catch (error) {
		console.log(error);
	}
};
export default async function EditTodo({params}) {
	const {id} = params;
  const todo = await getTodoById(id);
	return <EditForm id={id} data={todo}/>;
}
