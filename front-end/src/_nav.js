export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    // {
    //   title: true,
    //   name: "Dashboard",
    //   wrapper: {
    //     // optional wrapper object
    //     element: "", // required valid HTML5 element tag
    //     attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    //   },
    //   class: "" // optional class names space delimited list for title item ex: "text-center"
    // },
    // {
    //   name: "Home",
    //   url: "/dashboard",
    //   icon: "icon-drop",
    //   active: true
    // },
    {
      name: "Home",
      url: "/dashboard",
      icon: "icon-pencil"
    },
    {
      name: "Hospitals",
      url: "/dashboard/hospitals",
      icon: "icon-pencil"
    },
    {
      name: "Users",
      url: "/dashboard/users",
      icon: "icon-pencil"
    }
  ]
};
