import React from "react";

const SectionHeading = ({ heading, effect}) => {
  return (
    <>
      <h1 className="lg:-mb-[0.5em] md:-mb-[0.6em] -mb-[0.7em] leading-none mt-0 lg:text-[140px] md:text-[120px] text-[60px]  font-bold text-gray-200 capitalize text-center">
        {
          effect
        }
      </h1>

      <h2 className="mt-0 lg:text-5xl md:text-3xl text-2xl font-black text-center text-grey">
        {heading}
      </h2>
    </>
  );
};

export default SectionHeading;
