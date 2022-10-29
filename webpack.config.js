const path= require('patch')
const createExpoWebpackConfigAsync = require('@expo/webpack-config')
module.export = async function (env, argv){
    const config = await createExpoWebpackConfigAsync(env, argv)
    config.module.rules.push({
        test: /\.js$/,
        loader: 'babel-loader',
        include:[
            path.join(__dirname, 'node_modules/react-router-native')
        ]
    })
}