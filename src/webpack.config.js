module.exports = {
    //...
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "stream": require.resolve("stream-browserify"),
            "querystring": require.resolve("querystring-es3"),
            "fs": false // This is a file system module and not applicable for the browser environment
        }
    }
}