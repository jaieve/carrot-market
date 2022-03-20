import React, { useState } from "react";
import { useForm } from "react-hook-form";

// less code ✔
// Better validation
// Better errores(set, clear, display)
// Have control over inputs
// Don't deal with events ✔
// Easier Inputs ✔

export default function Forms() {
  const { register, handleSubmit } = useForm();
  const onValid = () => {
    console.log("I'm valid form");
  };
  const onInvalid = () => {
    console.log("I'm INVALID form");
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: true,
        })} // = name, onChange 이벤트
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: true,
        })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", {
          required: true,
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
