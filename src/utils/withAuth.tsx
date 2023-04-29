import { supabase } from './supabase';
import { Session, User } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppProps } from 'next/app';

const withAuth = (Component: AppProps['Component']) => {
	const AuthenticatedComponent = () => {
		const router = useRouter();
		const [session, setSession] = useState<Session | null>(null);
		const [user, setUser] = useState<User | null>(null);

		useEffect(() => {
			supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
			supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
			const {
				data: { subscription },
			} = supabase.auth.onAuthStateChange((_event, session) => {
				setSession(session);
				if (session === null) {
					router.push('/auth/login');
					setUser(null);
				}
			});

			return () => subscription.unsubscribe();
		}, []);

		// ? In this case, null would never be rendered, because if the subscription type changes ever, it will auto redirect.
		return session ? <Component session={session} user={user} /> : null;
	};

	return AuthenticatedComponent;
};

export default withAuth;
