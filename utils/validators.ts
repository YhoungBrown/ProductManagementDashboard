export const isValidAddress = (v: string) => v.length > 5
export const isValidPhone = (v: string) => /^\d{10}$/.test(v)
