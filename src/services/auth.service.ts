import { restApiResponseStatus } from "../utils/restApiResponseStatus";
import { AuthRepo } from "../repository/auth.repo";
import JWTRedis from "../utils/auth.jwt";
import { appErrorMessage } from "../utils/appErrorMessage";
import { Login, User, UserRes } from "../types/type";
import { PasswordUtil } from "../utils/utils.bcrypt";
import appConfig from "../config/app.config";
const jwt = new JWTRedis();

export class AuthService {
  constructor(private readonly authRepo: AuthRepo) {}

  async register(body: User): Promise<any> {
    const userDetails = await this.authRepo.getUserDataByEmail(body.email);
    if (userDetails) {
      return {
        success: false,
        status: restApiResponseStatus.Conflict,
        msg: appErrorMessage.EMAILALREADYEXISTS,
      };
    }

    const userRegister = await this.authRepo.register(body);
    delete userRegister?.password;
    if (!userRegister) {
      return {
        success: false,
        status: restApiResponseStatus.BadRequest,
        msg: "user not created successfully.",
      };
    }
    return {
      success: true,
      status: restApiResponseStatus.OK,
      msg: "user created successfully.",
      data: userRegister,
    };
  }

  async logIn(body: Login, res: any): Promise<any> {
    const userDetail = await this.authRepo.getUserDataByEmail(body.email);
    if (!userDetail) {
      return {
        success: false,
        status: restApiResponseStatus.NotFound,
        msg: appErrorMessage.EMAILDOESNOTEXISTS,
      };
    }

    const passwordUtil = new PasswordUtil(body.password);
    const passwordIsValid = passwordUtil.compareHash(userDetail.password);
    if (!passwordIsValid) {
      return {
        success: false,
        status: restApiResponseStatus.BadRequest,
        msg: appErrorMessage.INVALIDPASSWORD,
      };
    } else {
      const tokenInfo = await jwt.createToken(userDetail);
      
     res.cookie(appConfig.COOKIE_NAME, tokenInfo.token, { httpOnly: true }); 
      const updatesession = await this.authRepo.updateUserSession(
        userDetail.id,
        tokenInfo.token
      );

      return {
        success: true,
        status: restApiResponseStatus.Authorized,
        msg: " Login successfully",
      };
    }
  }

  async logOut(id: number, req: any, res: any): Promise<UserRes> {
    const token = req.cookies[appConfig.COOKIE_NAME];
    if (!token) {
      return {
        success: false,
        status: restApiResponseStatus.NotFound,
        msg: appErrorMessage.INVALIDTOKEN,
      };
    }
    const updatesession = await this.authRepo.updateUserSession(id, null);
    res.clearCookie(appConfig.COOKIE_NAME);
    return {
      success: true,
      status: restApiResponseStatus.OK,
      msg: "Logout successfully.",
      updatesession,
    };
  }
}
