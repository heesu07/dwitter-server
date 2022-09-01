import { db } from '../db/database.js';
/**
 * tweets 과 users 의 테이블을 join 하여 모든 필드를 만든다 이때 JOIN ON tw.userId=us.id
 */
const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId = us.id';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export async function getAll() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
    .then(res => res[0]);
}

export async function getAllByUsername(username) {
  return db.execute(`${SELECT_JOIN} WHERE us.username=? ${ORDER_DESC}`, [username])
    .then(res => res[0]);
}

export async function getById(id) {
  return db.execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then(res => res[0][0])
}

export async function create(text, userId) {
  return db.execute('INSERT INTO tweets ( text, createdAt, userId ) values(?,?,?)', [text, new Date(), userId])
    .then(res => getById(res[0].insertId));
}

export async function update(id, text) {
  return db.execute('UPDATE tweets SET text=? WHERE id=?', [text, id])
  .then(console.log)  
  //.then(() => getById(id));
}

export async function remove(id) {
  return db.execute('DELETE FROM tweets WHERE id=?', [id]);
}
