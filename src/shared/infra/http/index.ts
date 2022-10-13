import { App } from "./app";
import express from "express";
import { connection } from "../database";
import { routesList } from "../routes";

export const app = new App(express(), connection, routesList)
app.startApp()