import { createContext } from "react";
import { IMainContext } from "./types/types";

const MainContext = createContext<IMainContext | null>(null);

export default MainContext;
