import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { userFromSession } from '@/lib/db';
import LoginForm from './login-form';

export default async function LoginPage(){
  const cookieStore=await cookies();
  const user=await userFromSession(cookieStore.get('qz_session')?.value);
  if(user){
    const city=cookieStore.get('qz_city')?.value;
    const store=cookieStore.get('qz_store')?.value;
    redirect(store&&city?'/':city?'/store':'/city');
  }
  return <LoginForm/>;
}
