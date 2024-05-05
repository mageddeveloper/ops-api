export function userResource(user) {
    const links = [];
    const routes = [
      // { icon: '...', label: 'Profile', to: '/profile' },
      { icon: '...', label: 'Settings', to: '/settings' },
      // Add any other common routes for all users
    ];
  
    if (user.role === 'admin') {
      // Admin-specific links and routes
      links.push(
        { icon: '...', label: 'Admin Dashboard', to: '/admin/dashboard' },
        // Add other admin-specific links
      );
      routes.push(
        { icon: '...', label: 'Users', to: '/admin/users' },
        // Add other admin-specific routes
      );
    } else {
      // Non-admin user links and routes
      links.push(
        { icon: 'sym_r_dashboard', label: 'Dashboard', to: '/' },
        { icon: 'sym_r_touch_app', label: 'Applications', to: '/apps' },
        { icon: 'sym_r_family_history', label: 'Confirmation Flows', to: '/confirmation-flows' },
        { icon: 'sym_r_chat', label: 'Message Templates', to: '/message-templates' },
        { icon: 'sym_r_deployed_code', label: 'Orders', to: '/orders' },
        { icon: 'sym_r_webhook', label: 'Webhooks', to: '/webhooks' },
        { icon: 'sym_r_face', label: 'Profile', to: '/profile' }
      );
    }
  
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      applications: user.applications,
      photo: user.photo,
      locale: user.locale,
      timezone: user.timezone,
      links,
      routes,
      appId: user.currentApp[0]
      // Add any other properties you want to include
    };
  }
  