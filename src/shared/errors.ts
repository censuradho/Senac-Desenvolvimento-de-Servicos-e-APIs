export const ERRORS = {
  FILE: {
    ERROR_UPLOAD: 'FILE_ERROR_UPLOAD',
    FILE_IS_REQUIRED: 'FILE_IS_REQUIRED'
  },
  AUTH: {
    PROVIDE_TOKEN: 'AUTH_PROVIDE_TOKEN',
    NOT_AUTHORIZED: 'AUTH_NOT_AUTHORIZED',
    USER_ROLE_NOT_AUTHORIZED: 'AUTH_USER_ROLE_NOT_AUTHORIZED',
    NOT_FOUND_EMPLOYER_RELATED_TO_AUTH_TOKEN: 'AUTH_NOT_FOUND_EMPLOYER_RELATED_TO_AUTH_TOKEN'
  },
  USER: {
    NOT_FOUND: 'USER_NOT_FOUND',
    INCORRECT_PASSWORD_OR_EMAIL: 'INCORRECT_PASSWORD_OR_EMAIL',
    NOT_ALLOW: 'USER_NOT_ALLOW'
  },
  COMPANY: {
    CNPJ_ALREADY_EXIST: 'COMPANY_CNPJ_ALREADY_EXIST',
    NOT_FOUND: 'COMPANY_NOT_FOUND'
  },
  EMPLOYER: {
    ALREADY_HAVE_COMPANY_RELATED: 'EMPLOYER_ALREADY_HAVE_COMPANY_RELATED',
  },
  CANDIDATE: {
    PROFILE_ALREADY_REGISTER: 'CANDIDATE_PROFILE_ALREADY_REGISTER'
  },
  INVITE: {
    NOT_FOUND: 'INVITE_NOT_FOUND',
    EXPIRED: 'INVITE_EXPIRED'
  }
}