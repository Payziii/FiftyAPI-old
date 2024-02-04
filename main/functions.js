function getRandomElements(arr, n) {
    const indexes = new Set();
    const limit = arr.length;
    n = Math.min(n, limit);
    while (indexes.size < n) {
        const index = Math.floor(limit * Math.random());
        indexes.add(index);
    }
    const result = [...indexes].map(index => arr[index]);
    return result;
};

module.exports = getRandomElements;