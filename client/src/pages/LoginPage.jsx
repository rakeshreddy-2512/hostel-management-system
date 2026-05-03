import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const submit = async (e) => { e.preventDefault(); try { await login(form.email, form.password); navigate('/patients'); } catch { setError('Invalid credentials'); } };
  return <form onSubmit={submit} className='max-w-sm mx-auto bg-white p-6 rounded space-y-3 shadow'>
    <h2 className='text-xl font-semibold'>Login</h2>{error && <p className='text-red-500'>{error}</p>}
    <input className='w-full border p-2' placeholder='Email' onChange={e => setForm({ ...form, email: e.target.value })} />
    <input type='password' className='w-full border p-2' placeholder='Password' onChange={e => setForm({ ...form, password: e.target.value })} />
    <button className='bg-blue-600 text-white px-4 py-2 rounded w-full'>Sign in</button></form>;
}
