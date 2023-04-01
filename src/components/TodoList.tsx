import React, { useEffect, useState } from "react";
import Image from 'next/image'
import router from "next/router";
import { TodoInterface } from '../Interface/todo'
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { selectUserByUsername, addUser, addUserTodo, deleteUserTodo, markTodoAsDone } from "@/redux/slice/usersTodoListSlice";
import { getUsername } from "@/redux/slice/loginSlice";



const TodoList = () => {

    const UserName = useSelector(getUsername);
    if (!UserName.length) {
        router.push({
            pathname: `/`
        });
    }


    const dispatch = useDispatch();
    const [todoList, setTodoList] = useState<TodoInterface[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const user = useSelector((state) => selectUserByUsername(state, UserName));


    useEffect(() => {
        if (!user) { dispatch(addUser(UserName)) }
    }, []);
    useEffect(() => {
        if (user && user.todoList) {
            setTodoList(user.todoList);
        }
    }, [user && user.todoList]);


    const handleAddTodo = (values: TodoInterface) => {

        dispatch(addUserTodo({ name: UserName, todoList: [{ id: nanoid(), title: values.title, date: values.date, isDone: false }] }))
        setShowModal(false);

    };
    const handleDeleteTodo = (id: any) => {

        dispatch(deleteUserTodo({ name: UserName, todoId: id }))

    };
    const handleDoneTodo = (id: any) => {

        dispatch(markTodoAsDone({ name: UserName, todoId: id }))

    };
    const handleCancel = () => {
        setShowModal(false);
      };


    const initialValues = {
        id: '',
        title: '',
        date: '',
        isDone: false,
    };

    const AddTodoListchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        date: Yup.string().required('Due date is required'),
    });

    return (
        <>
            <div className=" lg:mx-[400px] p-4">
                <div className="flex ml-4 justify-between items-center mb-4">
                    <h1 className="text-white text-2xl font-bold">Hey, {UserName}</h1>
                </div>

                {todoList?.map((todo: any) => (
                    <div key={todo.id} className="bg-secondary mx-4 rounded-md mb-4">
                        <div className="flex flex-wrap mb-2 p-2 ml-4">
                            <div className="w-1/2">
                                <button disabled className={`mt-3 p-1 px-3 rounded-full text-sm flex ${todo.isDone ? 'bg-success' : 'bg-slate-200'}`} >
                                    {todo.isDone ? 'DONE' : 'OPEN'}
                                </button>
                            </div>
                            <div className="w-1/2 text-right">
                                <button
                                    className="mt-3 mr-4 ml-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => handleDeleteTodo(todo.id)}
                                >
                                    <Image
                                        src="/icon/delete.svg"
                                        width={16}
                                        height={16}
                                        priority alt={"delete icon"}
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
                            {!todo.isDone && (
                                <div className="w-1/3 text-right">
                                    <button className="bg-submit hover:bg-hoverSubmit text-white py-2 px-4 mt-9 rounded-md" onClick={() => handleDoneTodo(todo.id)}>
                                        DONE
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

            </div>
            {showModal && (
                <Formik initialValues={initialValues} onSubmit={handleAddTodo} validationSchema={AddTodoListchema}  onReset={handleCancel}>
                    <Form >
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

                                />
                                <ErrorMessage name="title" component="div" className="text-red-500 " />

                                <label className="text-white mt-4" htmlFor="date">Due Date</label>
                                <Field
                                    id="date"
                                    name="date"
                                    className="border rounded-md py-2 px-3 "
                                    type="text"
                                    placeholder="Due Date"

                                />
                                <ErrorMessage name="date" component="div" className="text-red-500 " />

                                <button
                                    className="bg-submit hover:bg-hoverSubmit w-36 mx-auto text-white mt-8 mb-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Save
                                </button>
                                <button
                                    className=" hover:bg-secondary w-36 mx-auto text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                                    type="reset"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            )}

            <button className="fixed mr-5 lg:mx-[420px] bottom-4 right-4 bg-green-500 hover:bg-green-600  py-2 px-2 rounded-full shadow" onClick={() => setShowModal(true)} >
            <Image
                src="/icon/add.svg"
                width={40}
                height={40}
                priority alt={"add icon"}
            />
            </button>
        </>
    );
};

export default TodoList;