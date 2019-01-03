// const env = {
//         development: {
//             apiurl_one: 'http://192.168.31.77:8002',
//             apiurl_two: 'http://192.168.31.77:8002'
//         },
//         production: {
//             apiurl_one: 'http://192.168.31.77:8002',
//             apiurl_two: 'http://192.168.31.77:8002'
//         }
//     }
const env = {
    development: {
        apiurl_one: 'http://prejys.sogukz.com',
        apiurl_two: 'http://prejys.sogukz.com'
    },
    production: {
        apiurl_one: 'http://prejys.sogukz.com',
        apiurl_two: 'http://prejys.sogukz.com'
    }
}

export default env[process.env.NODE_ENV]