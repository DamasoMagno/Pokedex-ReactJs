import Image from "next/image";
import styles from "../styles/pages/Header.module.css";

import logoImg from "../assets/logo.png";

export function Header(){
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Image src={logoImg} height={130} width={350}></Image>
      </div>
    </header>
  );
}