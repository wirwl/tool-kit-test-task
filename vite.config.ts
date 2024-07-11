import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";
import vitePluginRequire from "vite-plugin-require";
import crypto from 'crypto';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    modules: {
      generateScopedName(name, filename, css) {
        const classNameIndex = css.indexOf(`.${name}`);
        const lineNumber = css.substr(0, classNameIndex).split(/\r?\n/).length;        
        const hash = crypto.createHash('sha1').update(css).digest('hex').substring(0, 5);
        
        const items = filename.split('/');
        return `${items[items.length-2]}__${name}_${hash}-${lineNumber}`;
      },
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/shared/lib/lib.scss" as *;`,
      }
    }
  },  
})
