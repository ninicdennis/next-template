import { useEffect, useState } from 'react';
import { MdDarkMode } from 'react-icons/md';
import { FaSun } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import Link from 'next/link';

const Header = () => {
	const [check, setCheck] = useState(false);

	useEffect(() => {
		const theme = localStorage.getItem('theme');
		if (theme === 'light') setCheck(true);
	}, []);

	const NAVIGATION: { title: string; href: string }[] = [
		{ title: 'Home', href: '/home' },
		{ title: 'About', href: '/about' },
	];
	return (
		<div className='sticky top-0 z-50'>
			<div className='relative navbar bg-base-200 justify-between'>
				<div className='navbar-start'>
					<div className='dropdown'>
						<label tabIndex={0} className='btn btn-ghost'>
							<IoMdMenu size={24} />
						</label>
						<ul
							tabIndex={0}
							className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52'
						>
							{NAVIGATION.map(({ title, href }) => (
								<Link className='btn btn-ghost text-left' key={title} href={href}>
									{title}
								</Link>
							))}
						</ul>
					</div>
				</div>
				<div className='navbar-center'>
					<Link className='btn btn-ghost normal-case text-xl' href='/'>
						Next.js Template
					</Link>
				</div>
				<div className='navbar-end'>
					<button
						aria-label='Theme Toggle'
						className='btn btn-square'
						data-set-theme={check ? 'dark' : 'light'}
						data-act-class='ACTIVECLASS'
						onClick={() => setCheck(check ? false : true)}
					>
						{check ? <MdDarkMode size={32} /> : <FaSun size={32} />}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Header;
