import { PasswordUtil } from "../utils/utils.bcrypt";
import { AuthUser } from "../models/Auth.model";
import { User } from "../types/type";

export class AuthRepo {
  async getUserDataByEmail(email: string) {
    return new Promise<any>((res, rej) => {
      AuthUser.findOne({ where: { email } })
        .then((user) => {
          res(user);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  async register(data: User) {
    return new Promise<any>((res, rej) => {
      const passwordUtil = new PasswordUtil(data.password);
      data.password = passwordUtil.getHash();
      AuthUser.create({
        first_name: data.first_name,
        email: data.email,
        last_name: data.last_name,
        mobile_number: data.mobile_number,
        password: data.password
      })
        .then((user) => {
          res(user);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
  async updateUserSession(id: number, sessionId: string | null) {  
    return new Promise<any>((res, rej) => {
      AuthUser.update(
        {
          session_id: sessionId,
        },
        { where: { id: id } }
      )
        .then((user) => {
          res(user);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
}
