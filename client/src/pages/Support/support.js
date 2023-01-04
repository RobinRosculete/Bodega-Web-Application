import React from "react";
import Style from "./support.module.css";
import Supportmessage from "./supportMessage";

export default function Support() {
  return (
    //Make an about page

    <div className={Style.supdiv}>
      <Supportmessage />
      <a className={Style.a} href="mailto: dev@bodega.com">
        Contact the Devs{" "}
      </a>
    </div>
  );
}
