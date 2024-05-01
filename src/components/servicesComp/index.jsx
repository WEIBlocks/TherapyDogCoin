import React from "react";
import { FaExclamation } from "react-icons/fa6";
import { images } from "../../assests";
import { LuAlignHorizontalJustifyCenter } from "react-icons/lu";

const ServicesComp = ({ key, service }) => {
  return (
    <div
      key={key}
      className="w-[340px]  border-2 border-primary shadow-xl hover:shadow-2xl rounded-lg p-1 transition-all  cursor-pointer hover:-translate-y-3"
    >
      <div className="flex justify-center flex-col  items-center gap-1 ">
        <div className="text-4xl">
          <LuAlignHorizontalJustifyCenter />
        </div>
        <h2 className="lg:text-2xl md:text-xl text-lg font-bold capitalize">
          {service.title}
        </h2>
        <p className="md:text-lg text-base font-semibold text-center">
          {service.des}
        </p>
      </div>
    </div>
  );
};

export default ServicesComp;
