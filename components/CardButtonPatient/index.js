export default function index({title, imagen}) {
    return (
        <>
        <button className="bg-white hover:bg-light-blue text-plover-blue font-normal m-2 py-2 px-4 border-2 border-plover-blue rounded shadow">
            {title}
        </button>

        <button className="bg-white hover:bg-light-blue text-plover-blue font-normal text-center m-2 py-2 px-4 border-2 border-plover-blue rounded shadow w-8 h-8">
            {imagen}
        </button>
    </>
    )
}
