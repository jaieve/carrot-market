import { setDefaultResultOrder } from "dns/promises";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// Better validation
// Better errores(set, clear, display)
// Have control over inputs
interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
    resetField,
  } = useForm<LoginForm>({
    mode: "onChange", // submit 누르기 전에 validate을 진행하겠다는 optiondms mode를 변경함으로써 줄 수 있다.
  });
  const onValid = (data: LoginForm) => {
    console.log("I'm valid form");
    setError("errors", { message: "Backend is offline sorry." });
    setError("username", { message: "Someone already used that username" });
    //  resetField("password");
    reset();
  };
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("username", {
          required: "username is required",
          minLength: {
            message: "The username should be longer than 5 chars",
            value: 5,
          },
        })} // = name, onChange 이벤트
        type="text"
        placeholder="Username"
      />
      {errors.username?.message}
      <input
        {...register("email", {
          required: "email is required",
          validate: {
            notGmail: (vlaue) =>
              !vlaue.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
      />
      <span>{errors.email?.message}</span>
      <input
        {...register("password", {
          required: "password is required",
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
      {errors.errors?.message}
    </form>
  );
}
