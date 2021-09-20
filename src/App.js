import './App.css';
import Allocation from "./components/allocation/allocation";
import Analyze from "./components/analyze/analyze";
import {BrowserRouter, Switch, Route} from "react-router-dom";
function App() {
  return (
    <div className="crypto">
      <header className="w-screen h-16 bg-blue-800">
        <div className="w-3/4 mx-auto h-full">
          <h1 className="text-white pt-4 font-bold">ChartsCrypto</h1>
        </div>

        <div className="mt-10 rounded-lg bg-blue-50 w-3/4 mx-auto p-3">
          <BrowserRouter>
          <Switch>
            <Route exact path ="/" component= {Allocation} />
            <Route exact path ="/analyze" component= {Analyze} />
          </Switch>
           
          </BrowserRouter>
        </div>

      </header>
    </div>
  );
}

export default App;
