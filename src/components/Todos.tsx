import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Image from 'next/image'
import { useRouter } from "next/router";
import { UserInterface } from '../Interface/user'
import { TodoInterface } from '../Interface/todo'
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';



const Todos = () => {

    const [todos, setTodos] = useState<TodoInterface[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [todoTitle, setTodoTitle] = useState<string>("");
    const [todoDate, setTodoDate] = useState<string>("");

    const initialValues = {
        id: '',
        title: '',
        date: '',
        status: false,
    };

    const AddTodoSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        date: Yup.string().required('Due date is required'),
    });

    const handleAddTodo = (values: TodoInterface) => {

        const newTodo = { id: uuid(), title: todoTitle, date: todoDate, status: false };

        console.log(todos)
        setShowModal(false);

    };



    const handleDeleteTodo = (id: any) => {
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
    };

    const handleDoneTodo = (id: any) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    status: !todo.status
                }
            }
            return todo;
        });
        setTodos(updatedTodos);
    };


    return (
        <>
            <div className=" lg:mx-[400px] p-4">
                <div className="flex ml-4 justify-between items-center mb-4">
                    {/* <h1 className="text-white text-2xl font-bold">Hey, {getuser}</h1> */}
                </div>

                {todos.map((todo) => (
                    <div className="bg-secondary mx-4 rounded-md mb-4">
                        <div key={todo.id} className="flex flex-wrap mb-2 p-2 ml-4">
                            <div className="w-1/2">
                                <button disabled className={`mt-3 p-1 px-3 rounded-full text-sm flex ${todo.status ? 'bg-success' : 'bg-slate-200'}`} >
                                    {todo.status ? 'Completed' : 'Incomplete'}
                                </button>
                            </div>
                            <div className="w-1/2 text-right">
                                <button
                                    className="mt-3 mr-4 ml-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => handleDeleteTodo(todo.id)}
                                >
                                    <Image
                                        src="/icon/delete.svg"
                                        className=""
                                        width={16}
                                        height={16}
                                        priority alt={"icon delete"}
                                    />
                                </button>
                            </div>
                            <div className="w-2/3 flex flex-col">
                                <div className="text-white mb-1 mt-2 ">
                                    {todo.title}
                                </div>
                                <span className="text-gray-400 text-sm ">
                                    Due Date :
                                </span>
                                <span className="text-gray-400 text-sm  mb-2">
                                    {todo.date}
                                </span>
                            </div>
                            {!todo.status && (
                                <div className="w-1/3 text-right">
                                    <button className="bg-submit text-white py-2 px-4 mt-9 rounded-md" onClick={() => handleDoneTodo(todo.id)}>
                                        DONE
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

            </div>
            {showModal && (
                <Formik initialValues={initialValues} onSubmit={handleAddTodo} validationSchema={AddTodoSchema}>
                    <form >
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex  justify-center items-center">
                            <div className="bg-primary w-80 flex flex-col p-6 rounded-lg">
                                <h2 className="text-xl text-white font-bold mb-4">New Todo</h2>
                                <label className="text-white" htmlFor="title">Title</label>
                                <Field
                                    id="title"
                                    name="title"
                                    className="border rounded-md py-2 px-3 "
                                    type="text"
                                    placeholder="Title Todo"
                                    value={todoTitle}
                                />
                                <ErrorMessage name="title" component="div" className="text-red-500 " />

                                <label className="text-white mt-4" htmlFor="date">Due Date</label>
                                <Field
                                    id="date"
                                    name="date"
                                    className="border rounded-md py-2 px-3 "
                                    type="text"
                                    placeholder="Due Date"
                                    value={todoDate}
                                />
                                <ErrorMessage name="date" component="div" className="text-red-500 " />

                                <button
                                    className="bg-submit w-36 mx-auto text-white mt-8 mb-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Save
                                </button>
                                <button
                                    className=" hover:bg-secondary w-36 mx-auto text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </Formik>
            )}

            <button className="fixed mr-5 lg:mx-[420px] bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white py-4 px-4 rounded-full shadow" onClick={() => setShowModal(true)} >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>

        </>
    );
};

export default Todos;