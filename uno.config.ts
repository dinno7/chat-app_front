import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetIcons(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        // these will extend the default theme
        main: {
          name: 'DM Sans',
          italic: true,
          weights: ['400', '600', '900'],
        },
        hand: ['Kaushan Script'],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      brand: {
        base: '#0D1117',
        primary: '#E5E7EB',
        action: {
          DEFAULT: '#F47743',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
      },
    },
  },
});
