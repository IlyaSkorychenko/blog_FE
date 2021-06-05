const sliceContent = (content, maxLength) => {
    if (!maxLength || content.length <= maxLength) {
        return content;
    }
    return content.slice(0, maxLength) + '...';
}

export default sliceContent;