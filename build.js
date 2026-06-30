/**
 * Magento China 静态站点构建脚本
 *
 * 本项目为纯静态 HTML/CSS/JS，无需前端框架编译。
 * 此脚本仅将源文件复制到 dist 目录，满足部署平台的 npm build 要求。
 */

const fs = require('fs');
const path = require('path');

const DIST = 'dist';

// 清理 dist 目录
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}
fs.mkdirSync(DIST, { recursive: true });

// 需要复制的根目录文件
const rootFiles = [
  'index.html',
  'docs.html',
  'community.html',
  'about.html',
  'favicon.svg',
  'robots.txt',
  'sitemap.xml',
  '_headers',
  '_redirects',
];

rootFiles.forEach(file => {
  const src = path.join(__dirname, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(DIST, file));
  }
});

// 递归复制目录
function copyDir(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 复制 assets 目录
const assetsDir = path.join(__dirname, 'assets');
if (fs.existsSync(assetsDir)) {
  copyDir(assetsDir, path.join(DIST, 'assets'));
}

console.log('✅ Build complete — static files copied to dist/');
