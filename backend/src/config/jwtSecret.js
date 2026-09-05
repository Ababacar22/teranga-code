const KNOWN_BAD_SECRETS = ['dev_secret_change_me_in_production', 'changeme', 'secret']

export function isValidJwtSecret(secret) {
  return typeof secret === 'string' && secret.length >= 32 && !KNOWN_BAD_SECRETS.includes(secret)
}
