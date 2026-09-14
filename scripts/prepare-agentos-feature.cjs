// Reuse the approved AgentOS artwork as static markup; no React runtime in the site.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = path.resolve(root, '../INOSX-AgentOS-Landing');
const esbuild = require(path.join(source, 'node_modules/esbuild'));
const React = require(path.join(source, 'node_modules/react'));
const {renderToStaticMarkup} = require(path.join(source, 'node_modules/react-dom/server'));
let jsx = fs.readFileSync(path.join(source, 'src/LaunchParty.jsx'), 'utf8')
  .replace('import { useLanguage } from "./i18n.jsx";', 'const useLanguage = () => ({ t: value => value });');
const compiled = esbuild.transformSync(jsx, {loader:'jsx',format:'cjs'}).code;
const moduleResult = {exports:{}};
new Function('module','exports','React',compiled)(moduleResult,moduleResult.exports,React);
const scene = renderToStaticMarkup(React.createElement(moduleResult.exports.LaunchParty));
fs.mkdirSync(path.join(root,'assets/agentos'),{recursive:true});
fs.writeFileSync(path.join(root,'assets/agentos/party.html'),scene);
let css = fs.readFileSync(path.join(source,'src/styles.css'),'utf8');
css = css.slice(css.indexOf('.launch-celebration {'),css.indexOf('.site-header {'));
css += '\n.launch-inner {width:min(1240px,calc(100% - 48px));margin-inline:auto;color:#f7f9ff;}\n.launch-celebration{overflow:hidden;}\n.agentos-retrospective{margin-top:24px;padding:24px 0;border-top:1px solid #7dd3fc44;}\n.agentos-retrospective summary{cursor:pointer;font-size:1.3rem;color:#7dd3fc;}\n.agentos-retrospective p{max-width:75ch;line-height:1.7;}\n.agentos-video-language{display:flex;justify-content:flex-end;gap:12px;align-items:center;padding:12px;}\n.agentos-video-language select{background:#0b1836;color:#fff;padding:8px;border:1px solid #7dd3fc;border-radius:8px;}\n';
fs.writeFileSync(path.join(root,'css/agentos-launch.css'),css);
