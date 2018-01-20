
export const ADMIN = {
    DIR: "/admin",
    ROUTES: [
        {
            title: 'Reviews',
            slug: 'reviews',
            icon: 'fa-heartbeat',
        },          
        {
            title: 'Reviews Categories',
            slug: 'reviews-categories',
            icon: 'fa-book',
        },    	
        {
    		title: 'Articles',
    		slug: 'articles',
    		icon: 'fa-file-alt',
    	},
        {
            title: 'Videos',
            slug: 'videos',
            icon: 'fa-video',
        }, 
        {
            title: 'Playlists',
            slug: 'playlists',
            icon: 'fa-play-circle',
            component: 'Reviews'
        }, 
        {
            title: 'Pages',
            slug: 'pages',
            icon: 'fa-columns',
            component: 'Reviews'
        },
        {
            title: 'Experts',
            slug: 'experts',
            icon: 'fa-user-md',
        },
        {
            title: 'Users',
            slug: 'users',
            icon: 'fa-user',
            roles: ['admin'],
        },          	 
  	
    ],
}