export default function Layout(props){
    if (props.userStatus !== "logged")
    {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Crypto Exchange</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
    
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/signUp">Sign Up</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/about">About Us</a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="/dashboard">Dashboard</a>
                </li>
                </ul>
            </div>
            </nav>
        )
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Crypto Exchange</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/blogs">Blogs</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/about">About Us</a>
            </li>
            </ul>
        </div>
        </nav>
    )

}
