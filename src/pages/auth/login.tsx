import PaddingContainer from '@/components/paddingContainer';
import Link from 'next/link';
import { FaLock } from 'react-icons/fa';
import { BiLogIn } from 'react-icons/bi';
const LoginPage = () => {
	return (
		<PaddingContainer padding='lg'>
			<div className='flex justify-center items-center flex-col'>
				<h2 className='font-bold text-black-300 text-4xl mb-8'>Login</h2>
				<div className='card shadow-xl w-full max-w-xl bg-base-200 '>
					<div className='card-body'>
						<p>Email</p>
						<input type='text' className='input input-bordered w-full max-w-xl mb-4' />
						<p>Password</p>
						<input type='password' className='input input-bordered w-full max-w-xl mb-4' />
						<button className='btn btn-primary'>Login!</button>
						<div className='divider m-0' />
						<div className='flex justify-between flex-wrap'>
							<Link className='btn btn-ghost' href='/auth/register'>
								<BiLogIn size={22} className='mr-2' />
								Register
							</Link>
							<button className='btn btn-ghost'>
								<FaLock size={18} className='mr-2' />
								Forgot Password?
							</button>
						</div>
					</div>
				</div>
			</div>
		</PaddingContainer>
	);
};

export default LoginPage;
