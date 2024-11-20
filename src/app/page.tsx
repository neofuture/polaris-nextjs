"use client";

import {useEffect} from "react";

export default function Home() {
    useEffect(() => {
        document.title = `${process.env.NEXT_PUBLIC_PROJECT_NAME} - Home`;
    });
  return (
      <div>
        <h1>Home</h1>
        <p>Welcome to home!</p>
      </div>
  );
}
