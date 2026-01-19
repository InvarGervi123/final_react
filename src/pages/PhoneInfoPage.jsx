import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
export default function PhoneInfoPage() {
  const [itemInfo,setItemInfo] = useState({});
  const [loading,setLoading] = useState(false);
  const params = useParams();
  const nav = useNavigate()
  useEffect(() => {
    doApi();
  },[])
  const doApi = async() => {
    try {
      const id = params["id"];
      const url = `https://monkeys.co.il/api2/phones/single.php?id=${id}`
      setLoading(true)
      const {data} = await axios.get(url)
      console.log(data);
      setItemInfo(data[0])
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

    return (
        <div className='container text-center mt-2'>
        {loading ? <h2>Loading...</h2>:
         <>
            <h1>Info about {itemInfo.name} phone</h1>
            <img src={itemInfo.img_url} height={200} alt="phone"/>
            <div>Gpu:{itemInfo.gpu} | cpu: {itemInfo.cpu}</div>
            <div>Camera score: {itemInfo.camera_score}</div>
            <button onClick={() => {
                nav(-1)
            }}>Back to list</button>
         </>
        }
        </div>
    )

}
