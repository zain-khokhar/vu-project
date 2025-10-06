import Link from "next/link";
import React from "react";

const Tag = ({ link = "#", name, ...props }) => {
  return (
    <Link
      href={link}
      className={`inline-block py-2 px-4 bg-dark text-light rounded-full capitalize font-semibold border-2 border-solid border-light hover:scale-105 transition-all ease duration-200 text-xs sm:text-sm !border-accent !bg-accent !text-light ${props.className}`}
    >
      {name}
    </Link>
  );
};

export default Tag;