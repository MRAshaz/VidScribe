import Home from "./components/Home"
import { Analytics } from "@vercel/analytics/react"
import "./index.css"

function App() {
    return (
        <>
        <Home/>
        <Analytics/>
        </>
    )
    
}

export default App
