import React from "react";

const ServicesComp = ({ key, service }) => {
	return (
		<div
			key={key}
			className="w-[340px]  border-2  bg-primary text-white shadow-xl hover:shadow-2xl rounded-lg p-1 transition-all  cursor-pointer hover:-translate-y-3"
		>
			<div className="flex justify-center flex-col  items-start gap-1 ">
				<div className="md:w-[40px] md:h-[40px] w-[30px] h-[30px] ">
					{/* <LuAlignHorizontalJustifyCenter /> */}
					<img src={service.pic} alt="service" />
				</div>
				<h2 className="lg:text-2xl md:text-xl text-lg font-bold capitalize">
					{service.title}
				</h2>
				<p className="md:text-lg text-base font-semibold text-start">
					{service.des}
				</p>
			</div>
		</div>
	);
};

export default ServicesComp;
