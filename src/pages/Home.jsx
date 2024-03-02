import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Helmet } from "react-helmet-async";
// -----------------------------------------------
import { auth } from "../Firebase/Confog";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import Lodinge from "../comp/Lodinge";
import ErrorPage from "./ErrorPage";
// -----------------------------------------------

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  // Sending Verificition Email
  const SendMassage = () => {
    // Sending Verificition Email
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
      console.log("Email Verification Sent!");
    });
  };

  // error
  if (error) {
    return (
      <div>
        <ErrorPage/>
      </div>
    );
  }

  // loading
  if (loading) {
    return <Lodinge />;
  }

  // Not sign-in
  if (!user) {
    return (
      <div>
        <Helmet>
          <title>Index Page</title>
          <meta name="description" content="homeeeeeeeeee Page" />
        </Helmet>

        <Header />

        <main>
          <p>
            Please <Link to={"/signIn"}> Sign in</Link> Continue...
          </p>
        </main>

        <Footer />
      </div>
    );
  }

  // sign-in without E-mail Not verification email
  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <Helmet>
            <title>Index Page</title>
            <meta name="description" content="homeeeeeeeeee Page" />
          </Helmet>

          <Header />

          <main>
            <div>
              Wlcome {user.displayName} <span>🧡</span>
              <p>
                please a message has been sent to the e-mail check the message
              </p>
              <button onClick={SendMassage}>Send Massage again</button>
            </div>
          </main>

          <Footer />
        </div>
      );
    }
  }

  // (sign-in & verification email) normling
  if (user) {
    if (user.emailVerified) {
      return (
        <div>
          <Helmet>
            <title>Index Page</title>
            <meta name="description" content="homeeeeeeeeee Page" />
          </Helmet>

          <Header />

          <main>
            <div>
              Wlcome {user.displayName} <span>🧡</span>
            </div>
          </main>

          <Footer />
        </div>
      );
    }
  }
};

export default Home;
