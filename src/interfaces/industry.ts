export interface IIndustry {
    id: number
    name: string
    fields: IField[]
}

export interface IField {
    id: number
    name: string
    jobRoles: IJobRole[]
}

export interface IJobRole {
    id: number
    name: string
}

