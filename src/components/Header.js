import Link from "next/link";

export default function Header() {
  return (
    <header className="py-4">
      <Link href="/" className="text-2xl font-bold text-gray-800">
        DevsBoards
      </Link>
    </header>
  );
}
