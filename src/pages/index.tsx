import { Inter } from "next/font/google";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';




const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 backgruonds-custom `}>
      
      <div>
        <h1 className="dechel"> Hello Welcome ! </h1>
        <a></a>
      </div>
      <div className='row'>
        <div className='col papa'>
        <Link href={'/auth/register'}>
        <button type="button" className="btn btn-lg ">Register</button>
        </Link>
        </div>
        <div className='col mama'>
        <Link href={'/auth/login'}>
          <button type="button" className="btn btn-lg">Login</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
