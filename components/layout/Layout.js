import Navbar from "../navbar/Navbar"

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className="m-0 p-0">{children}</main>
        </>
    )
}

export default Layout
