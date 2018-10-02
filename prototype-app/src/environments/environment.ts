// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,
    name: "DEV",
    version: "1.1.01",
    wijmoDistributionLicense: `localhost,281247636267321#B0ikf1pjIEJCLi4TPnlVTJpmWENFRL9UOzATc5UlerZnRhdWZqhXQMlGMTJzZyBHVtZDerlXdvsySyJzbXp5UypHOvJENkFjWypUbNxkNqV5UxAVWyYGerx6RTtCe8V5YxYDZ6I7R5JXRwNTbW3EVWBnTzNVaJJ4dulWU6AFZwg5aTVjcDNDNZJDW6hVZjlTYZJ6SsZnU5R7RwkWUVp7bqRWerZ4NMtCUvYHVPJkUD9kUrskbv26VnJHbYhnVwFUVZdVZ84mcYNVSJpWOLBHRzUFVURncodjSoZVMtFkdyJlNLlFUidTetFFRkdmcU3WWRZEVEl7UUZEOzhTWrokWu3Ec6llU93iQO3GUYhDbrFnbTRHdtJ5dqljYDNmaON5Kv4kaoNWVUN7VXN6UGdHdWhWNrwGbxQ6bEVETh5WSwQjYPlVchh6Mi5mUZpHRmNDaOV4R5YjTBNncahVdNlkWhhXUiojITJCLikjRFZTOzUUNiojIIJCL8cTN7MzMwgzM0IicfJye&Qf35VfikEMyIlI0IyQiwiIu3Waz9WZ4hXRgACdlVGaThXZsZEIv5mapdlI0IiTisHL3JSNJ9UUiojIDJCLi86bpNnblRHeFBCIyV6dllmV4J7bwVmUg2Wbql6ViojIOJyes4nILdDOIJiOiMkIsIibvl6cuVGd8VEIgc7bSlGdsVXTg2Wbql6ViojIOJyes4nI4YkNEJiOiMkIsIibvl6cuVGd8VEIgAVQM3EIg2Wbql6ViojIOJyes4nIzMEMCJiOiMkIsISZy36Qg2Wbql6ViojIOJyes4nIVhzNBJiOiMkIsIibvl6cuVGd8VEIgQnchh6QsFWaj9WYulmRg2Wbql6ViojIOJyebpjIkJHUiwiIxEzNzUDMggDM8ADOxAjMiojI4J7QiwiI4N7boxWYj3GbiojIz5GRiwiIzlGel94cphXZMJiOiEmTDJCLiEjMzcjNyYzM6cDNyEDOyIiOiQWSiwSfiIjd8EDMyIiOiIXZ6JCLlNHbhZmOiI7ckJye0BCiu`,
    apiUrls: {
        vendorRates: 'http://localhost:39481/api/rates',
        sslam: 'http://localhost:39481/api/sslam/',
        logger: 'http://localhost:39481/api/logger',
        authorization: 'http://localhost:39481/api/authorization',
        assignments: 'http://localhost:39481/api/assignments',
        account: 'http://localhost:39481/api/account' // TODO: DELETE ME!!!
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
