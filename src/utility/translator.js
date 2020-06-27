import { english } from 'locales/english.js'
import { italian } from 'locales/italian.js'

class Translator {
  constructor() {
    this.language = navigator.language === 'it-IT' ? italian : english
    this.unmatchedLabels = new Set()
    this.printUnmatchedLabels = true // set to true to debug missing label
  }

  setLanguage = (language) => {
    this.language = language
  }

  fromLabel = (label) => {
    if (this.language[label])
      return this.language[label]
    if (this.printUnmatchedLabels) {
      this.unmatchedLabels.add(label)
      console.log('unmatchedLabels', this.unmatchedLabels)
    }
    return label
  }

  toPrice = price => {
    price = Number.isNaN(price) ? 0 : Number(price)

    if (this.language.toPrice != null)
      return this.language.toPrice(price)
    else
      return price
  }
}

export default new Translator()
