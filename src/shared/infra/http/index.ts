import { App } from "./app";
import express from "express";
import { routesList } from "../routes";
import db from "../database";

export const app = new App(express(), db, routesList)
app.startApp()