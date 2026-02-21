import { Link, useLocation, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/builder', label: '✏️ Builder' },
  { to: '/preview', label: '👁️ Preview' },
] as const;

export function ResumeLayout() {
  const location = useLocation();

  return (
    <div className="resume-app">
      <nav className="resume-nav">
        <Link to="/" className="resume-nav-brand">
          ✨ Resume Builder Pro
        </Link>
        <div className="resume-nav-links">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`resume-nav-link ${location.pathname === to ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
      <main className="resume-main">
        <Outlet />
      </main>
    </div>
  );
}
