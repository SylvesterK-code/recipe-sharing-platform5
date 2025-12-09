import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";
import AddRecipeForm from "./components/AddRecipeForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import AboutPage from "./components/AboutPage";
import { AuthProvider } from "./components/AuthContext";
import EditRecipe from "./pages/EditRecipe";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main className="py-6 min-h-[calc(100vh-8rem)]">
          {" "}
          {/* Adjust main height as needed */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/addrecipe" element={<AddRecipeForm />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
