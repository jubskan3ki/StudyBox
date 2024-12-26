import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ignores: ['dist', 'node_modules'],
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            import: importPlugin,
            'jsx-a11y': jsxA11y,
            react,
            'react-hooks': reactHooks,
            prettier: prettierPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
                alias: {
                    map: [['~', './src']],
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
                },
            },
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    trailingComma: 'es5',
                    tabWidth: 4,
                    semi: true,
                    singleQuote: true,
                    printWidth: 120,
                    jsxSingleQuote: false,
                    bracketSpacing: true,
                    arrowParens: 'always',
                    endOfLine: 'auto',
                },
            ],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'consistent-return': 'error',
            'no-unused-expressions': 'warn',
            'no-underscore-dangle': 'off',
            'no-plusplus': 'off',
            'no-restricted-syntax': 'off',
            'import/prefer-default-export': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-props-no-spreading': 'off',
            'react/jsx-no-useless-fragment': 'error',
            'react/self-closing-comp': 'error',
            'react/require-default-props': 'off',
            'react-hooks/rules-of-hooks': 'error',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/ban-ts-comment': 'warn',
            '@typescript-eslint/consistent-type-imports': 'error',
            'import/order': [
                'error',
                {
                    groups: [['builtin', 'external', 'internal']],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    },
    eslintConfigPrettier,
];
