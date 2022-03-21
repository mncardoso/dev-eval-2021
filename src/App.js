import { useState } from "react";
import { createUseStyles } from "react-jss";
import { useWebcamCapture } from "./useWebcamCapture";
import logo from "./slap.png";
import starsImg from "./stars.png";
import backgroundImg from "./background.png";

import { Link, Switch, Route, Redirect } from "react-router-dom";

const bkg = [backgroundImg].map((url) => {
  const img = document.createElement("img");
  img.src = url;
  return { img, url };
});

const useStyles = createUseStyles((theme) => ({
  "@global *": {
    boxSizing: "border-box",
    margin: "0",
    padding: "0",
  },

  "@global html": { scrollBehavior: "smooth" },

  "@global body": {
    background: `url(${bkg[0].url})`,
    backgroundSize: "50rem",
    backgroundColor: theme.palette.background,
    color: theme.palette.text,
    fontFamily: "'Roboto', sans-serif;",
    height: "100hv",
    margin: "1rem",
  },

  App: {
    padding: "20px",
    background: theme.palette.primary,
    maxWidth: "800px",
    minHeight: "600px",
    margin: "auto",
    "& a": {
      color: "black",
    },
    borderRadius: "8px",
  },

  Header: {
    textAlign: "center",
    "&  h1": {
      fontFamily: "'Rock Salt', cursive;",
      cursor: "pointer",
      fontSize: "4rem",
      lineHeight: " 4.5rem",
    },
    "& p": {
      fontFamily: "'Roboto', sans-serif;",
      fontSize: "2rem",
      lineHeight: " 2.5rem",
    },
    "& ul": { padding: "0em" },
    "& li": {
      display: "inline-block",
      listStyleType: "none",
      margin: "50px 10px",
      "& a": {
        textDecoration: "none",
        padding: "4px 20px 5px",
        backgroundColor: theme.palette.secondary,
        borderRadius: "20px",
      },
      "& :hover": { textDecoration: "underline" },
    },
  },

  Main: {
    background: theme.palette.secondary,
    margin: "2rem 0px",
    borderRadius: "8px",
    padding: "4px",
    color: "black",
    "& p": {
      fontSize: "1rem",
      fontWeight: "400",
      textDecoration: "none",
      margin: "none",
      lineHeight: "1.5rem",
      "& bold": { fontWeight: "800" },
    },
    "& canvas": {
      width: "100%",
      height: "auto",
      borderRadius: "8px",
    },
    "& video": {
      display: "none",
    },
  },
  Stickers: {
    margin: "2rem 0px",
    "& p": {
      fontSize: "1rem",
      fontWeight: "400",
      textDecoration: "none",
      margin: "none",
      lineHeight: "1.5rem",
      "& bold": { fontWeight: "800" },
    },
    "& img": {
      height: "4rem",
    },
    "& button": {
      margin: "0 10px 0 0",
      display: "flex",
      cursor: "pointer",
      background: "white",
      border: "1px solid rgba(191, 191, 191, 0.75)",
      boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.75)",
      borderRadius: "2px",
    },
    "& button:active": {
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.75)",
      transform: "translate(1px, 1px)",
    },
    "& div": { display: "flex" },
  },
  Gallery: {
    margin: "2rem 0px",
    "& p": {
      fontSize: "1rem",
      fontWeight: "400",
      textDecoration: "none",
      margin: "none",
      lineHeight: "1.5rem",
      "& bold": { fontWeight: "800" },
    },
    "& img": {
      height: "16rem",
    },
  },
  Picture: {
    background: "white",
    padding: 4,
    position: "relative",
    display: "inline-block",
    borderRadius: "4px",
    "& img": { borderRadius: "4px" },
    "& h3": {
      color: "black",
      fontFamily: "'Rock Salt', cursive;",
      textAlign: "center",
      width: "100%",
      fontSize: "1.5rem",
      margin: "1rem 0",
    },
  },
  Readme: {
    marginTop: "3rem",
    "& h1": {
      fontSize: "4rem",
      fontWeight: "800",
      textDecoration: "none",
      margin: "none",
      lineHeight: "2rem",
    },
    "& h2": {
      fontSize: "2.375rem",
      fontWeight: "800",
      textDecoration: "none",
      margin: "none",
      lineHeight: "3rem",
    },
    "& h3": {
      fontSize: "1.375rem",
      fontWeight: "800",
      textDecoration: "none",
      margin: "none",
      lineHeight: "2.5rem",
    },
    "& p": {
      fontSize: "0.75rem",
      fontWeight: "400",
      textDecoration: "none",
      margin: "none",
      lineHeight: "1rem",
    },
    "& li": {
      fontSize: "0.75rem",
      fontWeight: "400",
      textDecoration: "none",
      margin: "none",
      lineHeight: "1rem",
    },
    "& ul": {
      fontSize: "0.75rem",
      fontWeight: "400",
      textDecoration: "none",
      margin: "none",
      paddingLeft: "1rem",
    },
  },
}));

const stickers = [logo].map((url) => {
  const img = document.createElement("img");
  img.src = url;
  return { img, url };
});
const stars = [starsImg].map((url) => {
  const img = document.createElement("img");
  img.src = url;
  return { img, url };
});

function App(props) {
  // css classes from JSS hook
  const classes = useStyles(props);
  // currently active sticker
  const [sticker, setSticker] = useState();
  // title for the picture that will be captured
  const [title, setTitle] = useState("I DESERVE THIS!");

  // webcam behavior hook
  const [
    handleVideoRef, // callback function to set ref for invisible video element
    handleCanvasRef, // callback function to set ref for main canvas element
    handleCapture, // callback function to trigger taking the picture
    picture, // latest captured picture data object
  ] = useWebcamCapture(sticker?.img, title);

  return (
    <div className={classes.App}>
      <header className={classes.Header}>
        <h1>SlapSticker</h1>
        <p>
          Have you ever said something so dumb, you just wanted to slap
          yourself? Well now you can!
        </p>
        <nav>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/readme">read me</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        /** * Main app route */
        <Route path="/" exact>
          <main>
            <section className={classes.Gallery}>
              <p>
                <bold>Step 1:</bold> Give it a name
              </p>
              <input
                type="text"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
            </section>
            <section className={classes.Stickers}>
              <p>
                <bold>Step 2:</bold> Select your sticker...
              </p>
              <div>
                <button onClick={() => setSticker(stickers[0])}>
                  <img src={stickers[0].url} />
                </button>
                <button onClick={() => setSticker(stars[0])}>
                  <img src={stars[0].url} />
                </button>
              </div>
            </section>
            <section className={classes.Main}>
              <p>
                <bold>Step 3:</bold> Slap your self!
              </p>
              <video ref={handleVideoRef} />
              <canvas
                ref={handleCanvasRef}
                width={2}
                height={2}
                onClick={handleCapture}
              />
            </section>
            <section className={classes.Gallery}>
              <p>
                {" "}
                <bold>Step 4:</bold> Cherish this moment forever
              </p>
              {picture && (
                <div className={classes.Picture}>
                  <img src={picture.dataUri} />
                  <h3>{picture.title}</h3>
                </div>
              )}
            </section>
          </main>
        </Route>
        /** * Readme route */
        <Route path="/readme">
          <main className={classes.Readme}>
            <h2>Devtest Readme</h2>
            <p>
              Hello candidate, Welcome to our little dev test. The goal of this
              exercise, is to asses your general skill level, and give us
              something to talk about at our next appointment.
            </p>
            <section>
              <h3>What this app should do</h3>
              <p>
                SlapSticker is an app that lets users to slap stickers on their
                face, using their webcam. Functionality wise the app works, but
                the ui needs some love. We'd like for you to extend this
                prototype to make it look and feel it bit better.
              </p>
              <p>These are the basic requirements:</p>
              <ul>
                <li>User can pick a sticker</li>
                <li>User can give the captured image a title</li>
                <li>User can place the sticker over the webcam image</li>
                <li>User can capture the webcam image with sticker</li>
              </ul>
            </section>
            <section>
              <h3>What we want you to do</h3>
              <p>
                Off course we didn't expect you to build a full fledged app in
                such a short time frame. That's why the basic requirements are
                already implemented.
              </p>
              <p>
                However, we would like for you to show off your strengths as a
                developer by improving the app.
              </p>
              <p>Some ideas (no need to do all):</p>
              <ul>
                <li>Make it look really nice</li>
                <li>Let users pick from multiple (custom) stickers</li>
                <li>Improve the workflow and ux</li>
                <li>Show multiple captured images in a gallery</li>
                <li>Let users download or share the captured pics</li>
                <li>Add super cool effects to webcam feed</li>
                <li>Organize, document and test the code</li>
                <li>Integrate with zoom, teams, meet...</li>
              </ul>
            </section>
            <section>
              <h3> quickstart</h3>
              <ul>
                <li>You can clone this repo to get started </li>
                <li>run `$ npm install` to install deps</li>
                <li>run `$ npm run start` to start dev environment</li>
                <li>push it to github or gitlab to share it with us. </li>
              </ul>
            </section>
            <section>
              <p>
                P.s. We've already added some libraries to make your life easier
                (Create React App, Jss, React Router), but feel free to add
                more.
              </p>
            </section>
          </main>
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
