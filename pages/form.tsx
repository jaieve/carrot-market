import React, { useState } from "react";

export default function Forms() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onUsernameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setUsername(value);
  };
  const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setEmail(value);
  };
  const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setPassword(value);
  };
  const onSubmitChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(username, email, password);
  };

  return (
    <form onSubmit={onSubmitChange}>
      <input
        value={username}
        type="text"
        required
        placeholder="Username"
        onChange={onUsernameChange}
      />
      <input
        value={email}
        type="email"
        required
        placeholder="Email"
        onChange={onEmailChange}
      />
      <input
        value={password}
        type="password"
        required
        placeholder="Password"
        onChange={onPasswordChange}
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
