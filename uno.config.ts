import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetUno({
      dark: 'class'
    }),
    presetIcons(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        // these will extend the default theme
        main: {
          name: 'Inter',
          italic: true,
          weights: ['400', '600', '900']
        },
        hand: ['Grechen Fuemen']
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      brand: {
        base: '#0D1117',
        primary: '#E5E7EB',
        action: '#F26B43'
      }
    }
  }
})
