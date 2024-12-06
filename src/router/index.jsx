import { lazy } from "react";

import { useHandleRouterComponentEffects } from "./effects";

import { useHandleRouterComponentState } from "./state";

import { handleUserGlobalStateAction, navigate } from "../utils";

import { protectedRoutes, handleRenderComponenAction } from "./utils";

import { routes } from "../routes";

const Registration = lazy(() => import("../components/forms/registration"));
const Login = lazy(() => import("../components/forms/login"));
const AccountActivation = lazy(() =>
  import("../components/forms/account_activation")
);
const ResendAccountActivationEmail = lazy(() =>
  import("../components/forms/resend_account_activation_email")
);
const ResetPassword = lazy(() => import("../components/forms/reset_password"));
const ForgotPassword = lazy(() =>
  import("../components/forms/forgot_password")
);

const ChangeEmail = lazy(() => import("../components/forms/change_email"));
const ChangePassword = lazy(() =>
  import("../components/forms/change_password")
);
const ChangeUsername = lazy(() =>
  import("../components/forms/change_username")
);
const DeleteAccount = lazy(() => import("../components/forms/delete_account"));
const UploadProfilePicture = lazy(() =>
  import("../components/forms/upload_profile_picture")
);

const Chat = lazy(() => import("../components/chat"));

const Error = lazy(() => import("../components/error"));

export const Router = () => {
  const {
    location,
    setLocation,
    locationElements,
    setLocationElements,
    isDesktop,
    setIsDesktop,
  } = useHandleRouterComponentState() || {};

  useHandleRouterComponentEffects(
    location,
    setLocation,
    setLocationElements,
    setIsDesktop
  );

  const user = !!handleUserGlobalStateAction("get");

  const deviceErrorProps = { target: "invalid_device", refresh: true };
  const routeErrorProps = {
    target: "invalid_route",
  };
  const resetPasswordErrorProps = {
    target: "invalid_data",
    subTarget: "reset_password",
  };
  const accountActivationErrorProps = {
    target: "invalid_data",
    subTarget: "account_activation",
  };

  if (!isDesktop) {
    return handleRenderComponenAction(Error, deviceErrorProps);
  } else {
    if (user) {
      if (!protectedRoutes?.includes(location)) navigate(routes?.client?.chat);
      else if (location === routes?.client?.root) {
        navigate(routes?.client?.chat);
      } else {
        if (location === routes?.client?.chat) {
          return handleRenderComponenAction(Chat);
        } else if (location === routes?.client?.change_email) {
          return handleRenderComponenAction(ChangeEmail);
        } else if (location === routes?.client?.change_username) {
          return handleRenderComponenAction(ChangeUsername);
        } else if (location === routes?.client?.change_password) {
          return handleRenderComponenAction(ChangePassword);
        } else if (location === routes?.client?.delete_account) {
          return handleRenderComponenAction(DeleteAccount);
        } else if (location === routes?.client?.upload_profile_picture) {
          return handleRenderComponenAction(UploadProfilePicture);
        } else {
          return handleRenderComponenAction(Error, routeErrorProps);
        }
      }
    } else {
      if (protectedRoutes?.includes(location)) navigate(routes?.client?.login);
      else if (location === routes?.client?.root) {
        navigate(routes?.client?.login);
      } else {
        if (location === routes?.client?.registration) {
          return handleRenderComponenAction(Registration);
        } else if (location === routes?.client?.login) {
          return handleRenderComponenAction(Login);
        } else if (location === routes?.client?.forgot_password) {
          return handleRenderComponenAction(ForgotPassword);
        } else if (location?.includes(routes?.client?.account_activation)) {
          if (locationElements?.length === 2) {
            const accountActivationToken =
              locationElements?.[locationElements?.length - 1];

            if (accountActivationToken) {
              return handleRenderComponenAction(AccountActivation, {
                accountActivationToken,
              });
            } else {
              return handleRenderComponenAction(
                Error,
                accountActivationErrorProps
              );
            }
          } else {
            return handleRenderComponenAction(
              Error,
              accountActivationErrorProps
            );
          }
        } else if (location?.includes(routes?.client?.reset_password)) {
          if (locationElements?.length === 2) {
            const resetPasswordToken =
              locationElements?.[locationElements?.length - 1];

            if (resetPasswordToken)
              return handleRenderComponenAction(ResetPassword, {
                resetPasswordToken,
              });
            else {
              return handleRenderComponenAction(Error, resetPasswordErrorProps);
            }
          } else {
            return handleRenderComponenAction(Error, resetPasswordErrorProps);
          }
        } else if (
          location == routes?.client?.resend_account_activation_email
        ) {
          return handleRenderComponenAction(ResendAccountActivationEmail);
        } else {
          return handleRenderComponenAction(Error, routeErrorProps);
        }
      }
    }
  }
};
