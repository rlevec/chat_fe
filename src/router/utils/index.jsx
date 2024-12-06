import React, {Suspense} from "react";

import Loader from "../../components/shared/circular_loader"

import {routes} from "../../routes"

export const protectedRoutes = [
    routes?.client?.chat,
    routes?.client?.change_password,
    routes?.client?.change_email,
    routes?.client?.change_username,
    routes?.client?.delete_account,
    routes?.client?.upload_profile_picture
  ];


  export const handleRenderComponenAction = (Component, props = {}) => (
    <Suspense fallback={<Loader/>}>
      <Component {...props} />
    </Suspense>
  );
