"use client";

import {useEffect} from "react";

export default function Home() {
    useEffect(() => {
        document.title = `${process.env.NEXT_PUBLIC_PROJECT_NAME} - Home`;
    });
  return (
      <div>
        <h1><i className={'fad fa-house'}/> Home</h1>
        <h2>Welcome to home</h2>
      </div>
  );
}
