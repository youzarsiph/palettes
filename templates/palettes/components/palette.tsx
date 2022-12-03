import { Component, ReactNode } from "react";
import styles from "../styles/Palette.module.css";

interface ColorProps {
  name: string;
  value: string;
}

interface ColorState {
  copied: boolean;
  focused: boolean;
}

class Color extends Component<ColorProps, ColorState> {
  constructor(props: ColorProps) {
    super(props);

    // Bind methods
    this.copy = this.copy.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);

    // State
    this.state = {
      copied: false,
      focused: false,
    };
  }

  copy() {
    this.setState({ copied: true });
  }

  focus() {
    this.setState({ ...this.state, focused: true });
  }

  blur() {
    this.setState({ ...this.state, focused: false });
  }

  render(): ReactNode {
    return (
      <li
        className={`${styles.color} ${
          this.state.focused ? styles.colorFocused : ""
        }`}
      >
        <button
          type={"button"}
          onBlur={this.blur}
          onClick={this.copy}
          onFocus={this.focus}
          onMouseLeave={() => {
            this.setState({ copied: false });
          }}
          className={`${styles.colorValue} ${this.props.value}`}
        >
          {this.state.copied ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <svg
                className="h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              <span>Copied!</span>
            </div>
          ) : (
            this.props.value
          )}
        </button>
      </li>
    );
  }
}

interface PaletteProps {
  id: number;
  user: { name: string; image: string };
  name: string;
  likes: number;
  saves: number;
  colors: string[];
  description: string;
}

interface PaletteState {
  // Open the menu
  open: boolean;
  // Show the text
  show: boolean;
  likes: number;
  saves: number;
  actions: { name: string; icon: () => ReactNode; action: () => void }[];
}

export default class Palette extends Component<PaletteProps, PaletteState> {
  constructor(props: PaletteProps) {
    super(props);

    // Bind methods
    this.open = this.open.bind(this);
    this.show = this.show.bind(this);
    this.like = this.like.bind(this);
    this.save = this.save.bind(this);

    // State
    this.state = {
      open: false,
      show: false,
      likes: props.likes || 0,
      saves: props.saves || 0,
      actions: [
        {
          name: "Open",
          icon: () => {
            return (
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            );
          },
          action: () => {},
        },
        {
          name: "Edit",
          icon: () => {
            return (
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            );
          },
          action: () => {},
        },
        {
          name: "Delete",
          icon: () => {
            return (
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            );
          },
          action: () => {},
        },
        {
          name: "Copy Link",
          icon: () => {
            return (
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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            );
          },
          action: () => {},
        },
      ],
    };
  }

  open() {
    this.setState({ ...this.state, open: !this.state.open });
  }

  show() {
    this.setState({ ...this.state, show: !this.state.show });
  }

  like() {
    this.setState({ ...this.state, likes: this.state.likes + 1 });
  }

  save() {
    this.setState({ ...this.state, saves: this.state.saves + 1 });
  }

  render(): ReactNode {
    return (
      <article className={styles.palette}>
        <div className={styles.container}>
          <header className={`${this.state.open ? "mb-12" : ""}`}>
            <ol className={styles.colors}>
              {this.props.colors.map((item) => {
                return <Color key={item} name={item} value={item} />;
              })}
            </ol>
          </header>

          <main className={"grid gap-6"}>
            <div className={"flex w-full items-center gap-4 px-6"}>
              <div className={styles.avatar}>{this.props.user.image}</div>
              <span className="font-bold tracking-wide">
                {this.props.user.name}
              </span>
            </div>
            <div className="grid gap-4">
              <button onClick={this.show} className={styles.description}>
                <span>Description</span>
                {!this.state.show ? (
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                ) : (
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
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                )}
              </button>
              <div className={`${this.state.show ? "" : "hidden"} px-6`}>
                <h1 className={styles.heading}>{this.props.name}</h1>
                <p>{this.props.description}</p>
              </div>
            </div>
            <div className={styles.actions}>
              <div className="flex items-center gap-4">
                <button
                  onClick={this.like}
                  className={`${styles.likeBtn} group`}
                >
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{this.state.likes}</span>
                  <span
                    className={`${styles.tooltip} group-hover:scale-100 group-focus:scale-100`}
                  >
                    Like
                  </span>
                </button>
                <button
                  onClick={this.save}
                  className={`${styles.saveBtn} group`}
                >
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
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  <span>{this.state.saves}</span>
                  <span
                    className={`${styles.tooltip} group-hover:scale-100 group-focus:scale-100`}
                  >
                    Save
                  </span>
                </button>
              </div>
              <button
                onClick={this.open}
                className={`${styles.optionsBtn} group`}
              >
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
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
                <span
                  className={`${styles.tooltip} group-hover:scale-100 group-focus:scale-100`}
                >
                  Options
                </span>
              </button>
            </div>
          </main>
        </div>

        <footer
          className={`${styles.menu} ${
            this.state.open ? styles.menuOpened : ""
          }`}
        >
          <div className={styles.menuContainer}>
            <ul className="flex items-center gap-2">
              {this.state.actions.map((item) => {
                return (
                  <li key={item.name}>
                    <button
                      type={"button"}
                      onClick={item.action}
                      className={`${styles.menuItem} group`}
                    >
                      {item.icon()}
                      <span
                        className={`${styles.tooltip} group-hover:scale-100 group-focus:scale-100`}
                      >
                        {item.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </footer>
      </article>
    );
  }
}
