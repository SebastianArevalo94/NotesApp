import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTheme } from "./redux/themeSlice";
import AppRoutes from "./routes/AppRoutes";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const themeState = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (!theme) {
      localStorage.setItem("theme", "light");
    } else {
      dispatch(setTheme(theme));
    }
  });

  return (
    <ThemeProvider theme={themeState.isDark ? darkTheme : lightTheme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
