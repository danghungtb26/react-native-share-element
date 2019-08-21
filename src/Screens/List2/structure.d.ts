export type Url = String

export type video = {
    id: Number,
    videoUrl: String,
    thumbnilUrl: String,
}

export type User = {
    id: Number,
    name: String,
    avatar: Url,
}

export type rating = {
    rating: Number,
    oneStar: Number,
    twoStar: Number,
    threeStar: Number,
    fourStar: Number,
    fiveStar: Number,
}

export type review = [{
    user: User,
    story: String,
    rating: Number,
    create_at: Date,
}]

export type PlaceInfo = {
    id: Number,
    name: String,
    category: Number,
    address: Number,
    budget?: Number,
    opentTime?: String,
    closeTime?: String,
    video: [video],
    rating: rating,
    ratingCount: Number,
    review: review,
    bookmark: boolean,
    lat: Number,
    long: Number,
    nearlyPlace: [PlaceInfo],
}

export type reviewList = {
    rating: rating,
    reviewCount: Number,
    data: [{
        id: Number,
        user: User,
        rating: Number,
        story: String,
        create_at: Date,
        helpful: boolean,
        helpfulCount: Number,
    }]
}

export type province = {
    id: Number,
    display_name: string,
    name: string,
    lat: Number,
    long: Number,
}

export type country = {
    id: Number,
    display_name: string,
    name: string,
    lat: Number,
    long: Number,
    province: [province],
}

