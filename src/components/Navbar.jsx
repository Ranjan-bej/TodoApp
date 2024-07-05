import React, { useEffect, useState } from 'react'
import {v4 as uuidv4} from "uuid";
const Navbar = () => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);
    const saveTodos = ()=>{
        localStorage.setItem("todos",JSON.stringify(todos));
    }
    useEffect(()=>{
        let localdata = localStorage.getItem("todos")
        if(localdata){
            setTodos(JSON.parse(localdata))
        }
    },[])
    const handleAdd = (e) => {
        if (input === "") {
            alert("Enter a task")
            return;
        }
        setTodos([...todos, {id:uuidv4(), desc: input, isCompleted: false }])
        setInput("")
        saveTodos();
    }
    const handleEdit =(e,id)=>{
        let todo = todos.filter((i)=>{
            return i.id===id;
        })
        setInput(todo[0].desc);
        let newTodos= todos.filter((item)=>{
            return item.id!=id;
        })
        setTodos(newTodos);
        saveTodos();
    }
    const handleDelete =(id)=>{
        let newTodos= todos.filter((item)=>{
            return item.id!=id;
        })
        setTodos(newTodos);
        saveTodos();
    }
    const handleCheck=(e)=>{
        const id = e.target.name;
        let newTodos= todos.filter(item=>{
            if(item.id == id){
                item.isCompleted=!item.isCompleted;
            }
            return item;
        })
        setTodos(newTodos);
        saveTodos();
    }
    return (
        <>
            <nav className='flex justify-around pt-3 mb-20'>
                <div className="logo">
                    <span className='text-blue-200 font-bold text-3xl'>TodoList</span>
                </div>
                <ul className='flex gap-20'>
                    <li className='font-bold text-gray-400 cursor-pointer hover:text-gray-500 transition-all delay-100 ease-in-out '>Home</li>
                    <li className='font-bold text-gray-400 cursor-pointer hover:text-gray-500 transition-all delay-100 ease-in-out '>Tasks</li>
                </ul>
            </nav>
            <div className="addtodo w-11/12 flex gap-10 justify-center">
                <input type="text" placeholder='Enter a todo' className='w-80 h-10 rounded-lg pl-7 bg-transparent border-2 border-gray-500 outline-none text-gray-800' onChange={(e) => { setInput(e.target.value) }} value={input} />
                <button className='h-10 w-16  rounded-lg bg-slate-700 text-gray-400 shadow-[4px_4px_8px_1px_rgba(0,0,0,0.5)]  active:scale-90 ' onClick={handleAdd}>ADD</button>
            </div>
            {/*Todo container */}
            <div className="todos mt-12 h-96 flex flex-col gap-8 items-center pr-32">
                {todos.length==0?<div>No items to display</div>:""}
                {
                todos.map((item,index)=>{
                    return (
                        <div className="todo  px-5  w-1/3 h-10 rounded-lg flex justify-between items-center" key={index}>
                            <input type="checkbox" className='h-6 w-6' value={item.isCompleted} onChange={handleCheck} name={item.id}/>
                            <span className={item.isCompleted?"line-through":""}>
                            <div className="desc ml-2  w-72 mr-6 h-10 flex justify-start items-center pl-4 rounded-lg bg-gray-700 text-gray-300 font-bold border-2 border-gray-600 ">{item.desc}</div>
                            </span>
                            <div className="buttons flex gap-4">
                                <button onClick={()=>handleEdit(item,item.id)} className='h-10 w-16  rounded-lg bg-slate-700 text-gray-400 shadow-[4px_4px_8px_1px_rgba(0,0,0,0.5)]  active:scale-90'>Edit</button>
                                <button name={item.id} onClick={()=>handleDelete(item.id)} className='h-10 w-16  rounded-lg bg-slate-700 text-gray-400 shadow-[4px_4px_8px_1px_rgba(0,0,0,0.5)]  active:scale-90'>Delete</button>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </>
    )
}

export default Navbar