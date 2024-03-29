import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { Helmet } from "react-helmet-async";
// ------------------ / Level-2 /-----------------------------
import { auth, db } from "../../Firebase/Confog";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import Lodinge from "../../comp/Lodinge";
import ErrorPage from "../Error/ErrorPage";
// -----------------/ Level-3 /------------------------------
import "./Home.css";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import ModelHome from "./model_of_home";
import AllTasksSecton from "./all_tasks_secton";
// -----------------------------------------------

const Home = () => {
  // ==========================================
  //               / level-2 /
  // ==========================================
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

  // ==========================================
  //  (-Start-) fanction of model  / level-3 /
  // ==========================================
  const [resetPass, serResetPass] = useState(false); //close model
  const [titleTask, settitleTask] = useState(""); //
  const [arr, setArr] = useState([]); // Array of model
  const [inp, setInp] = useState(""); // input of model
  const [subloding, setsubloding] = useState(false); // Lodining of button
  const [showMassage, setshowMassage] = useState(false); // show massage

  //close model
  const closeModel = () => {
    serResetPass(false);
    setArr([]);
    settitleTask("");
  };

  // Add Items Of Button
  const handelAdd = (e) => {
    e.preventDefault();
    // بيلغي تكرار العنصر
    if (!arr.includes(inp)) {
      arr.push(inp);
    }
    setInp("");
  };

  // submit Task Button
  const submitTaskButn = async (e) => {
    e.preventDefault();

    setsubloding(true);

    const taskId = new Date().getTime();
    await setDoc(doc(db, user.uid, `${taskId}`), {
      title: titleTask,
      array: arr,
      id: taskId,
      completed: true,
    });

    setsubloding(false);
    settitleTask("");
    setArr([]);
    serResetPass(false);

    setshowMassage(true);

    setTimeout(() => {
      setshowMassage(false);
    }, 2500);
  };

  const titleOfInput = (e) => settitleTask(e.target.value); // title Of Input
  const itemsOfInput = (e) => setInp(e.target.value); // items Of Input

  // ========================================
  //  (-End-) fanction of model  / level-3 /
  // ========================================

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
            <AllTasksSecton user={user} />

            {/* Add  new task  */}
            <section className="add-new-task">
              <button onClick={() => serResetPass(true)}>
                Add Tew Task <i className="fa-solid fa-plus"></i>
              </button>
            </section>

            {/* ----------------- Level-3 -------------------------- */}
            {resetPass && (
              <ModelHome
                closeModel={closeModel}
                titleOfInput={titleOfInput}
                titleTask={titleTask}
                itemsOfInput={itemsOfInput}
                inp={inp}
                handelAdd={handelAdd}
                arr={arr}
                submitTaskButn={submitTaskButn}
                subloding={subloding}
              />
            )}

            {/* show-masseg */}
            <div
              style={{ right: showMassage ? "2vh" : "-100vh" }}
              className="show-masseg"
            >
              Task Add successfully{" "}
              <i className="fa-regular fa-circle-check"></i>
            </div>
          </main>
          <Footer />
        </div>
      );
    }
  }
};

export default Home;
