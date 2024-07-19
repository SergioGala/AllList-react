import React from "react";
import TodoList from "./TodoList.jsx";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Virtual diary!</h1>
			<div className="container">
      {/* Renderiza el componente TodoList */}
      <TodoList />
    </div>
			<p>
				Made by{" "}
				<a href="https://github.com/SergioGala">SergioGala</a>, with
				love!
			</p>
		</div>
	);
};

export default Home;
