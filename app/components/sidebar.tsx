import Link from "next/link";

const Sidebar = () => {
  return (
    <aside style={{borderTopRightRadius: "16px", borderBottomRightRadius: "16px", backgroundColor: "#19323C"}} className="w-44 bg-radial h-screen  text-white p-4 fixed">
      <h2 className="text-xl font-bold mb-4">Navigatie</h2>
      <nav>
        <ul className="space-y-3">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/search" className="hover:underline">
              Zoeken
            </Link>
          </li>
          <li>
            <Link href="/platforms" className="hover:underline">
              Platforms
            </Link>
          </li>
          <li>
            <Link href="/franchises" className="hover:underline">
              Franchises
            </Link>
          </li>
          <li>
            <Link href="/characters" className="hover:underline">
              Characters
            </Link>
          </li>
          <li>
            <Link href="/games" className="hover:underline">
              Games
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;