import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { env } from './utils/env';
import { router } from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('trust proxy', 1);
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 100,
		standardHeaders: true,
		legacyHeaders: false,
	})
);

app.get('/health', (_req, res) => {
	res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/', router);

const port = env.PORT;
app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Smart Health API running on port ${port}`);
});

// Error handler (must be after routes)
app.use(errorHandler);


