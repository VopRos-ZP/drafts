import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full m-0 flex justify-center items-center">
        <Link className="p-8 border-2 rounded-2xl text-3xl hover:opacity-25" href="/create">Создать драфт</Link>
    </div>
  );
}
