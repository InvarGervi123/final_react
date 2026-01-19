import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams,Link, useNavigate } from 'react-router-dom';

export default function PhonePage() {
  const [list,setList] = useState([])
  const inputRef = useRef()
  const [query] = useSearchParams();
  const nav = useNavigate();
  
  const onSub = (e) => {
      e.preventDefault();
      const input_val = inputRef.current.value;
      console.log(input_val);
      nav("?s="+input_val)
  }

  useEffect(() => {
    doApi();
  },[query])

  const doApi = async() =>{
    try {
      //?s= אם לא נשלח יהיה גאלקסי
      const queryS = query.get("s") || "galaxy"
      const url = `https://monkeys.co.il/api2/phones/search.php?s=${queryS}`
      setList([])
      const {data} = await axios.get(url);
      console.log(data);
      setList(data);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <form onSubmit={onSub} className='col-md-4'>
        <div className='d-flex mt-3'>
          <input placeholder='search for phones...'  ref={ inputRef } className='form-control' type="search" />
          <button className='btn btn-dark'>Search</button>
        </div>
      </form>
      <div className='row'>
        {list.map(item => {
          return (
            <div className='col-md-6 p-3'>
              <div className='border p-2 shadow-sm'>
                <img src={item.img_url} alt={item.name} height={80} className='float-start me-2' />
                <h4>{item.name}</h4>
                <div>Score:{item.total_score}</div>
                <div>Price:{item.price}</div>
                <Link to={"/phones/"+item.id} className='btn btn-dark mt-2'>More info</Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
