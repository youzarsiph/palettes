import Link from "next/link";
import { Component, ReactNode } from "react";
import styles from "../styles/Header.module.css";

interface HeaderProps {}

interface HeaderState {
  collapsed: boolean;
}

export default class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);

    // Bind methods
    this.collapse = this.collapse.bind(this);

    // State
    this.state = {
      collapsed: true,
    };
  }

  collapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render(): ReactNode {
    return (
      <header className={`${styles.header} fixed inset-x-0 top-0`}>
        <div className={styles.container}>
          <div className={styles.brand}>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
            <Link href={"/"}>Palettes</Link>
          </div>
          <button onClick={this.collapse} className={styles.btn}>
            {this.state.collapsed ? (
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
        <nav
          className={`${styles.menu} ${
            this.state.collapsed ? styles.collapsed : ""
          }`}
        >
          <ul className={styles.list}>
            <li className={styles.menuItem}>Home</li>
            <li className={styles.menuItem}>New</li>
            <li className={styles.menuItem}>Explore</li>
          </ul>
          <ul className={styles.list}>
            <li className={styles.menuItem}>
              <span>Login</span>
            </li>
            <li className={styles.menuItem}>
              <span>Sign up</span>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
