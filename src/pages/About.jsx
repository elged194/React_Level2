import Header from "../comp/header";
import Footer from "../comp/Footer";
import Element from "../comp/element";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
// ---------------------------------------------------------
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/Confog";
import Lodinge from "../comp/Lodinge";
// ---------------------------------------------------------

const About = () => {
  // ---------------------------------------------------------
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  // Not Sign-in
  useEffect(() => {
    // Not Sign-in
    if (!user) {
      navigate("/");
    }
    // sign-in without E-mail Not verification email
    if (user && !user.emailVerified) {
      navigate("/");
    }
  });

  // ---------------------------------------------------------

  // error
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  // loading
  if (loading) {
    return <Lodinge />;
  }

  // (sign-in & verification email) normling
  if (user) {
    if (user.emailVerified) {
      return (
        <div>
          <Helmet>
            <title>About Page</title>
            <meta name="description" content="About Page" />
          </Helmet>

          <Header />
          <Element name="About" />
          <Footer />
        </div>
      );
    }
  }
};

export default About;
