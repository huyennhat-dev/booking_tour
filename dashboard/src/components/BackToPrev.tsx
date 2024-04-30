import { startTransition } from "react"
import { useNavigate } from "react-router-dom"

const BackToPrev = () => {

    const navigate = useNavigate()
    return (

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div></div>
            <nav>
                <ol className="flex items-center gap-2">
                    <li>
                        <div className="font-medium text-black cursor-pointer hover:text-blue-600" onClick={() => startTransition(() => navigate(-1))}>
                            Quay về trước đó
                        </div>
                    </li>
                </ol>
            </nav>
        </div>
    )
}

export default BackToPrev