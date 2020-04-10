import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from '../../database/sequelize'

@Injectable()
export class UserService {
  async findOne(username: string): Promise<any | undefined> {
    const sql =`
    SELECT
      user_id id, account_name username, role
    FROM
      admin_user
    WHERE
      account_name = '${username}'
    `;
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: true,
      });
      const user = res[0]
      if(user) {
        return {
          code: 200,
          data: {
            user,
          },
          msg: 'Success'
        };
      } else {
        return {
          code: 600,
          msg: '查无此人',
        }
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      }
    }
  }
}
