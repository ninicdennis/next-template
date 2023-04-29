import PaddingContainer from '@/components/paddingContainer';
import Link from 'next/link';
import { FaLock } from 'react-icons/fa';
import { BiLogIn } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { supabase } from '@/utils/supabase';
import { toast } from 'react-hot-toast';
import { Session } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

type FormData = {
	email: string;
	password: string;
};

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const LoginPage = ({ session }: { session: Session | null }) => {
	const router = useRouter();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>();

	useEffect(() => {
		if (session !== null) {
			router.push('/');
		}
	}, [session]);

	const onSubmit = async ({ email, password }: FormData) => {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (data.session) {
			toast.success('Logged in!');
		}

		if (error) {
			toast.error(`Error: ${error.message}`);
		}
	};

	return (
		<PaddingContainer padding='lg'>
			<div className='flex justify-center items-center flex-col'>
				<h2 className='font-bold text-black-300 text-4xl mb-8'>Login</h2>
				<div className='card shadow-xl w-full max-w-xl bg-base-200 '>
					<div className='card-body'>
						<form onSubmit={handleSubmit(onSubmit)}>
							<p>Email</p>
							{errors.email && (
								<p role='alert' className='text-error'>
									{errors.email.message || 'Invalid email address'}
								</p>
							)}
							<input
								{...register('email', {
									required: 'Invalid email address',
									pattern: EMAIL_REGEX,
								})}
								aria-invalid={errors.email ? 'true' : 'false'}
								type='text'
								className='input input-bordered w-full max-w-xl mb-4'
							/>
							<p>Password</p>
							{errors.password?.type === 'required' && (
								<p role='alert' className='text-error'>
									Invalid password
								</p>
							)}
							<input
								{...register('password', { required: true })}
								aria-invalid={errors.password ? 'true' : 'false'}
								type='password'
								className='input input-bordered w-full max-w-xl mb-4'
							/>
							<button type='submit' className='btn btn-primary capitalize'>
								Login!
							</button>
						</form>
						<div className='divider m-0' />
						<div className='flex justify-between flex-wrap'>
							<Link className='btn btn-ghost capitalize' href='/auth/register'>
								<BiLogIn size={22} className='mr-2' />
								Register
							</Link>
							<button className='btn btn-ghost capitalize'>
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
