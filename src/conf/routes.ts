import Home from "pages/home/Home";
import Auth from "pages/auth/Auth";
import Stories from "pages/stories/Stories";
import EditConversation from "pages/stories/edit/EditConversation";
import Privacy from "pages/privacy/Privacy";
import AppGuide from "pages/appGuide/AppGuide";

export const AppRoute = Object.freeze({
  Home:    "/",
  Auth:    "/auth",
  Stories: "/stories",
  Privacy: "/privacy",
  Guide:   "/guide",

  EditConversation: (storyId: string) => `/stories/${storyId}`,
});

export const AppRoutes = Object.freeze([
  { path: AppRoute.Home, component: Home },
  { path: AppRoute.Auth, component: Auth },
  { path: AppRoute.Stories, component: Stories },
  { path: `${AppRoute.Stories}/:storyId`, component: EditConversation },
  { path: AppRoute.Privacy, component: Privacy },
  { path: AppRoute.Guide, component: AppGuide },
]);
