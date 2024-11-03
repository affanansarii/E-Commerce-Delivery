import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { setData } from "./Redux/productSlice";
import { useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch();
  // const productData = useSelector((state) => state.product);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`);
      const data = await res.json();
      // console.log('data', data);
      dispatch(setData(data));
    })()
  }, [])

  return (
    <>
      <Toaster />
      <div className="">
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
