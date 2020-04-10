const productConfig = {
  mysql: {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nest_zero_to_one', // 库名
    connectionLimit: 10, // 连接限制
  }
}
const localConfig = {
  mysql: {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nest_zero_to_one', // 库名
    connectionLimit: 10, // 连接限制
  }
}

const config = process.env.NODE_ENV ? productConfig : localConfig
export default config