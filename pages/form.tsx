import React, { useState } from "react";
import { useForm } from "react-hook-form";

// Better validation
// Better errores(set, clear, display)
// Have control over inputs
interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const onValid = (data: LoginForm) => {
    console.log("I'm valid form");
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
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
      <input
        {...register("email", {
          required: "email is required",
        })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", {
          required: "password is required",
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
