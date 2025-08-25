export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string
      BCRYPT_SALT: string
      JWT_SECRET: string
      JWT_ACCESS_LASTING_SEC: string
      JWT_REFRESH_LASTING_SEC: string
    }
  }
}
