import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '@/components/header';
import { useState, useEffect } from 'react';
import { themeChange } from 'theme-change';
import CustomToaster from '@/components/toaster';
import Drawer from '@/components/drawer';
import { supabase } from '../utils/supabase';
import { Session, User } from '@supabase/supabase-js';
import { Lato } from 'next/font/google';

const lato = Lato({
	weight: ['100', '300', '400', '700', '900'],
	subsets: ['latin'],
});

interface CustomProps {
	Component: AppProps['Component'] & {
		session: Session | null;
		user: User | null;
	};
	pageProps: AppProps['pageProps'];
}

const App = ({ Component, pageProps }: CustomProps) => {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);

	// ? Used to fix some hydration issue for themeChange
	useEffect(() => {
		themeChange(false);
	});

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
		supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			if (session === null) {
				setUser(null);
			}
		});

		return () => subscription.unsubscribe();
	}, []);

	return (
		<>
			<style jsx global>{`
				html {
					font-family: ${lato.style.fontFamily};
				}
			`}</style>
			<Head>
				<title>Next.js Template</title>
			</Head>
			<CustomToaster />
			<Drawer
				user={user}
				session={session}
				mainContent={
					<>
						<Header />
						<Component {...pageProps} user={user} session={session} />
					</>
				}
			/>
		</>
	);
};

export default App;
