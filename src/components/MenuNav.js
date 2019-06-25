import React from "react";
import { NavLink } from "react-router-dom";

const MenuNav = () =>(
  <React.Fragment> 
       <NavLink to="/">Home</NavLink> <br />
          <NavLink to="/about">About</NavLink><br />
          <NavLink to="/projects">projects</NavLink><br />
          <NavLink to="/posts">posts</NavLink><br />
          <NavLink to="/dashboard">dashboard</NavLink><br />
          <NavLink to="/login">login</NavLink><br />
  </React.Fragment>
  )
export default MenuNav;
