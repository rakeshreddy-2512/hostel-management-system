import { useEffect, useState } from 'react';
import api from '../services/api';
export default function AppointmentsPage(){const [rows,setRows]=useState([]);useEffect(()=>{api.get('/appointments').then(r=>setRows(r.data));},[]);return <div><h2 className='text-2xl font-bold mb-4'>Appointments</h2>{rows.map(a=><div key={a._id} className='bg-white p-3 mb-2 rounded shadow'>{new Date(a.date).toLocaleString()} - {a.status}</div>)}</div>;}
