import express from 'express'
import cors from 'cors'

import { router } from '@/infra/routes/index';
import cookieParser from 'cookie-parser'
import { corsConfig } from './shared/config/cors';
import { environment } from './shared/environment';


const app =  express()

app.use(cookieParser());
app.use(express.json()); 
app.use(router)
app.use(cors(corsConfig))


app.listen(environment.PORT, () => {
  console.log(`Listen on PORT: ${environment.PORT}/`);
})