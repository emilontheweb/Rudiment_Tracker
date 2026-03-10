export interface RudimentsQuery {
    page?: number
    limit?: number
    minBpm?: number
    maxBpm?: number
    search?: string
}

export interface SessionsQuery {
    page?: number
    limit?: number
    rudimentId?: string
    fromDate?: string
    toDate?: string
}