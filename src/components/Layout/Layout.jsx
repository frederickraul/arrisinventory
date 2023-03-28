import React from "react"
import Footer from "../Footer"
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
class Layout extends React.Component {
  render(){
    return (
      <>
        <header>
            <Navbar/>
            <Sidebar/>
        </header>
        <main className="main-container">{this.props.children}</main>
        <footer>
            <Footer />
        </footer>
      </>
    )
  }
}
export default Layout;