module.exports = {
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    transformIgnorePatterns: [
        "/node_modules/(?!d3-scale|d3-interpolate|d3-array|d3-time-format|d3-color|d3-format|internmap)"
    ],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy"
    }
};
