import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { Helmet } from "react-helmet-async";
// -----------------------------------------------
import { auth } from "../../Firebase/Confog";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import Lodinge from "../../comp/Lodinge";
import ErrorPage from "../Error/ErrorPage";
// -----------------Level-3------------------------------
import "./Home.css";
import { useState } from "react";
import Model from "../../comp/shaird/model";
// -----------------------------------------------

const Home = () => {
  // ----------------- Level-2 --------------------------
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

  // ----------------- Level-3 --------------------------
  const [resetPass, serResetPass] = useState(false);
  const closeModel = () => {
    serResetPass(false);
  };

  // ----------------- Level-2 --------------------------
  // error
  if (error) {
    return (
      <div>
        <ErrorPage />
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
          <main className="home">
            {/* optons (filtered data) */}
            <section className="parent-of-btn">
              <button>Newest First</button>
              <button>Oldest First</button>

              <select id="browsers">
                <option value="">All Tasks</option>
                <option value="">completed</option>
                <option value="">Not Completed</option>
              </select>
            </section>

            {/* show all data */}
            <section className="all-tasks">
              <article dir="auto" className="one-task">
                <Link to={"/EditTask"}>
                  <h3>Title</h3>

                  <ul>
                    <li>sub task 1</li>
                    <li>sub task 2</li>
                  </ul>

                  <p className="time">a day ago</p>
                </Link>
              </article>

              <article dir="auto" className="one-task">
                <Link to={"/EditTask"}>
                  <h3>Title</h3>

                  <ul>
                    <li>sub task 1</li>
                    <li>sub task 2</li>
                  </ul>

                  <p className="time">a day ago</p>
                </Link>
              </article>
            </section>

            {/* Add  new task  */}
            <section className="add-new-task">
              <button onClick={() => serResetPass(true)}>
                Add Tew Task <i className="fa-solid fa-plus"></i>
              </button>
            </section>
          </main>

          {/* ----------------- Level-3 -------------------------- */}
          {resetPass && (
            <Model closeModel={closeModel}>
              <form className="home-of-form">
                <input className="inp-of-title" type="text" placeholder="Title Task" required/>
                <div className="flex">
                  <input type="text" placeholder="Items Of Task" />
                  <button onClick={(e)=> e.preventDefault()} className="add-btn-of-items">Add</button>
                </div>
                <button onClick={(e)=> e.preventDefault()}>Submit Task</button>
              </form>
            </Model>
          )}
          <Footer />
        </div>
      );
    }
  }
};

export default Home;
