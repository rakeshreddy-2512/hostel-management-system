import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const nav = ['patients', 'appointments', 'doctor', 'billing'];
  return <div className='min-h-screen'>
    <header className='bg-slate-900 text-white p-4 flex justify-between'>
      <h1 className='font-bold'>Hospital Management System</h1>
      <div className='space-x-4'>{nav.map(n => <Link key={n} to={`/${n}`} className='capitalize'>{n}</Link>)}
      {user && <button onClick={logout}>Logout</button>}</div>
    </header>
    <main className='p-6'><Outlet /></main>
  </div>;
}
