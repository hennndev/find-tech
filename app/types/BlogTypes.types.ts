export type BlogTypes = {
    _id: string
    blogImage: {
        imageId: string
        imageURL: string
    }
    blogTitle: string
    blogDescriptions: {
        _id: string
        descriptionTitle: string,
        descriptionContent: string
    }[],
    blogCategories: {_id: string, category: string}[],
    blogAuthor: string
    createdAt: Date
}