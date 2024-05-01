import React from "react";

const SectionHeading = ({ heading }) => {
  return (
    <h1 className="lg:text-5xl md:text-4xl text-3xl font-black text-center">
      {heading}
    </h1>
  );
};

export default SectionHeading;
