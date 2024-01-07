export interface ToBeTransformedModule {
  path: string
  code: string
}

export interface TransformedProjectModule {
  path: string
  code: string
  dlightCode: string | undefined | null
}
