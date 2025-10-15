
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(marketing)" | "/" | "/app" | "/(marketing)/contact" | "/creative" | "/enterprise" | "/(marketing)/pitch" | "/productivity" | "/student";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/(marketing)": Record<string, never>;
			"/": Record<string, never>;
			"/app": Record<string, never>;
			"/(marketing)/contact": Record<string, never>;
			"/creative": Record<string, never>;
			"/enterprise": Record<string, never>;
			"/(marketing)/pitch": Record<string, never>;
			"/productivity": Record<string, never>;
			"/student": Record<string, never>
		};
		Pathname(): "/" | "/app" | "/app/" | "/contact" | "/contact/" | "/creative" | "/creative/" | "/enterprise" | "/enterprise/" | "/pitch" | "/pitch/" | "/productivity" | "/productivity/" | "/student" | "/student/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}