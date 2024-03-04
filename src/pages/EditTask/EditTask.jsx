import Footer from "../../comp/Footer";
import Header from "../../comp/header";
import "./EditTask.css";

const EditTask = () => {
  return (
    <>
      <Header />
      <div className="edit-task">
        {/* title */}
        <section className="title-edit-task">
          <input type="text" value={"Hussein S Elged"} />
          <i className="fa-solid font fa-pen-to-square"></i>
        </section>

        {/* sub tasks */}
        <section className="sub-task">
          <div className="menuo-sub-task">
            <p>Created 6 days ago</p>
            <label htmlFor="checkbox">
              {" "}
              <input id="checkbox" type="checkbox" /> Completed{" "}
            </label>
          </div>

          <ul>
            {/* sub-items */}
            <li className="sub-items">
              <p>Lorem ipsum dolor sit amet.</p>
              <i class="fa-regular font fa-trash-can"></i>
            </li>
            {/* sub-items */}
            <li className="sub-items">
              <p>Lorem ipsum dolor sit amet.</p>
              <i class="fa-regular font fa-trash-can"></i>
            </li>
            {/* sub-items */}
            <li className="sub-items">
              <p>Lorem ipsum dolor sit amet.</p>
              <i class="fa-regular font fa-trash-can"></i>
            </li>
          </ul>
        </section>

        {/* Bottons */}
        <section className="edit-btn">
          <button>
            Add Task <i className="fa-solid fa-plus"></i>
          </button>
          <button style={{ backgroundColor: "tomato" }}>Delite Task</button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default EditTask;
