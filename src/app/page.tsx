import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full m-0 flex justify-center items-center">
        <Link
            className="p-8 border-2 rounded-2xl text-3xl border-foreground hover:border-blue-700 hover:bg-blue-700 hover:text-foreground"
            href="/create">
            Создать драфт
        </Link>
    </div>
  );
}
