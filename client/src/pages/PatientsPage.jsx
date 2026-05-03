import { useEffect, useState } from 'react';
import api from '../services/api';

export default function PatientsPage(){
  const [patients, setPatients] = useState([]);
  useEffect(()=>{api.get('/patients').then(r=>setPatients(r.data));},[]);
  return <div><h2 className='text-2xl font-bold mb-4'>Patient Records</h2><div className='grid gap-3'>{patients.map(p=><div key={p._id} className='bg-white p-3 rounded shadow'>{p.firstName} {p.lastName} · {p.phone}</div>)}</div></div>
}
