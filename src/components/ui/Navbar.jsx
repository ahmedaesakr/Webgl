const LINKS = ['Home', 'About', 'Projects', 'Skills', 'Contact']

export default function Navbar() {
  return (
    <header className="navbar glass-card">
      <div className="navbar__brand">WebGL Portfolio</div>
      <nav>
        <ul className="navbar__list">
          {LINKS.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`}>{link}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
