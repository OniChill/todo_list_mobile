import React from 'react';
import { useDispatch } from 'react-redux';
import router from 'next/router';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from 'next/image';
import { LoginInterface } from '@/Interface/login';
import { setUsername } from '../redux/slice/loginSlice';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const initialValues: LoginInterface = {
    username: "",
  };
  const LoginFormSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").test("username", "Username must be at least 8 characters", (value) => {
      return value?.length >= 8;
    }),
  });
  
  const handleNameSubmit = (values: LoginInterface) => {
    dispatch(setUsername(values.username));
    router.push({
      pathname: `/todoList`
    });
    
  };

  return (
    <>
      <div className='flex flex-col h-screen justify-center items-center'>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginFormSchema}
          onSubmit={handleNameSubmit}
        >
              <Form className=' lg:mx-[400px] p-4 text-white'>
                <div className='flex flex-col '>
                  <label className=' mb-2 '>Name</label>
                  <Field className="border bg-secondary lg:w-[200px] shadow-lg rounded-sm p-4 py-2" name="username" placeholder="Enter your name" />
                  <div className=' text-red-500 w-[200px] mt-2' >
                    <ErrorMessage  name="username" />
                  </div>
                </div>
                <button className='flex items-center rounded-sm mt-6 py-2 px-6 bg-success hover:bg-hoverSuccess hover:border ' type="submit">
                  <span className="mr-2">Next</span>
                  <Image
                    src="/icon/arrow.svg"
                    className=""
                    width={16}
                    height={16}
                    priority alt={"icon arrow"}
                  />
                </button>
              </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
