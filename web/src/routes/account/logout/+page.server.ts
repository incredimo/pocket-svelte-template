/// .\src\routes\account\logout\+page.server.ts
// Modules and libraries
import { user_store } from '$lib/stores/user.store';
import { redirect } from '@sveltejs/kit';

// Types and constants
import type { Actions } from '@sveltejs/kit';

/**
 * Clears the autStore and redirects to the home page
 */
export const actions = {
	default: async ({ locals }) => {
		locals.pb.authStore.clear();
		locals.user=null;
		throw redirect(302, '/');
	}
} satisfies Actions;
