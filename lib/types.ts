import express from 'express';

export type Flush = (buildFolderPath: string, res: express.Response, req: express.Request, model: any) => void;