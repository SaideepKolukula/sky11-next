import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { withRouter } from "next/router";

function MainPage(props: any) {
  useEffect(() => {
    console.log(props);
  }, [props, props.router.query.name]);
  const result = props.router.query.name;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Main Page , the jwt token is
        </h1>
        <div>
          <p>{result}</p>
        </div>
      </main>
    </div>
  );
}

export default withRouter(MainPage);
