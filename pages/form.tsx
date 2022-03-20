import React, { useState } from "react";
import { useForm } from "react-hook-form";

// less code ✔
// Better validation
// Better errores(set, clear, display)
// Have control over inputs
// Don't deal with events ✔
// Easier Inputs ✔

export default function Forms() {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <form>
      <input
        {...register("username")} // = name, onChange 이벤트
        type="text"
        required
        placeholder="Username"
      />
      <input {...register("email")} type="email" required placeholder="Email" />
      <input
        {...register("password")}
        type="password"
        required
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
