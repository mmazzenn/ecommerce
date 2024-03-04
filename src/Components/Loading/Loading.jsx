import React from "react";
import { FidgetSpinner } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loading text-center">
      <FidgetSpinner
        visible={true}
        height="100"
        width="100"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
        backgroundColor="#0aad0a"
        ballColors={["#756AB6", "#AC87C5", "#E0AED0"]}
      />
    </div>
  );
};

export default Loading;
