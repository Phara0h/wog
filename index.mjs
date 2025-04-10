import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const createWog = require('./index.js');
export default createWog;
export const Wog = createWog.Wog;