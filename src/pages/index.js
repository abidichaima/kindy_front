import Blog01 from "./Blog01";
import Blog02 from "./Blog02";
import BlogDetails01 from "./BlogDetails01";
import BlogDetails02 from "./BlogDetails02";
import Collection from "./Collection";
import Contact from "./Contact";
import Create from "./Create";
import Dashboard from "./Dashboard";
import Explore01 from "./Explore01";
import Explore02 from "./Explore02";
import Explore03 from "./Explore03";
import Explore04 from "./Explore04";
import Faqs from "./Faqs";
import HelpCenter from "./HelpCenter";
import Home01 from "./Home01";

import ItemDetails01 from "./ItemDetails01";
import ItemDetails02 from "./ItemDetails02";
import LiveAutions01 from "./LiveAutions01";
import LiveAutions02 from "./LiveAutions02";
import Login from "./Login";
import Ranking from "./Ranking";
import Register from "./Register";
import Wallet from "./Wallet";
import ViewUser from "./viewUser";
import ViewQuestion from "./ViewQuestion"
import Dash from "./Dash";  
import ViewQuizz from "./ViewQuizz";
import Quizz from "./QuizzComp";
import QuizzComp from "./QuizzComp";
import Profile from "./profile";
import QuestionDetail from "./QuestionDetail";
import QuizzDetail from "./QuizzDetail";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SelectedQuizz from "./SelectedQuizz";
import ViewResult from "./ViewResult";
import ResultDetail from "./ResultDetail";
import Quiz from "./Quiz";
import QuizzValide from "./QuizzValide";

const routes = [
  { path: '/', component: <Home01 />},

  { path: '/explore-v1', component: <Explore01 />},
  { path: '/explore-v2', component: <Explore02 />},
  { path: '/explore-v3', component: <Explore03 />},
  { path: '/explore-v4', component: <Explore04 />},
  { path: '/collection', component: <Collection />},
  { path: '/live-auctions-v1', component: <LiveAutions01 />},
  { path: '/live-auctions-v2', component: <LiveAutions02 />},
  { path: '/item-details-v1', component: <ItemDetails01 />},
  { path: '/item-details-v2', component: <ItemDetails02 />},
  { path: '/ranking', component: <Ranking />},
  { path: '/help-center', component: <HelpCenter />},
  { path: '/faqs', component: <Faqs />},
  { path: '/wallet', component: <Wallet />},
  { path: '/login', component: <Login />},
  { path: '/register', component: <Register />},
  { path: '/create', component: <Create />},
  { path: '/blog-v1', component: <Blog01 />},
  { path: '/blog-v2', component: <Blog02 />},
  { path: '/blog-details-v1', component: <BlogDetails01 />},
  { path: '/blog-details-v2', component: <BlogDetails02 />},
  { path: '/contact', component: <Contact />},
  { path: '/users', component: <ViewUser />},
  { path: '/question', component: <ViewQuestion />},
  { path: '/dash', component: <Dash />},
  { path: '/dashboard', component: <Dashboard />},
  { path: '/quizz', component: <ViewQuizz/>},
  { path: '/test', component: <QuizzComp/>},
  { path: '/profile', component: <Profile/>},
  { path: '/questionDetail/:id', component: <QuestionDetail />},
  { path: '/quizzDetail/:id', component: <QuizzDetail />},
  { path: '/results', component: <ViewResult />},
  { path: '/resultDetail/:id', component: <ResultDetail />},
  { path: '/quizz/:id', component: <Quiz />},
  { path: '/quizz/validation/:id', component: <QuizzValide />},




  


  




]

export default routes;