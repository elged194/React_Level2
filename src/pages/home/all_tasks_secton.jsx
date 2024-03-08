import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../Firebase/Confog";
import ErrorPage from "../Error/ErrorPage";
import ReactLoading from "react-loading";
import Moment from "react-moment";

const AllTasksSecton = ({ user }) => {
  const [value, loading, error] = useCollection(collection(db, user.uid));

  // error
  if (error) {
    return <ErrorPage />;
  }

  // loading
  if (loading) {
    return (
      <main>
        {" "}
        <ReactLoading
          type={"bars"}
          color={"#fff"}
          height={150}
          width={150}
          display={"flex"}
        />
      </main>
    );
  }

  if (value) {
    return (
      <section className="all-tasks">
        {value.docs.map((e) => {
          return (
            <article dir="auto" className="one-task" key={e.data().id}>
              <Link to={`/EditTask/${e.data().id}`}>
                <h3>{e.data().title}</h3>

                <ul>
                  {e.data().array.map((e, x) => {
                    if (x < 2) {
                      return <li key={e}>{e}</li>;
                    } else {
                      return false;
                    }
                  })}
                </ul>

                <p className="time">
                  <Moment fromNow date={e.data().id} />
                </p>
              </Link>
            </article>
          );
        })}
      </section>
    );
  }
};

export default AllTasksSecton;
