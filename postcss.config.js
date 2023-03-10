module.exports = {
  syntax: 'postcss-scss',
  plugins: {
    'postcss-sorting': {
      order: [
        'custom-properties',
        'dollar-variables',
        'declarations',
        'at-rules',
        'rules',
      ],

      'properties-order': [
        'position',
        'z-index',
        'top',
        'left',
        'right',
        'bottom',
        'display',
        'width',
        'max-width',
        'min-width',
        'height',
        'max-height',
        'min-height',
        'margin',
        'margin-top',
        'margin-left',
        'margin-right',
        'margin-bottom',
        'padding',
        'padding-top',
        'padding-left',
        'padding-right',
        'padding-bottom',
        'background',
        'background-color',
        'background-image',
        'border',
        'border-top',
        'border-left',
        'border-right',
        'border-bottom',
        'border-radius',
        'box-sizing',
        'cursor',
      ],

      'unspecified-properties-position': 'bottom',
    },
  },
}
