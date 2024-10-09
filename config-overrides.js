const webpack = require("webpack");

module.exports = function override(config, env) {
	config.resolve.fallback = {
		...config.resolve.fallback,
		crypto: require.resolve("crypto-browserify"),
		http: require.resolve("stream-http"),
		stream: require.resolve("stream-browserify"),
		https: require.resolve("https-browserify"),
		zlib: require.resolve("browserify-zlib"),
	};
	return config;
};
