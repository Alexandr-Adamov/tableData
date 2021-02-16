export type usersType = {
    address: adressType
    description: string
    email: string
    firstName:string
    id: number
    lastName: string
    phone: string
}

export type adressType = {
    streetAddress: string
    city: string
    state: string
    zip: string
}

export type uiType = {
    column: string
    direction: string
    paginationList: Array<number>,
    pageNumber: number
    searchString: string
    isAddUser: boolean
    progress:  boolean
    icon_error:  boolean
}


export type valuesType = {
    sortString: string
    column: 'email' | 'lastName' | 'firstName' | ''
}

