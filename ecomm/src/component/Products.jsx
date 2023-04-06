import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Product.css";

function Products() {
  const [data, setdata] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setloading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getproducts = async () => {
      setloading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        setdata(await response.clone().json());
        setFilter(await response.json());
        setloading(false)
        console.log(filter);
      }

      return () => {
        componentMounted = false;
      };
    };
    getproducts();
  }, []);

  const Loading = () => {
    return (
    <>
            <div className =" col-md-3">
            
            </div>
            <div className =" col-md-3">
            
            </div>
            <div className =" col-md-3">
            
            </div>
            <div className =" col-md-3">
            
            </div>
    </>);
  };

  const filterProduct =(cat)=>
  {
    const updatedList=data.filter((x)=>x.category==cat);
    setFilter(updatedList);

  }

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>All</button>
          <button className="btn btn-outline-dark me-2"onClick={()=>filterProduct("Men's Clothing")}>Men's Clothing</button>
          <button className="btn btn-outline-dark me-2"onClick={()=>filterProduct("Women's Clothing")}>Women's Clothing</button>

          <button className="btn btn-outline-dark me-2"onClick={()=>filterProduct("Jewelery")}>Jewelery</button>
          <button className="btn btn-outline-dark me-2"onClick={()=>filterProduct("Electronics")}>Electronics</button>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3">
                <div class="card" > 
                {/* style="width: 18rem;" */}
                  <img src={product.image} class="card-img-top" alt={product.title} />
                  <div class="card-body">
                    <h5 class="card-title">{product.title}</h5>
                    <p class="card-text lead fw-bold">
                      ₹{product.price}
                    </p>
                    <NavLink to={`/products/${product.id}`}class="btn btn-outline-dark">
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };




  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
          <div className="row justify-content-center">
            {loading ? <Loading /> : <ShowProducts />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
