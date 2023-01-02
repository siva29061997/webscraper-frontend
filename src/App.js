import axios from "axios";
import { useFormik } from "formik";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ClockLoader from "react-spinners/ClockLoader";

function App() {
  const [data, setdata] = useState();
  const [datax, setdatax] = useState();
  const [loading, setloading] = useState(false);
  const formik = useFormik({
    initialValues: {
      product: "",
    },

    validate: (values) => {
      let errors = {};
      if (!values.product) {
        errors.product = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      setloading(true);
      let prodata = await axios.post(
        `https://scrapper-back.vercel.app/flipkart`,
        values
      );
      console.log(prodata.data);
      setdata(prodata.data);
      console.log(data);
      let prodatax = await axios.post(
        `https://scrapper-back.vercel.app/amazon`,
        values
      );
      console.log(prodatax.data);
      setdatax(prodatax.data);
      setloading(false);
    },
  });

  return (
    <>
      <div class="search-box">
        <form onSubmit={formik.handleSubmit}>
          <input
            autocomplete="off"
            class="search-txt"
            type="text"
            name="product"
            placeholder="Type to search"
            onChange={formik.handleChange}
          />
          <button class="search-btn" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
      <div class="container">
        <div class="row">
          <div class="text-center col-12">
            <h1 class="text-white">WEB SCRAPER</h1>
          </div>
        </div>
        <div class="row">
          <div class="text-center col-12">
            <p class="text-white">
              WE Could Scrap Any ProductData From Amazon And Flipkart Within
              '30' seconds
            </p>
          </div>
        </div>
        {!loading ? (
          <div class="row">
            {data ? (
              <div class="cardd col-6">
                <div class="card" style={{ width: "18rem" }}>
                  <img
                    class="card-img-top"
                    src={data[0].image}
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h5 class="card-title">{data[0].name}</h5>
                    <p class="text-danger">Live Data From Flipkart!</p>
                    <h5 class="card-title">
                      Sale Price : {data[0].offerprice}
                    </h5>
                    <p class="card-text">
                      Actual price : {data[0].actualprice}
                    </p>
                    <a href={data[0].url} class="btn btn-primary">
                      Go To {data[0].provider}
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
            {datax ? (
              <div class="cardd col-6">
                <div class="card" style={{ width: "18rem" }}>
                  <img
                    class="card-img-top"
                    src={datax[0].image}
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h5 class="card-title">{datax[0].name}</h5>
                    <p class="text-danger">Live Data from Amazon!</p>
                    <h5 class="card-title">
                      Sale Price : {datax[0].offerprice}
                    </h5>
                    <p class="card-text">
                      Actual price : {datax[0].actualprice}
                    </p>
                    <a href={datax[0].url} class="btn btn-primary">
                      Go To {datax[0].provider}
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div class="cardd col-12"><ClockLoader color="#fcfcfc" /></div>
        )}
      </div>
    </>
  );
}

export default App;
