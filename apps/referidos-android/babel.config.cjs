module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        cwd: __dirname,
        root: ["./src"],
        alias: {
          "@app": "./src/app",
          "@navigation": "./src/navigation",
          "@features": "./src/features",
          "@shared": "./src/shared",
        },
      },
    ],
  ],
};
