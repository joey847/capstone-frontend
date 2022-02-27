import Navbar from "../navbar/navbar"

function Layout({ children }) {
    return (
        <div className="h-screen w-screen">
            <Navbar />
            <main className="flex justify-center items-center">{children}</main>
        </div>
    )
}

export default Layout
