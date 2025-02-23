// @ts-nocheck
import _rawCountries from './raw-countries'
import _rawTerritories from './raw-territories'

function getMask(prefix, dialCode, predefinedMask, defaultMask, alwaysDefaultMask) {
  if (!predefinedMask || alwaysDefaultMask) {
    return prefix + ''.padEnd(dialCode.length, '.') + ' ' + defaultMask
  } else {
    return prefix + ''.padEnd(dialCode.length, '.') + ' ' + predefinedMask
  }
}

// enableAreaCodes: boolean || array of iso2 codes
function initCountries(countries, enableAreaCodes, prefix, defaultMask, alwaysDefaultMask) {
  let hiddenAreaCodes = []

  let enableAllCodes
  if (enableAreaCodes === true) {
    enableAllCodes = true
  } else {
    enableAllCodes = false
  }

  const initializedCountries = [].concat(
    ...countries.map((country) => {
      const countryItem = {
        name: country[0],
        regions: country[1],
        iso2: country[2],
        countryCode: country[3],
        dialCode: country[3],
        format: getMask(prefix, country[3], country[4], defaultMask, alwaysDefaultMask),
        priority: country[5] || 0,
      }

      const areaItems = []

      country[6] &&
        country[6].map((areaCode) => {
          const areaItem = { ...countryItem }
          areaItem.dialCode = country[3] + areaCode
          areaItem.isAreaCode = true
          areaItem.areaCodeLength = areaCode.length

          areaItems.push(areaItem)
        })

      if (areaItems.length > 0) {
        countryItem.mainCode = true
        if (
          enableAllCodes ||
          (enableAreaCodes.constructor.name === 'Array' && enableAreaCodes.includes(country[2]))
        ) {
          countryItem.hasAreaCodes = true
          return [countryItem, ...areaItems]
        } else {
          hiddenAreaCodes = hiddenAreaCodes.concat(areaItems)
          return [countryItem]
        }
      } else {
        return [countryItem]
      }
    })
  )

  return [initializedCountries, hiddenAreaCodes]
}

function extendUserContent(userContent, contentItemIndex, extendingObject, firstExtension) {
  if (extendingObject === null) return

  const keys = Object.keys(extendingObject)
  const values = Object.values(extendingObject)

  keys.forEach((iso2, index) => {
    if (firstExtension) {
      // masks
      return userContent.push([iso2, values[index]])
    }

    const countryIndex = userContent.findIndex((arr) => arr[0] === iso2)
    if (countryIndex === -1) {
      const newUserContent = [iso2]
      newUserContent[contentItemIndex] = values[index]
      userContent.push(newUserContent)
    } else {
      userContent[countryIndex][contentItemIndex] = values[index]
    }
  })
}

function initUserContent(masks, priority, areaCodes) {
  let userContent = []
  extendUserContent(userContent, 1, masks, true)
  extendUserContent(userContent, 3, priority)
  extendUserContent(userContent, 2, areaCodes)
  return userContent
}

function extendRawCountries(countries, userContent) {
  if (userContent.length === 0) return countries

  // userContent index -> rawCountries index of country array to extend
  // [iso2 (0 -> 2), mask (1 -> 4), priority (3 -> 5), areaCodes (2 -> 6)]

  return countries.map((o) => {
    const userContentIndex = userContent.findIndex((arr) => arr[0] === o[2]) // find by iso2
    if (userContentIndex === -1) return o // if iso2 not in userContent, return source country object
    const userContentCountry = userContent[userContentIndex]
    if (userContentCountry[1]) o[4] = userContentCountry[1] // mask
    if (userContentCountry[3]) o[5] = userContentCountry[3] // priority
    if (userContentCountry[2]) o[6] = userContentCountry[2] // areaCodes
    return o
  })
}

const defaultProps = {
  country: '',
  value: '',

  onlyCountries: [],
  preferredCountries: [],
  excludeCountries: [],

  placeholder: '1 (702) 123-4567',
  searchPlaceholder: 'search',
  searchNotFound: 'No entries to show',
  flagsImagePath: './flags.png',
  disabled: false,

  containerStyle: {},
  inputStyle: {},
  buttonStyle: {},
  dropdownStyle: {},
  searchStyle: {},

  containerClass: '',
  inputClass: '',
  buttonClass: '',
  dropdownClass: '',
  searchClass: '',
  className: '',

  autoFormat: true,
  enableAreaCodes: false,
  enableTerritories: false,
  disableCountryCode: false,
  disableDropdown: false,
  enableLongNumbers: false,
  countryCodeEditable: true,
  enableSearch: false,
  disableSearchIcon: false,
  disableInitialCountryGuess: false,
  disableCountryGuess: false,

  regions: '',

  inputProps: {},
  localization: {},

  masks: null,
  priority: null,
  areaCodes: null,

  preserveOrder: [],

  defaultMask: '... ... ... ... ..', // prefix+dialCode+' '+defaultMask
  alwaysDefaultMask: false,
  prefix: '+',
  copyNumbersOnly: true,
  renderStringAsFlag: '',
  autocompleteSearch: false,
  jumpCursorToEnd: true,
  enableAreaCodeStretch: false,
  enableClickOutside: true,
  showDropdown: false,

  isValid: true, // (value, selectedCountry, onlyCountries, hiddenAreaCodes) => true | false | 'Message'
  defaultErrorMessage: '',
  specialLabel: 'Phone',

  onEnterKeyPress: null, // null or function

  keys: {
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
    LEFT: 37,
    ENTER: 13,
    ESC: 27,
    PLUS: 43,
    A: 65,
    Z: 90,
    SPACE: 32,
    TAB: 9,
  },
}

export default class CountryData {
  constructor(
    enableAreaCodes = defaultProps.enableAreaCodes,
    enableTerritories = defaultProps.enableTerritories,
    regions = defaultProps.regions,
    onlyCountries = defaultProps.onlyCountries,
    preferredCountries = defaultProps.preferredCountries,
    excludeCountries = defaultProps.excludeCountries,
    preserveOrder = defaultProps.preserveOrder,
    masks = defaultProps.masks,
    priority = defaultProps.priority,
    areaCodes = defaultProps.areaCodes,
    localization = defaultProps.localization,
    prefix = defaultProps.prefix,
    defaultMask = defaultProps.defaultMask,
    alwaysDefaultMask = defaultProps.alwaysDefaultMask
  ) {
    const userContent = initUserContent(masks, priority, areaCodes)
    const rawCountries = extendRawCountries(JSON.parse(JSON.stringify(_rawCountries)), userContent)
    const rawTerritories = extendRawCountries(
      JSON.parse(JSON.stringify(_rawTerritories)),
      userContent
    )

    let [initializedCountries, hiddenAreaCodes] = initCountries(
      rawCountries,
      enableAreaCodes,
      prefix,
      defaultMask,
      alwaysDefaultMask
    )
    if (enableTerritories) {
      let [initializedTerritories, hiddenAreaCodes] = initCountries(
        rawTerritories,
        enableAreaCodes,
        prefix,
        defaultMask,
        alwaysDefaultMask
      )
      initializedCountries = this.sortTerritories(initializedTerritories, initializedCountries)
    }
    if (regions) initializedCountries = this.filterRegions(regions, initializedCountries)

    this.onlyCountries = this.localizeCountries(
      this.excludeCountries(
        this.getFilteredCountryList(
          onlyCountries,
          initializedCountries,
          preserveOrder.includes('onlyCountries')
        ),
        excludeCountries
      ),
      localization,
      preserveOrder.includes('onlyCountries')
    )

    this.preferredCountries =
      preferredCountries.length === 0
        ? []
        : this.localizeCountries(
            this.getFilteredCountryList(
              preferredCountries,
              initializedCountries,
              preserveOrder.includes('preferredCountries')
            ),
            localization,
            preserveOrder.includes('preferredCountries')
          )

    // apply filters to hiddenAreaCodes
    this.hiddenAreaCodes = this.excludeCountries(
      this.getFilteredCountryList(onlyCountries, hiddenAreaCodes),
      excludeCountries
    )
  }

  filterRegions = (regions, countries) => {
    if (typeof regions === 'string') {
      const region = regions
      return countries.filter((country) => {
        return country.regions.some((element) => {
          return element === region
        })
      })
    }

    return countries.filter((country) => {
      const matches = regions.map((region) => {
        return country.regions.some((element) => {
          return element === region
        })
      })
      return matches.some((el) => el)
    })
  }

  sortTerritories = (initializedTerritories, initializedCountries) => {
    const fullCountryList = [...initializedTerritories, ...initializedCountries]
    fullCountryList.sort(function (a, b) {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
    return fullCountryList
  }

  getFilteredCountryList = (countryCodes, sourceCountryList, preserveOrder) => {
    if (countryCodes.length === 0) return sourceCountryList

    let filteredCountries
    if (preserveOrder) {
      // filter using iso2 user-defined order
      filteredCountries = countryCodes
        .map((countryCode) => {
          const country = sourceCountryList.find((country) => country.iso2 === countryCode)
          if (country) return country
        })
        .filter((country) => country) // remove any not found
    } else {
      // filter using alphabetical order
      filteredCountries = sourceCountryList.filter((country) => {
        return countryCodes.some((element) => {
          return element === country.iso2
        })
      })
    }

    return filteredCountries
  }

  localizeCountries = (countries, localization, preserveOrder) => {
    for (let i = 0; i < countries.length; i++) {
      if (localization[countries[i].iso2] !== undefined) {
        countries[i].localName = localization[countries[i].iso2]
      } else if (localization[countries[i].name] !== undefined) {
        countries[i].localName = localization[countries[i].name]
      }
    }
    if (!preserveOrder) {
      countries.sort(function (a, b) {
        if (a.localName < b.localName) {
          return -1
        }
        if (a.localName > b.localName) {
          return 1
        }
        return 0
      })
    }
    return countries
  }

  getCustomAreas = (country, areaCodes) => {
    let customAreas = []
    for (let i = 0; i < areaCodes.length; i++) {
      let newCountry = JSON.parse(JSON.stringify(country))
      newCountry.dialCode += areaCodes[i]
      customAreas.push(newCountry)
    }
    return customAreas
  }

  excludeCountries = (onlyCountries, excludedCountries) => {
    if (excludedCountries.length === 0) {
      return onlyCountries
    } else {
      return onlyCountries.filter((country) => {
        return !excludedCountries.includes(country.iso2)
      })
    }
  }
}

export interface Country {
  name: string
  regions: string[]
  iso2: string
  countryCode: string
  dialCode: string
  format: string
  priority: number
}

const { onlyCountries } = new CountryData()

const countries = onlyCountries as Country[]

const nationalities = countries.map((country) => {
  return { value: country.name, label: country.name }
})
const countryWithCodes = countries.map((country) => {
  return { value: country.iso2, label: `${country.name}  (+${country.countryCode})` }
})

export { countries, nationalities, countryWithCodes }
