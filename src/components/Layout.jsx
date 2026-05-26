import { Link, useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
  const { pathname } = useLocation()

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/books', label: '독서 목록' },
    { to: '/books/new', label: '새 글 쓰기' },
  ]

  return (
    <>
      <header className="header">
        <nav className="nav">
          <Link to="/" className="nav__logo">MyApp</Link>
          <ul className="nav__links">
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={pathname === to ? 'nav__link nav__link--active' : 'nav__link'}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className="container">
        {children}
      </div>
    </>
  )
}

export default Layout
