import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import Script from "next/script";
import Map from "@/components/Map";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Map />;
}

// icon: {
//   content:
//     '<img src="/favicon.ico" alt="" ' +
//     'style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; ' +
//     '-webkit-user-select: none; position: absolute; width: 20px; height: 35px; left: 0px; top: 0px;">',
// },
