import Logger from "@harmonyjs/logger";
import EncryptionService from "services/encryption";

const logger = Logger({
  name: "AccountLogin",
  configuration: {
    console: true,
  },
});

const LoginRoute = async (server: any, opts: any, next: () => void) => {
  server.route({
    method: "POST",
    url: "/login",
    handler(req: any, res: any) {
      try {
        res.header("Content-Type", "application/json; charset=utf-8");

        const account = req.conf.account;
        if (req.body.login !== account.email) {
          return res.send({
            statusCode: 401,
            error: "Bad Request",
            message: "user_not_found",
          });
        }
        const authenticated = EncryptionService.comparePassword({
          password: req.body.password,
          salt: account.id,
          encrypted: account.password,
        });
        if (!authenticated) {
          return res.send({
            statusCode: 401,
            error: "Bad Request",
            message: "wrong_credentials",
          });
        }
        const token = server.jwt.sign({
          payload: {
            userId: account.id,
            name: account.name,
            isAdmin: false,
          },
        });

        return res.send({
          statusCode: 200,
          token,
        });
      } catch (e) {
        return res.send({
          statusCode: 500,
          error: "Internal Server Error",
        });
      }
    },
  });
  next();
};

export default LoginRoute;
