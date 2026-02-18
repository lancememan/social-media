"use client";
import React, { useState } from 'react'
import Form from "next/form";
import { redirect } from "next/navigation";
import { createClient } from '@/lib/supabase/client';

function Signup() {
  const supabase = createClient();
  const [error, setError] = useState('');

    async function userSignup(formData: FormData) {                
        //get form data and organize into objects for auth and user tables
        const formfields = {
            username: formData.get('username'),                        
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            handle: formData.get('username')            
        };

        const userAuthData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        };

        //check for null values in required fields
        if (userAuthData.email === null || userAuthData.password === null) {
            console.error('Email and password are required for signup.');
            return;
        }
        
        //sign up user in auth table and get user id
        const { data: authData, error: authError } = await supabase.auth.signUp(userAuthData);
        const id = authData?.user?.id;
        
        if (authError) {
            console.error('Error signing up user:', authError);
            setError(authError.message);
            return;
        }
        
        //if signup successful and user id exists, insert user data into users table
        if (id) {
            const { data: userData, error: userError } = await supabase
                    .from('Users')
                    .insert([{
                        id: id,
                        ...formfields
                    }]);
            
            if (userError) {
                console.error('Error inserting user data:', userError);
                setError(userError.message);
                return;
            } else {
                redirect('/auth/login'); //redirect to login page after successful signup                
            }
        }
    }

  return (
        <Form action={userSignup} className="max-w-100">            
            <div className='flex gap-3 mb-1'>
                <div className='w-1/2'>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 sr-only">First Name</label>
                    <input name="first_name" type="text" placeholder="First Name" id="first_name" className="mb-1 p-1.5 w-full rounded-sm bg-amber-50 placeholder-blue-400 outline-blue-600 text-blue-600" required/>                
                </div>
                <div className='w-1/2'>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 sr-only">Last Name</label>
                    <input name="last_name" type="text" placeholder="Last Name" id="last_name" className="mb-1 p-1.5 w-full rounded-sm bg-amber-50 placeholder-blue-400 outline-blue-600 text-blue-600" required/>                
                </div>
            </div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 sr-only">Email</label>
            <input name="email" type="email" placeholder="Email" id="email" className="mb-2 p-1.5 w-full rounded-sm bg-amber-50 placeholder-blue-400 outline-blue-600 text-blue-600" required/>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 sr-only">Username</label>
            <input name="username" type="text" placeholder="Username" id="username" className="mb-2 p-1.5 w-full rounded-sm bg-amber-50 placeholder-blue-400 outline-blue-600 text-blue-600" required/>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 sr-only">Password</label>
            <input name="password" type="password" placeholder="Password" id="password" className="mb-5 p-1.5 w-full rounded-sm bg-amber-50 placeholder-blue-400 outline-blue-600 text-blue-600" required/>
            <button type="submit" className="button bg-blue-600 cursor-pointer py-2 px-8 rounded mx-auto block">Signup</button>
            {error && <div className='error mt-2.5 text-center text-red-500'>{error}</div> }
        </Form>
  )
}

export default Signup