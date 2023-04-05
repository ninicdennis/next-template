import { createContext, useState, useEffect } from 'react';
import { SupabaseClient, AuthChangeEvent, Session } from '@supabase/supabase-js';
import supabase from './supabase';

type SupabaseContextType = {
	supabaseClient: SupabaseClient;
	session: Session | null;
};

export const SupabaseContext = createContext<SupabaseContextType>({
	supabaseClient: supabase,
	session: null,
});

export const SupabaseProvider: React.FC = ({ children }: any) => {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((_: AuthChangeEvent, session: Session | null) => {
			setSession(session);
		});

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	return <SupabaseContext.Provider value={{ supabaseClient: supabase, session }}>{children}</SupabaseContext.Provider>;
};
