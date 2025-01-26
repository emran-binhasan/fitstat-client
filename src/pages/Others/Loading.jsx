import { useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";

const override={
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Loading = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ff8c00");

  return (
    <div className="sweet-loading h-[50vh] flex m-auto items-center">
     

      <CircleLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;