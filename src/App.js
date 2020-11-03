import Layout from "./Admin/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContexts";
import Frontpage from "./Components/Frontpage";
import Login from "./Admin/Login";
import PrivateRoute from "./Components/PrivateRoute";
import Dashboard from "./Components/Dashboard";
import GateRoute from "./Components/GateRote";
import AddQuote from "./Components/AddQuote";

function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<Switch>
						<Route exact path="/" component={Frontpage}></Route>
						{/* <Route exact path="/admin/login" component={Login}></Route> */}
						<GateRoute exact path="/admin/login" component={Login} />
						<PrivateRoute exact path="/admin" component={Dashboard} />
						<PrivateRoute exact path="/admin/addquote" component={AddQuote} />
					</Switch>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
