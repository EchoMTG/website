import {joinURL} from 'ufo';
import createHmac from 'create-hmac';
import {createOperationsGenerator} from '~image'

const operationsGenerator = createOperationsGenerator({
  keyMap: {
    resize: 'rs',
    size: 's',
    fit: 'rt',
    width: 'w',
    height: 'h',
    dpr: 'dpr',
    enlarge: 'el',
    extend: 'ex',
    gravity: 'g',
    crop: 'c',
    padding: 'pd',
    trim: 't',
    rotate: 'rot',
    quality: 'q',
    maxBytes: 'mb',
    background: 'bg',
    backgroundAlpha: 'bga',
    blur: 'bl',
    sharpen: 'sh',
    watermark: 'wm',
    preset: 'pr',
    cacheBuster: 'cb',
    stripMetadata: 'sm',
    stripColorProfile: 'scp',
    autoRotate: 'ar',
    filename: 'fn',
    format: 'f',
  },
  formatter: (key, value) => `${key}:${value}`
})

function urlSafeBase64(string) {
  return Buffer.from(string)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

const hexDecode = (hex) => Buffer.from(hex, 'hex')

function sign(salt, target, secret) {
  const hmac = createHmac('sha256', hexDecode(secret))

  hmac.update(hexDecode(salt))
  hmac.update(target)

  return urlSafeBase64(hmac.digest())
}

const defaultModifiers = {
  fit: 'fill',
  width: 0,
  height: 0,
  gravity: 'no',
  enlarge: 1,
  format: 'webp',
}

export function getImage(src, {modifiers, baseURL, key, salt} = {}) {
  const mergeModifiers = {...defaultModifiers, ...modifiers}
  const encodedUrl = urlSafeBase64(src)
  const path = joinURL('/', operationsGenerator(mergeModifiers), encodedUrl)
  const signature = sign(salt, path, key)

  return {
    url: joinURL(baseURL, signature, path)
  }
}
