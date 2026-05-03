import { useEffect, useState } from 'react';
import api from '../services/api';
export default function DoctorDashboard(){const [data,setData]=useState({upcoming:[],completedCount:0});useEffect(()=>{api.get('/appointments/doctor/dashboard').then(r=>setData(r.data)).catch(()=>{});},[]);return <div><h2 className='text-2xl font-bold'>Doctor Dashboard</h2><p className='my-2'>Completed appointments: {data.completedCount}</p>{data.upcoming.map(x=><div className='bg-white p-2 mb-2 rounded' key={x._id}>{new Date(x.date).toLocaleString()} - {x.patient?.firstName} {x.patient?.lastName}</div>)}</div>;}
