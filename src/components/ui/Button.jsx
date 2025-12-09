import React from "react";
import { IconContext } from "react-icons";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className = "",
  ...props
}) {
  // Size variants
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Light/Dark mode + style variants
  const variants = {
    primary:
      "bg-blue-600 text-white dark:bg-blue-500 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-600",
    secondary:
      "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600",
    outline:
      "border border-gray-400 text-gray-700 dark:text-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800",
    p_green:
         "w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition duration-300",
  };

  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-medium shadow-sm
        hover:shadow-lg hover:-translate-y-0.5 active:scale-95
        transition-all duration-300
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
    >
      <IconContext.Provider value={{ size: "1.2em" }}>
        {Icon && iconPosition === "left" && <Icon />}
        {children}
        {Icon && iconPosition === "right" && <Icon />}
      </IconContext.Provider>
    </button>
  );
}
