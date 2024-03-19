import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const config = defineConfig({
  plugins: [viteTsconfigPaths()],
  test: {
    environment: 'happy-dom',
  },
});

export default config;
