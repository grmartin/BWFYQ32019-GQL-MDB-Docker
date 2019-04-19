import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Storage} from "./middleware/storage";
import {NextFunction, Request, Response} from "express-serve-static-core";
import {default as bindDebugRouter} from './router/debug_utility';
import {default as bindRestBookmarksRouter} from './router/bookmarks';
import {default as bindGqlRouter} from './router/graphql';
import {Router} from "express";

const app = express();
const port = process.env.NBE_PORT || 3000;

app.use(bodyParser.json());
app.use(Storage.connect('bookmarks'));

function listen() {
    app.use(function _errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
        console.error(err.stack);
        res.status(500)
            .header('Content-Type', 'application/json')
            .send(err)
            .end(next);
    });

    app.listen(port, function _app_listen() {
        console.log(`Example app listening on port ${port}!`);
    });
}

// Root level routing
bindGqlRouter(app);

// rest routing
const restRouter = Router();
bindDebugRouter(restRouter);
bindRestBookmarksRouter(restRouter);
app.use('/rest', restRouter);

listen();
