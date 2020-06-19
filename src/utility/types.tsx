export interface iUser {
    fullName: string,
    username: string,
    email: string
}

export interface iPlan {
    name: string,
    features: string[],
    monthlyPrice: number,
}