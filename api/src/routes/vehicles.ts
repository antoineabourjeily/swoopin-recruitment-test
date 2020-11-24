import Logger from "@harmonyjs/logger";
import VehicleService from "services/vehicle";

const logger = Logger({
  name: "Vehicles",
  configuration: {
    console: true,
  },
});

const VehiclesRoute = async (server: any, opts: any, next: () => void) => {
  server.route({
    method: "GET",
    url: "/vehicles",
    preHandler: server.auth([server.authenticateAccount]),
    handler(req: any, res: any) {
      try {
        const data = VehicleService.getDrivers().map(
          ({
            polyline,
            defaultSpeed,
            defaultTemperature,
            line,
            distance,
            ...vehicle
          }) => vehicle
        );
        return res
          .header("Content-Type", "application/json; charset=utf-8")
          .send({
            statusCode: 200,
            data,
          });
      } catch (e) {
        return res.send({
          statusCode: 500,
          error: "Internal Server Error",
        });
      }
    },
  });

  server.route({
    method: "PUT",
    url: "/vehicles/online/:id",
    preHandler: server.auth([server.authenticateAccount]),
    handler(req: any, res: any) {
      if (VehicleService.putVehicleOnline(req.params.id)) {
        return res.send({});
      }
      return res.send({ statusCode: 500, error: "Internal Server Error" });
    },
  });

  server.route({
    method: "PUT",
    url: "/vehicles/offline/:id",
    preHandler: server.auth([server.authenticateAccount]),
    handler(req: any, res: any) {
      if (VehicleService.putVehicleOffline(req.params.id)) {
        return res.send({});
      }
      return res.send({ statusCode: 500, error: "Internal Server Error" });
    },
  });
  next();
};

export default VehiclesRoute;
