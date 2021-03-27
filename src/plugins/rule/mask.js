export function alphabetical(length = 45, options = {}) {
  return Object.assign(
    {
      regex: `[a-zA-Z]{1,${length}}`,
      placeholder: '',
    },
    options
  )
}

export function numeric(length = 45, options = {}) {
  return Object.assign(
    {
      regex: `[0-9]{1,${length}}`,
      placeholder: '',
    },
    options
  )
}

export function alphanumeric(length = 45, options = {}) {
  return Object.assign(
    {
      regex: `[a-zA-Z0-9]{1,${length}}`,
      placeholder: '',
    },
    options
  )
}

export function alphanumericSpacing(length = 45, options = {}) {
  return Object.assign(
    {
      regex: `[a-zA-Z0-9\\s]{1,${length}}`,
      placeholder: '',
    },
    options
  )
}

export function alphanumericSpecial(length = 45, special = '', options = {}) {
  return Object.assign(
    {
      regex: `[a-zA-Z0-9${special}]{1,${length}}`,
      placeholder: '',
    },
    options
  )
}

export function currency(options = {}) {
  return Object.assign(
    {
      alias: 'currency',
      prefix: '$',
      showMaskOnHover: false,
      showMaskOnFocus: false,
      autoUnmask: true,
      placeholder: '0',
    },
    options
  )
}

export function phone(options = {}) {
  return Object.assign(
    {
      mask: '999-999-9999',
      jitMasking: true,
    },
    options
  )
}

export function zipcode(options = {}) {
  return Object.assign(
    {
      mask: '99999[-9999]',
      greedy: false,
      jitMasking: true,
    },
    options
  )
}
