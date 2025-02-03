import Link from "next/link";

export default function Header() {
    return (
        <div className={"flex justify-between p-4 bg-gray-800 text-white"}>
            <Link className={"text-2xl font-semibold"} href={"/"}>ToDo App</Link>
            <div>
                <Link className={"bg-orange-600 px-2 py-2 rounded"} href={"/screen/AddForm"}>Add Todo</Link>
            </div>
        </div>
    );
}
