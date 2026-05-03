import { useEffect, useState } from 'react';
import api from '../services/api';
export default function BillingPage(){const [bills,setBills]=useState([]);useEffect(()=>{api.get('/billing').then(r=>setBills(r.data));},[]);return <div><h2 className='text-2xl font-bold mb-4'>Billing Management</h2>{bills.map(b=><div key={b._id} className='bg-white p-3 mb-2 rounded shadow'>Total: ${b.totalAmount} | Paid: ${b.paidAmount} | {b.paymentStatus}</div>)}</div>;}
