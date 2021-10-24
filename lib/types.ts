import express from 'express';

export type Flush = (res: express.Response, req: express.Request, model: any) => void;