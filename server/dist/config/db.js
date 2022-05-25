var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mysql = require('mysql2/promise');
const createPool = () => __awaiter(this, void 0, void 0, function* () {
    return (mysql.createPool({
        host: 'localhost',
        database: 'main',
        user: 'adam',
        password: 'password',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }));
});
const pool = createPool();
module.exports = pool;
//# sourceMappingURL=db.js.map