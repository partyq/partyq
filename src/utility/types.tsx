export interface iUser {
    fullName: string,
    username: string,
    email: string,
    uid: string,
    friends: iFriend[]
}

export interface iPlan {
    name: string,
    features: string[],
    monthlyPrice: number,
}

export interface iFriend {
    username: string
}