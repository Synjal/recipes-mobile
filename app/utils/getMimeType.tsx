export const getMimeType = (uri: string) => {
    const extension = uri.split('.').pop()
    switch (extension) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg'
        case 'png':
            return 'image/png'
        case 'gif':
            return 'image/gif'
        default:
            return 'application/octet-stream'
    }
}
