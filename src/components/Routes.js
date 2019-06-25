import React from "react";
import { Route, Switch } from "react-router-dom";
// import { Route, Switch ,Link} from "react-router-dom";
import Loadable from "react-loadable";

// import MenuNav from './MenuNav';
// import PropTypes from 'prop-types'; 
const NotFoundPage = () => <h1>NotFoundPage</h1>;
const Home = Loadable({
  loader: () =>
    import( "../page/Home/home"),
  loading: () => null
});

const Routes = () => 
  <div>
   {/* <style>{`
    body {
        background-color:#f1f1f1;
    }

    `}</style> */}
 
{/* <MenuNav /> */}
      <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/topic/:id" component={Topics} /> */}
          <Route component={NotFoundPage} />
      </Switch>
  {/* <FooterCom /> */}
  </div>
 

export default Routes