import { defineConfig } from 'orval'

export default defineConfig({
  authApi: {
    output: {
      target: './src/api/auth.ts',
      client: 'react-query',
      prettier: true,
      mock: false,
      headers: false,
      override: {
        mutator: {
          path: './src/api/auth.axios.ts',
          name: 'useCustomInstance',
        },
      },
    },
    input: {
      target: 'https://uat.auth.cause-i.ai/v1-yaml',
    },
  },
  surveyApi: {
    output: {
      target: './src/api/survey.ts',
      client: 'react-query',
      prettier: true,
      mock: false,
      headers: false,
      override: {
        mutator: {
          path: './src/api/survey.axios.ts',
          name: 'useCustomInstance',
        },
      },
    },
    input: {
      target: 'https://uat.backend.cause-i.ai/v1-yaml',
    },
  },
})
