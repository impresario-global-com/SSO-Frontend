import Logo from './logo'

const Navbar = () => {
  return (
    <nav className="flex items-center lg:py-8 py-4">
      <div className="w-12 lg:w-16 " />
      <Logo className="ml-auto w-24 opacity-50 lg:w-28" />
    </nav>
  )
}

export default Navbar
