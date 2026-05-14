"use client";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type ButtonType = {
  className?: string;

  /** Variant props */
  property1?: CSSProperties["property1"];

  /** Style props */
  buttonBackgroundColor?: CSSProperties["backgroundColor"];
  createAccountColor?: CSSProperties["color"];
};

const Button: NextPage<ButtonType> = ({
  className = "",
  property1 = "Default",
  buttonBackgroundColor,
  createAccountColor,
}) => {
  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: buttonBackgroundColor,
    };
  }, [buttonBackgroundColor]);

  const createAccountStyle: CSSProperties = useMemo(() => {
    return {
      color: createAccountColor,
    };
  }, [createAccountColor]);

  return (
    <button
      className={`cursor-pointer [border:none] py-[13px] px-6 bg-foundation-primary-normal h-[46px] w-[175px] rounded-[999px] overflow-hidden shrink-0 flex items-center justify-center box-border ${className}`}
      style={buttonStyle}
    >
      <div
        className="relative text-sm leading-5 font-medium font-[Satoshi] text-[#fff] text-left"
        style={createAccountStyle}
      >
        Get Started
      </div>
    </button>
  );
};

export default Button;
